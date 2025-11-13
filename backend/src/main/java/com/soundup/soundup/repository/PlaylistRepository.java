package com.soundup.soundup.repository;

import com.soundup.soundup.model.Playlist;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PlaylistRepository {

    private final JdbcTemplate jdbcTemplate;

    public PlaylistRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Playlist> playlistRowMapper = (rs, rowNum) -> new Playlist(
            rs.getInt("id"),
            rs.getInt("id_ouvinte"),
            rs.getString("visibilidade"),
            rs.getString("nome")
    );

    public int save(Playlist playlist) {
        String sql = "INSERT INTO playlist (id_ouvinte, visibilidade, nome) VALUES (?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, playlist.getId_ouvinte());
            ps.setString(2, playlist.getVisibilidade());
            ps.setString(3, playlist.getNome());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        int generatedId = key != null ? key.intValue() : 0;
        playlist.setId(generatedId);

        return generatedId;
    }

    public List<Playlist> findAll() {
        String sql = "SELECT id, id_ouvinte, visibilidade, nome FROM playlist";
        return jdbcTemplate.query(sql, playlistRowMapper);
    }

    public Playlist findById(int id) {
        String sql = "SELECT id, id_ouvinte, visibilidade, nome FROM playlist WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, playlistRowMapper, id);
    }

    public int update(Playlist playlist) {
        String sql = "UPDATE playlist SET id_ouvinte = ?, visibilidade = ?, nome = ? WHERE id = ?";
        return jdbcTemplate.update(sql, playlist.getNome(), playlist.getVisibilidade(), playlist.getId(), playlist.getId_ouvinte());
    }

    public int delete(int id) {
        String sql = "DELETE FROM playlist WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}