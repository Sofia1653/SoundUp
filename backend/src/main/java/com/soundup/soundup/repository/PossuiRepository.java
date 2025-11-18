package com.soundup.soundup.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PossuiRepository {

    private final JdbcTemplate jdbcTemplate;

    public PossuiRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Adiciona uma música a uma playlist na tabela de ligação 'possui'.
     * @param idPlaylist ID da playlist recém-criada.
     * @param idMusica ID da música a ser associada.
     */
    public void addMusicaToPlaylist(int idPlaylist, int idMusica) {
        // Assume que a tabela de ligação se chama 'possui' e tem as colunas id_playlist e id_musica.
        String sql = "INSERT INTO Possui (id_playlist, id_musica) VALUES (?, ?)";

        // Use try-catch ou verifique duplicatas se necessário, mas o básico é o INSERT
        try {
            jdbcTemplate.update(sql, idPlaylist, idMusica);
        } catch (Exception e) {
            // Logar ou tratar erro, como a música já estar na playlist
            System.err.println("Erro ao adicionar música à playlist: " + e.getMessage());
        }
    }
}