package com.soundup.soundup.service;

import com.soundup.soundup.dto.ArtistaColaboracaoDTO;
import com.soundup.soundup.dto.ArtistaIndependenteDTO;
import com.soundup.soundup.dto.DuracaoPorAlbumDTO;
import com.soundup.soundup.dto.MusicaEGeneroDTO;
import com.soundup.soundup.dto.CatalogoDetalhadoMusicaDTO;
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

    public List<DuracaoPorAlbumDTO> getDuracaoPorAlbum() {
        String sql = """
        SELECT 
            al.id_album AS album_id,
            al.nome AS album_nome,
            (
                SELECT SUM(m.duracao)
                FROM Pertence p
                JOIN musicas m ON p.id_musica = m.id
                WHERE p.id_album = al.id_album
            ) AS duracao_total_segundos
        FROM albuns al;
    """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new DuracaoPorAlbumDTO(
                        rs.getInt("album_id"),
                        rs.getString("album_nome"),
                        rs.getInt("duracao_total_segundos")
                )
        );
    }

    public List<MusicaEGeneroDTO> getMusicaEGenero() {
        String sql = """
            SELECT
                m.nome AS Musica,
                (
                    SELECT g.nome
                    FROM Genero g
                             JOIN Tem t ON t.id_genero = g.id
                    WHERE t.id_musica = m.id
                          LIMIT 1
                ) AS genero
            FROM musicas m;
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new MusicaEGeneroDTO(
                        rs.getString("Musica"),
                        rs.getString("genero")
                )
        );
    }

    public List<ArtistaIndependenteDTO> getArtistasIndependentes() {
        String sql = """
        SELECT u.nome
        FROM artistas a
        JOIN usuarios u ON a.id_artista = u.id
        LEFT JOIN Colabora c1 ON c1.id_artistaPrincipal = a.id_artista
        LEFT JOIN Colabora c2 ON c2.id_artistaConvidado = a.id_artista
        WHERE c1.id_artistaPrincipal IS NULL 
          AND c2.id_artistaConvidado IS NULL;
        """;



        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new ArtistaIndependenteDTO(
                        rs.getString("nome")
                )
        );
    }

    public List<ArtistaColaboracaoDTO> getColaboracoesPorArtista() {

        String sql = """
    SELECT 
        u.nome AS nome_artista,
        'Principal' AS papel,
        COUNT(c.id_artistaConvidado) AS total_colaboracoes
    FROM Colabora c
    JOIN artistas a ON c.id_artistaPrincipal = a.id_artista
    JOIN usuarios u ON a.id_artista = u.id
    GROUP BY u.nome

    UNION

    SELECT 
        u.nome AS nome_artista,
        'Convidado' AS papel,
        COUNT(c.id_artistaPrincipal) AS total_colaboracoes
    FROM Colabora c
    JOIN artistas a ON c.id_artistaConvidado = a.id_artista
    JOIN usuarios u ON a.id_artista = u.id
    GROUP BY u.nome

    ORDER BY nome_artista
    """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new ArtistaColaboracaoDTO(
                        rs.getString("nome_artista"),
                        rs.getString("papel"),
                        rs.getInt("total_colaboracoes")
                )
        );
    }

    public List<CatalogoDetalhadoMusicaDTO> getCatalogoDetalhadoMusicas() {

        jdbcTemplate.update("""
        CREATE OR REPLACE VIEW vw_CatalogoDetalhadoMusicas AS
        SELECT 
            m.id AS id_musica,
            m.nome AS nome_musica,
            m.duracao AS duracao_segundos,

            u.id AS id_artista,
            u.nome AS nome_artista,

            alb.id_album AS id_album,
            alb.nome AS nome_album,

            g.id AS id_genero,
            g.nome AS nome_genero

        FROM musicas m
        LEFT JOIN Lanca l ON m.id = l.id_musica
        LEFT JOIN usuarios u ON l.id_artista = u.id

        LEFT JOIN Pertence p ON m.id = p.id_musica
        LEFT JOIN albuns alb ON p.id_album = alb.id_album

        LEFT JOIN Tem t ON m.id = t.id_musica
        LEFT JOIN Genero g ON t.id_genero = g.id;
    """);

        // Agora consulta a view CORRETA
        String sqlSelect = "SELECT * FROM vw_CatalogoDetalhadoMusicas";

        return jdbcTemplate.query(sqlSelect, (rs, rowNum) ->
                new CatalogoDetalhadoMusicaDTO(
                        rs.getInt("id_musica"),
                        rs.getString("nome_musica"),
                        rs.getInt("duracao_segundos"),

                        rs.getInt("id_artista"),
                        rs.getString("nome_artista"),

                        rs.getInt("id_album"),
                        rs.getString("nome_album"),

                        rs.getObject("id_genero", Integer.class),
                        rs.getString("nome_genero")
                )
        );
    }

}
