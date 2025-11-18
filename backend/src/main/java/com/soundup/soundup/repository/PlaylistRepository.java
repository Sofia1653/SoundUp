package com.soundup.soundup.repository;

import com.soundup.soundup.model.Playlist;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class PlaylistRepository {

    private final JdbcTemplate jdbcTemplate;

    public PlaylistRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Playlist mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Playlist(
                rs.getInt("id"),
                rs.getLong("id_ouvinte"),
                rs.getString("visibilidade"),
                rs.getString("nome")
                //null // será carregada depois
        );
    }

    // Lista IDs das músicas da playlist
    public List<Integer> findMusicasIdsByPlaylist(int playlistId) {
        return jdbcTemplate.query(
                "SELECT id_musica FROM Possui WHERE id_playlist = ?",
                (rs, i) -> rs.getInt("id_musica"),
                playlistId
        );
    }

    // Buscar playlist com musicasIds
    public Playlist findById(int id) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM Playlist WHERE id = ?",
                this::mapRow,
                id
        );
    }

    // Listar todas com musicasIds
    public List<Playlist> findAllWithDetails() {
        // Renomeie este método para refletir que ele não carrega os detalhes completos
        return jdbcTemplate.query(
                "SELECT * FROM Playlist",
                this::mapRow
        );
    }

    public int save(Playlist playlist) {
        // Objeto para armazenar a chave (ID) gerada pelo banco
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                String sql = "INSERT INTO Playlist (id_ouvinte, visibilidade, nome) VALUES (?, ?, ?)";

                // 1. Criar o PreparedStatement, indicando que queremos as chaves geradas
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                // 2. Definir os parâmetros
                ps.setLong(1, playlist.getIdOuvinte());
                ps.setString(2, playlist.getVisibilidade());
                ps.setString(3, playlist.getNome());

                return ps;
            }
        }, keyHolder);

        // 3. Retornar o ID gerado
        Number key = keyHolder.getKey();
        if (key == null) {
            throw new RuntimeException("Falha ao recuperar ID da playlist inserida.");
        }
        return key.intValue();
    }

    public void update(int id, Playlist playlist) {
        jdbcTemplate.update(
                "UPDATE Playlist SET visibilidade=?, nome=? WHERE id=?",
                playlist.getVisibilidade(),
                playlist.getNome(),
                id
        );
    }
  
    public void delete(int id) {
        jdbcTemplate.update("DELETE FROM Playlist WHERE id=?", id
        );
    }

    // função 2
    public int countMusicasInPlaylist(int idPlaylist) {
        String sql = "SELECT QuantMusicasPlaylist(?)";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, idPlaylist);

        return (count != null) ? count : 0;
    }

    // métodos pro dashboard
    public long count() {
        String sql = "SELECT COUNT(*) FROM Playlist";
        Long count = jdbcTemplate.queryForObject(sql, Long.class);
        return (count != null) ? count : 0;
    }

    public long countByVisibilidade(String visibilidade) {
        String sql = "SELECT COUNT(*) FROM Playlist WHERE visibilidade = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, visibilidade);
        return (count != null) ? count : 0;
    }

    public double avgMusicasPorPlaylist() {
        String sql = "SELECT AVG(total_musicas) " +
                "FROM ( " +
                "    SELECT COUNT(id_musica) as total_musicas " +
                "    FROM Possui " +
                "    GROUP BY id_playlist " +
                ") as contagem_playlist";

        Double avg = jdbcTemplate.queryForObject(sql, Double.class);
        return (avg != null) ? avg : 0.0;
    }
}
