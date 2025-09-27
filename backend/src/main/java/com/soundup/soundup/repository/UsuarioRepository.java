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

    private RowMapper<Usuario> rowMapper = (rs, rowNum) -> new Usuario(
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
        return jdbcTemplate.query("SELECT * FROM usuarios", rowMapper);
    }

    public Usuario findById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM usuarios WHERE id = ?", rowMapper, id);
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
        return jdbcTemplate.update("DELETE FROM usuarios WHERE id = ?", id);
    }
}
