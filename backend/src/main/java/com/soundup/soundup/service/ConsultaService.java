package com.soundup.soundup.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ConsultaService {

    private final JdbcTemplate jdbcTemplate;

    public ConsultaService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 1. Musicas por duração e país
    public List<Map<String, Object>> musicasPorDuracaoEPais(int duracaoMin, String pais) {
        String sql = """
            SELECT m.nome AS musica, m.duracao, u.nome AS artista, u.pais
            FROM musicas m
            JOIN Lanca l ON m.id = l.id_musica
            JOIN artistas a ON l.id_artista = a.id_artista
            JOIN usuarios u ON a.id_artista = u.id
            WHERE m.duracao >= ?
              AND u.id IN (SELECT id FROM usuarios WHERE pais = ?)
        """;
        return jdbcTemplate.queryForList(sql, duracaoMin, pais);
    }

    // 2. Ranking de artistas por ouvintes e duração média
    public List<Map<String, Object>> rankingArtistas() {
        String sql = """
            SELECT u.nome AS artista, a.quant_ouvintes,
                   (SELECT AVG(m2.duracao)
                    FROM Lanca l2
                    JOIN musicas m2 ON l2.id_musica = m2.id
                    WHERE l2.id_artista = a.id_artista) AS duracao_media
            FROM artistas a
            JOIN usuarios u ON a.id_artista = u.id
            ORDER BY a.quant_ouvintes DESC
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 3. Contagem de músicas por artista em estado específico
    public List<Map<String, Object>> contagemMusicasPorEstado(String estado) {
        String sql = """
            SELECT u.nome AS artista,
                   (SELECT COUNT(*)
                    FROM Lanca l2
                    JOIN musicas m2 ON l2.id_musica = m2.id
                    WHERE l2.id_artista = a.id_artista) AS total_musicas
            FROM artistas a
            JOIN usuarios u ON a.id_artista = u.id
            WHERE u.estado = ?
        """;
        return jdbcTemplate.queryForList(sql, estado);
    }

    // 4. Ranking de países por número de artistas
    public List<Map<String, Object>> rankingPaises() {
        String sql = """
            SELECT pais, total_artistas
            FROM (
                SELECT u.pais, COUNT(a.id_artista) AS total_artistas
                FROM artistas a
                JOIN usuarios u ON a.id_artista = u.id
                GROUP BY u.pais
            ) AS sub
            ORDER BY total_artistas DESC
        """;
        return jdbcTemplate.queryForList(sql);
    }
}
