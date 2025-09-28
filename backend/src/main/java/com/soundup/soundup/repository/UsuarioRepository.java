package com.soundup.soundup.repository;

import com.soundup.soundup.model.Usuario;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuarioRepository {

    private final JdbcTemplate jdbcTemplate;

    public UsuarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Usuario> usuarioRowMapper = (rs, rowNum) -> new Usuario(
            rs.getInt("id"),
            rs.getString("nome"),
            rs.getString("email"),
            rs.getString("senha"),
            rs.getString("pais"),
            rs.getString("estado"),
            rs.getString("cidade"),
            rs.getInt("quantSeguidores"),
            rs.getString("telefone")
    );

    public int save(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, email, senha, pais, estado, cidade, quantSeguidores, telefone) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getPais(),
                usuario.getEstado(),
                usuario.getCidade(),
                usuario.getQuantSeguidores(),
                usuario.getTelefone()
        );
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
}
