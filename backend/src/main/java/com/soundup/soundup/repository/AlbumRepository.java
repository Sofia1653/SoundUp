package com.soundup.soundup.repository;

import com.soundup.soundup.model.Album;
import com.soundup.soundup.model.Musica;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class AlbumRepository {
    private final JdbcTemplate jdbcTemplate;

    public AlbumRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    private RowMapper<Album> albumRowMapper = (rs, rowNum) -> new Album(
            rs.getInt("id"),
            rs.getString("nome"),
            rs.getInt("duracao")
    );
    public int save(Album album){
        String sql = "INSERT INTO album (nome, duracao) VALUES (?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, album.getNome());
            ps.setInt(2, album.getDuracao());
            return ps;
        }, keyHolder);
        Number key = keyHolder.getKey();
        int generatedId = key != null ? key.intValue() : 0;
        album.setId(generatedId);
        return generatedId;
    }
    public List<Album> findAll() {
        String sql = "SELECT id, nome, duracao FROM album";
        return jdbcTemplate.query(sql, albumRowMapper);
    }

    public Album findById(int id) {
        String sql = "SELECT id, nome, duracao FROM album WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, albumRowMapper, id);
    }

    public int update(Album album) {
        String sql = "UPDATE album SET nome = ?, duracao = ? WHERE id = ?";
        return jdbcTemplate.update(sql, album.getNome(), album.getDuracao(), album.getId());
    }

    public int delete(int id) {
        String sql = "DELETE FROM album WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
