package com.soundup.soundup.repository;

import com.soundup.soundup.model.Playlist;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
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
                rs.getString("nome"),
                null // será carregada depois
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
        Playlist playlist = jdbcTemplate.queryForObject(
                "SELECT * FROM Playlist WHERE id = ?",
                this::mapRow,
                id
        );

        playlist.setMusicasIds(findMusicasIdsByPlaylist(id));
        return playlist;
    }

    // Listar todas com musicasIds
    public List<Playlist> findAllWithDetails() {
        List<Playlist> playlists = jdbcTemplate.query(
                "SELECT * FROM Playlist",
                this::mapRow
        );

        for (Playlist p : playlists) {
            p.setMusicasIds(findMusicasIdsByPlaylist(p.getId()));
        }

        return playlists;
    }

    public void save(Playlist playlist) {
        jdbcTemplate.update(
                "INSERT INTO Playlist (id_ouvinte, visibilidade, nome) VALUES (?, ?, ?)",
                playlist.getIdOuvinte(),
                playlist.getVisibilidade(),
                playlist.getNome()
        );
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
        jdbcTemplate.update("DELETE FROM Playlist WHERE id=?", id);
    }
}
