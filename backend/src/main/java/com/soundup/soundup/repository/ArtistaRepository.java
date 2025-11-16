package com.soundup.soundup.repository;

import com.soundup.soundup.model.Artista;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArtistaRepository {

    private final JdbcTemplate jdbcTemplate;

    public ArtistaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper combinando dados de Usuario + Artista - FIXED column names
    private RowMapper<Artista> rowMapper = (rs, rowNum) -> {
        Artista artista = new Artista(); // usa construtor vazio
        // campos Usuario - CORRECTED column names
        artista.setId(rs.getInt("id"));
        artista.setNome(rs.getString("nome"));
        artista.setEmail(rs.getString("email"));
        artista.setSenha(rs.getString("senha"));
        artista.setPais(rs.getString("pais"));
        artista.setEstado(rs.getString("estado"));
        artista.setCidade(rs.getString("cidade"));
        artista.setQuantSeguidores(rs.getInt("quantSeguidores")); // FIXED: was "quantSeguidores"
        artista.setTelefone(rs.getString("telefone"));
        // campos Artista
        artista.setId_artista(rs.getInt("id_artista"));
        artista.setQuant_ouvintes(rs.getInt("quant_ouvintes"));
        artista.setMusicasLancadas(0);
        return artista;
    };

    // CREATE artista (cria Usuario primeiro)
    public int save(Artista artista) {
        // Inserir Usuario - FIXED column names
        String sqlUsuario = "INSERT INTO usuarios (nome, email, senha, pais, estado, cidade, quantSeguidores, telefone) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sqlUsuario,
                artista.getNome(),
                artista.getEmail(),
                artista.getSenha(),
                artista.getPais(),
                artista.getEstado(),
                artista.getCidade(),
                artista.getQuantSeguidores(),
                artista.getTelefone()
        );

        // Pegar ID gerado
        Integer idUsuario = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        if (idUsuario == null) {
            throw new RuntimeException("Falha ao recuperar ID do usuário inserido.");
        }

        // Inserir Artista usando idUsuario
        String sqlArtista = "INSERT INTO artistas (id_artista, quant_ouvintes) VALUES (?, ?)";
        jdbcTemplate.update(sqlArtista,
                idUsuario,
                artista.getQuant_ouvintes()
        );
        return idUsuario;
    }

    // READ all artistas - FIXED column names in SELECT
    public List<Artista> findAll() {
        String sql = "SELECT u.id, u.nome, u.pais, u.estado, u.cidade, u.email, u.senha, " +
                "u.quantSeguidores, u.telefone, a.id_artista, a.quant_ouvintes " +
                "FROM usuarios u INNER JOIN artistas a ON u.id = a.id_artista";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // READ by ID - FIXED column names in SELECT
    public Artista findById(int id) {
        String sql = "SELECT u.id, u.nome, u.pais, u.estado, u.cidade, u.email, u.senha, " +
                "u.quantSeguidores, u.telefone, a.id_artista, a.quant_ouvintes " +
                "FROM usuarios u INNER JOIN artistas a ON u.id = a.id_artista WHERE u.id = ?";
        return jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    // UPDATE artista (atualiza tanto Usuario quanto Artista) - FIXED column names
    public int update(Artista artista) {
        // atualizar Usuario - FIXED column name
        String sqlUsuario = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, pais = ?, estado = ?, cidade = ?, quantSeguidores = ?, telefone = ? WHERE id = ?";
        jdbcTemplate.update(sqlUsuario,
                artista.getNome(),
                artista.getEmail(),
                artista.getSenha(),
                artista.getPais(),
                artista.getEstado(),
                artista.getCidade(),
                artista.getQuantSeguidores(), // FIXED: was quantSeguidores
                artista.getTelefone(),
                artista.getId()
        );

        // atualizar Artista
        String sqlArtista = "UPDATE artistas SET quant_ouvintes = ? WHERE id_artista = ?";
        return jdbcTemplate.update(sqlArtista,
                artista.getQuant_ouvintes(),
                artista.getId()
        );
    }

    // DELETE artista (deleta Usuario, FK ON DELETE CASCADE cuida do Artista)
    public int delete(int id) {
        return jdbcTemplate.update("DELETE FROM usuarios WHERE id = ?", id);
    }

    public int countMusicasLancadas(int idArtista) {
        String sql = "SELECT QuantMusicasArtista(?)";
        return jdbcTemplate.queryForObject(sql, Integer.class, idArtista);
    }
}
