package com.soundup.soundup.repository;

import com.soundup.soundup.model.Album;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AlbumRepository {

    private final JdbcTemplate jdbcTemplate;

    public AlbumRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Album> albumRowMapper = (rs, rowNum) ->
            new Album(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getInt("duracao"),
                    rs.getInt("ano")
            );

    public int save(Album album) {
        String sql = "INSERT INTO albuns (nome, duracao, ano) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, album.getNome());
            ps.setInt(2, album.getDuracao());
            ps.setInt(3, album.getAno());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        int id = key != null ? key.intValue() : 0;
        album.setId(id);

        return id;
    }

    public Album findById(int id) {
        String sql = "SELECT id, nome, duracao, ano FROM albuns WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, albumRowMapper, id);
    }

    public List<Album> findAll() {
        String sql = "SELECT id_album, nome, duracao, ano FROM albuns";
        return jdbcTemplate.query(sql, albumRowMapper);
    }

    public int update(Album album) {
        String sql = "UPDATE albuns SET nome = ?, duracao = ?, ano = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                album.getNome(),
                album.getDuracao(),
                album.getAno(),
                album.getId());
    }

    public int delete(int id) {
        String sql = "DELETE FROM albuns WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
