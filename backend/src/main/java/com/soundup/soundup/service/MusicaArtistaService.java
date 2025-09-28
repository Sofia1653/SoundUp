package com.soundup.soundup.service;

import com.soundup.soundup.model.Artista;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.model.Lanca;
import com.soundup.soundup.repository.LancaRepository;
import com.soundup.soundup.repository.ArtistaRepository;
import com.soundup.soundup.repository.MusicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicaArtistaService {

    private final LancaRepository lancaRepository;
    private final ArtistaRepository artistaRepository;
    private final MusicaRepository musicaRepository;

    public MusicaArtistaService(LancaRepository lancaRepository,
                                ArtistaRepository artistaRepository,
                                MusicaRepository musicaRepository) {
        this.lancaRepository = lancaRepository;
        this.artistaRepository = artistaRepository;
        this.musicaRepository = musicaRepository;
    }

    /**
     * Creates a relationship between an artist and a music
     * @param artistaId The artist ID
     * @param musicaId The music ID
     * @return Lanca object representing the relationship
     */
    public Lanca lancarMusica(int artistaId, int musicaId) {
        // Check if relationship already exists
        if (lancaRepository.exists(artistaId, musicaId)) {
            throw new RuntimeException("Relationship already exists between artist and music");
        }

        // Verify that artist and music exist
        try {
            Artista artista = artistaRepository.findById(artistaId);
            Musica musica = musicaRepository.findById(musicaId);

            if (artista == null) {
                throw new RuntimeException("Artist not found with ID: " + artistaId);
            }
            if (musica == null) {
                throw new RuntimeException("Music not found with ID: " + musicaId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error finding artist or music: " + e.getMessage());
        }

        // Create the relationship record
        Lanca lanca = new Lanca(artistaId, musicaId);
        lancaRepository.save(lanca);

        return lanca;
    }

    /**
     * Removes the relationship between an artist and a music
     * @param artistaId The artist ID
     * @param musicaId The music ID
     */
    public void removerLancamento(int artistaId, int musicaId) {
        lancaRepository.delete(artistaId, musicaId);
    }

    /**
     * Get all musics from an artist
     * @param artistaId The artist ID
     * @return List of musics
     */
    public List<Musica> getMusicasDoArtista(int artistaId) {
        return lancaRepository.findMusicasByArtista(artistaId);
    }

    /**
     * Get all artists from a music
     * @param musicaId The music ID
     * @return List of artists
     */
    public List<Artista> getArtistasDaMusica(int musicaId) {
        return lancaRepository.findArtistasByMusica(musicaId);
    }

    /**
     * Get artist with their musics loaded
     * @param artistaId The artist ID
     * @return Artist with musics
     */
    public Artista getArtistaComMusicas(int artistaId) {
        Artista artista = artistaRepository.findById(artistaId);
        if (artista != null) {
            List<Musica> musicas = getMusicasDoArtista(artistaId);
            artista.setMusicasLancadas(musicas);
        }
        return artista;
    }

    /**
     * Get music with their artists loaded
     * @param musicaId The music ID
     * @return Music with artists
     */
    public Musica getMusicaComArtistas(int musicaId) {
        Musica musica = musicaRepository.findById(musicaId);
        if (musica != null) {
            List<Artista> artistas = getArtistasDaMusica(musicaId);
            musica.setArtistas(artistas);
        }
        return musica;
    }
}
