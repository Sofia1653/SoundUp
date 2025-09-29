package com.soundup.soundup.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.soundup.soundup.model.Preferencias;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PreferenciasRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PreferenciasRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Preferencias preferencia) {
        String sql = "INSERT INTO Preferencias (todos_dias, plataforma, tipo_playlist, media_horas, humor, horario_dia, concentracao, locomocao, tipo_musica, musica_dormir, momentos_vida, motivacao, polemicas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                preferencia.getTodos_dias(),
                preferencia.getPlataforma(),
                preferencia.getTipo_playlist(),
                preferencia.getMedia_horas(),
                preferencia.getHumor(),
                preferencia.getHorario_dia(),
                preferencia.getConcentracao(),
                preferencia.getLocomocao(),
                preferencia.getTipo_musica(),
                preferencia.getMusica_dormir(),
                preferencia.getMomentos_vida(),
                preferencia.getMotivacao(),
                preferencia.getPolemicas());
    }

    public List<Preferencias> findAll() {
        String sql = "SELECT * FROM Preferencias";
        return jdbcTemplate.query(sql, this::mapRowToPreferencias);
    }

    private Preferencias mapRowToPreferencias(ResultSet rs, int rowNum) throws SQLException {
        return new Preferencias(
                rs.getString("todos_dias"),
                rs.getString("plataforma"),
                rs.getString("tipo_playlist"),
                rs.getString("media_horas"),
                rs.getString("humor"),
                rs.getString("horario_dia"),
                rs.getString("concentracao"),
                rs.getString("locomocao"),
                rs.getString("tipo_musica"),
                rs.getString("musica_dormir"),
                rs.getString("momentos_vida"),
                rs.getString("motivacao"),
                rs.getString("polemicas")
        );
    }
}
