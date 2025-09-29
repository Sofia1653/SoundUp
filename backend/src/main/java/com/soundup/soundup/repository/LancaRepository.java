package com.soundup.soundup.repository;

import com.soundup.soundup.model.Lanca;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.model.Musica;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LancaRepository {

    private final JdbcTemplate jdbcTemplate;

    public LancaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Lanca> lancaRowMapper = (rs, rowNum) -> new Lanca(
            rs.getInt("id_artista"),
            rs.getInt("id_musica")
    );

    public int save(Lanca lanca) {
        String sql = "INSERT INTO Lanca (id_artista, id_musica) VALUES (?, ?)";
        return jdbcTemplate.update(sql, lanca.getId_artista(), lanca.getId_musica());
    }

    public List<Lanca> findAll() {
        String sql = "SELECT id_artista, id_musica FROM Lanca";
        return jdbcTemplate.query(sql, lancaRowMapper);
    }

    public List<Musica> findMusicasByArtista(int id_artista) {
        String sql = "SELECT m.id, m.nome, m.duracao " +
                "FROM musicas m " +
                "INNER JOIN Lanca l ON m.id = l.id_musica " +
                "WHERE l.id_artista = ?";

        RowMapper<Musica> musicaRowMapper = (rs, rowNum) -> new Musica(
                rs.getInt("id"),
                rs.getString("nome"),
                rs.getInt("duracao")
        );

        return jdbcTemplate.query(sql, musicaRowMapper, id_artista);
    }

    public List<Artista> findArtistasByMusica(int id_musica) {
        // FIXED: Correct table and column names
        String sql = "SELECT u.id, u.nome, u.pais, u.estado, u.cidade, u.email, u.senha, " +
                "u.quantSeguidores, u.telefone, a.id_artista, a.quant_ouvintes " +
                "FROM usuarios u " +
                "INNER JOIN artistas a ON u.id = a.id_artista " +
                "INNER JOIN Lanca l ON a.id_artista = l.id_artista " +
                "WHERE l.id_musica = ?";

        RowMapper<Artista> artistaRowMapper = (rs, rowNum) -> {
            Artista artista = new Artista();
            artista.setId(rs.getInt("id"));
            artista.setNome(rs.getString("nome"));
            artista.setEmail(rs.getString("email"));
            artista.setSenha(rs.getString("senha"));
            artista.setPais(rs.getString("pais"));
            artista.setEstado(rs.getString("estado"));
            artista.setCidade(rs.getString("cidade"));
            artista.setQuantSeguidores(rs.getInt("quantSeguidores")); // FIXED column name
            artista.setTelefone(rs.getString("telefone"));
            artista.setId_artista(rs.getInt("id_artista"));
            artista.setQuant_ouvintes(rs.getInt("quant_ouvintes"));
            return artista;
        };

        return jdbcTemplate.query(sql, artistaRowMapper, id_musica);
    }

    public int delete(int id_artista, int id_musica) {
        String sql = "DELETE FROM Lanca WHERE id_artista = ? AND id_musica = ?";
        return jdbcTemplate.update(sql, id_artista, id_musica);
    }

    public boolean exists(int id_artista, int id_musica) {
        String sql = "SELECT COUNT(*) FROM Lanca WHERE id_artista = ? AND id_musica = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id_artista, id_musica);
        return count != null && count > 0;
    }
}