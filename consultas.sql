SELECT m.nome AS musica, m.duracao, u.nome AS artista, u.pais
	FROM musicas m
	JOIN Lanca l ON m.id = l.id_musica
	JOIN artistas a ON l.id_artista = a.id_artista
	JOIN usuarios u ON a.id_artista = u.id
	WHERE m.duracao >= 180
	AND u.id IN (SELECT id FROM usuarios WHERE pais = 'Brasil');

SELECT u.nome AS artista, a.quant_ouvintes,
                   (SELECT AVG(m2.duracao)
                    FROM Lanca l2
                    JOIN musicas m2 ON l2.id_musica = m2.id
                    WHERE l2.id_artista = a.id_artista) AS duracao_media
            FROM artistas a
            JOIN usuarios u ON a.id_artista = u.id
            ORDER BY a.quant_ouvintes DESC;

SELECT u.nome AS artista,
                   (SELECT COUNT(*)
                    FROM Lanca l2
                    JOIN musicas m2 ON l2.id_musica = m2.id
                    WHERE l2.id_artista = a.id_artista) AS total_musicas
            FROM artistas a
            JOIN usuarios u ON a.id_artista = u.id
            WHERE u.estado = "SP";

SELECT pais, total_artistas
            FROM (
                SELECT u.pais, COUNT(a.id_artista) AS total_artistas
                FROM artistas a
                JOIN usuarios u ON a.id_artista = u.id
                GROUP BY u.pais
            ) AS sub
            ORDER BY total_artistas DESC;
