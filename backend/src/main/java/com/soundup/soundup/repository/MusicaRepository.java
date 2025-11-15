package com.soundup.soundup.repository;

import com.soundup.soundup.dto.DuracaoMediaPorAnoDTO;
import com.soundup.soundup.dto.MusicasPorAlbumDTO;
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

    private RowMapper<Musica> musicaRowMapper = (rs, rowNum) -> {
        Musica musica = new Musica(
                rs.getInt("id"),
                rs.getString("nome"),
                rs.getInt("duracao")
        );
        musica.setId_album(rs.getObject("id_album", Integer.class));
        return musica;
    };

    public int save(Musica musica) {
        String sql = "INSERT INTO musicas (nome, duracao, id_album) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, musica.getNome());
            ps.setInt(2, musica.getDuracao());
            ps.setObject(3, musica.getId_album());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        int generatedId = key != null ? key.intValue() : 0;
        musica.setId(generatedId);

        return generatedId;
    }

    public List<Musica> findAll() {
        String sql = "SELECT id, nome, duracao, id_album FROM musicas";
        return jdbcTemplate.query(sql, musicaRowMapper);
    }

    public Musica findById(int id) {
        String sql = "SELECT id, nome, duracao, id_album FROM musicas WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, musicaRowMapper, id);
    }

    public int update(Musica musica) {
        String sql = "UPDATE musicas SET nome = ?, duracao = ?, id_album = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                musica.getNome(),
                musica.getDuracao(),
                musica.getId_album(),
                musica.getId());
    }

    public int delete(int id) {
        String sql = "DELETE FROM musicas WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public List<Musica> findByAlbumId(int id_album) {
        String sql = "SELECT id, nome, duracao, id_album FROM musicas WHERE id_album = ?";
        return jdbcTemplate.query(sql, musicaRowMapper, id_album);
    }

    public List<MusicasPorAlbumDTO> getMusicasPorAlbum() {
        String sql =
                "SELECT a.nome AS album, COUNT(m.id) AS quantidade " +
                        "FROM albuns a " +
                        "LEFT JOIN musicas m ON m.id_album = a.id_album " +
                        "GROUP BY a.id_album " +
                        "ORDER BY quantidade DESC";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new MusicasPorAlbumDTO(
                        rs.getString("album"),
                        rs.getInt("quantidade")
                )
        );
    }
    public int updateAlbumId(int musicaId, Integer id_album) {
        String sql = "UPDATE musicas SET id_album = ? WHERE id = ?";
        return jdbcTemplate.update(sql, id_album, musicaId);
    }
    public int clearAlbumIdForAlbum(int id_album) {
        String sql = "UPDATE musicas SET id_album = NULL WHERE id_album = ?";
        return jdbcTemplate.update(sql, id_album);
    }

    public List<DuracaoMediaPorAnoDTO> getDuracaoMediaPorAno() {
        String sql =
                "SELECT a.ano, AVG(m.duracao) AS duracao_media " +
                        "FROM albuns a " +
                        "JOIN musicas m ON m.id_album = a.id_album " +
                        "GROUP BY a.ano " +
                        "ORDER BY a.ano ASC"; // Ordenar por ano é crucial para o gráfico de linha!

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new DuracaoMediaPorAnoDTO(
                        rs.getInt("ano"),
                        rs.getDouble("duracao_media") // Use getDouble
                )
        );
    }
}
