package com.soundup.soundup.repository;

import com.soundup.soundup.model.Ouvinte;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class OuvinteRepository {
    private final JdbcTemplate jdbcTemplate;

    public OuvinteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Ouvinte> ouvinteRowMapper = (rs, rowNum) -> new Ouvinte(
            rs.getInt("id_ouvinte")
    );

    public int save(Ouvinte ouvinte) {
        String sql = "INSERT INTO ouvinte (id_ouvinte) VALUES (?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, ouvinte.getId_ouvinte());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        int generatedId = key != null ? key.intValue() : 0;
        ouvinte.setId_ouvinte(generatedId);

        return generatedId;
    }

    public Ouvinte findById(Long id) {
        String sql = "SELECT id_ouvinte FROM ouvinte WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, ouvinteRowMapper, id);
    }

    public List<Ouvinte> findAll() {
        String sql = "SELECT id_ouvinte FROM Ouvinte";
        return jdbcTemplate.query(sql, ouvinteRowMapper);
    }
}
