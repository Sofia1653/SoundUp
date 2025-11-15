package com.soundup.soundup.repository;

import com.soundup.soundup.dto.ContagemPorPaisDTO;
import com.soundup.soundup.model.Usuario;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UsuarioRepository {

    private final JdbcTemplate jdbcTemplate;

    public UsuarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Usuario> usuarioRowMapper = (rs, rowNum) -> {
        Usuario u = new Usuario();
        u.setId(rs.getInt("id"));
        u.setNome(rs.getString("nome"));
        u.setEmail(rs.getString("email"));
        u.setSenha(rs.getString("senha"));
        u.setPais(rs.getString("pais"));
        u.setEstado(rs.getString("estado"));
        u.setCidade(rs.getString("cidade"));
        u.setQuantSeguidores(rs.getInt("quantSeguidores"));
        u.setTelefone(rs.getString("telefone"));
        return u;
    };

    public Usuario save(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, email, senha, pais, estado, cidade, quantSeguidores, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getSenha());
            ps.setString(4, usuario.getPais());
            ps.setString(5, usuario.getEstado());
            ps.setString(6, usuario.getCidade());
            ps.setInt(7, usuario.getQuantSeguidores());
            ps.setString(8, usuario.getTelefone());
            return ps;
        }, keyHolder);

        usuario.setId(keyHolder.getKey().intValue());
        return usuario;
    }

    public List<Usuario> findAll() {
        String sql = "SELECT * FROM usuarios";
        return jdbcTemplate.query(sql, usuarioRowMapper);
    }

    public Usuario findById(int id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, usuarioRowMapper, id);
    }

    public int update(Usuario usuario) {
        String sql = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, pais = ?, estado = ?, cidade = ?, quantSeguidores = ?, telefone = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getPais(),
                usuario.getEstado(),
                usuario.getCidade(),
                usuario.getQuantSeguidores(),
                usuario.getTelefone(),
                usuario.getId()
        );
    }

    public int delete(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public List<ContagemPorPaisDTO> getContagemUsuariosPorPais() {
        String sql =
                "SELECT pais, COUNT(id) AS contagem " +
                        "FROM usuarios " +
                        "GROUP BY pais " +
                        "ORDER BY contagem DESC"; // Ordenamos para visualizar o Top

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new ContagemPorPaisDTO(
                        rs.getString("pais"),
                        rs.getInt("contagem")
                )
        );
    }
}
