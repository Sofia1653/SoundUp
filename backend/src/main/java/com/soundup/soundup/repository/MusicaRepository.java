package com.soundup.soundup.repository;

import com.soundup.soundup.model.Musica;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MusicaRepository {

    private final JdbcTemplate jdbcTemplate;

    public MusicaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Musica> musicaRowMapper = (rs, rowNum) -> new Musica(
        rs.getInt("id"),
        rs.getString("nome"),
        rs.getInt("duracao")
    );

    public int save(Musica musicas) {
        String sql = "INSERT INTO musicas (nome, duracao) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql,
                musicas.getNome(),
                musicas.getDuracao()
        );
    }

    public List<Musica> findAll() {
        String sql = "SELECT * FROM musicas";
        return jdbcTemplate.query(sql, musicaRowMapper);
    }

    public Musica findById(int id) {
        String sql = "SELECT * FROM musicas WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, musicaRowMapper, id);
    }

    public int update(Musica musicas) {
        String sql = "UPDATE musicas SET nome = ?, duracao = ? WHERE id = ?";
        return jdbcTemplate.update(sql, musicas.getNome(), musicas.getDuracao(), musicas.getId());
    }

    public int delete(int id) {
        String sql = "DELETE FROM musicas WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
