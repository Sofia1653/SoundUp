package com.soundup.soundup.repository;

import com.soundup.soundup.model.Musica;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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

    public int save(Musica musica) {
        String sql = "INSERT INTO musicas (nome, duracao) VALUES (?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, musica.getNome());
            ps.setInt(2, musica.getDuracao());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        int generatedId = key != null ? key.intValue() : 0;
        musica.setId(generatedId);

        return generatedId;
    }

    public List<Musica> findAll() {
        String sql = "SELECT id, nome, duracao FROM musicas";
        return jdbcTemplate.query(sql, musicaRowMapper);
    }

    public Musica findById(int id) {
        String sql = "SELECT id, nome, duracao FROM musicas WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, musicaRowMapper, id);
    }

    public int update(Musica musica) {
        String sql = "UPDATE musicas SET nome = ?, duracao = ? WHERE id = ?";
        return jdbcTemplate.update(sql, musica.getNome(), musica.getDuracao(), musica.getId());
    }

    public int delete(int id) {
        String sql = "DELETE FROM musicas WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
