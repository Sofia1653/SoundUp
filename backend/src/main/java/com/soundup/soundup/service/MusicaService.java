package com.soundup.soundup.service;

import com.soundup.soundup.dto.DuracaoBoxplotDTO;
import com.soundup.soundup.dto.MusicasPorAlbumDTO;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.repository.MusicaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.soundup.soundup.dto.DuracaoMediaPorAnoDTO;

@Service
public class MusicaService {

    private final MusicaRepository musicaRepository;
    private final MusicaArtistaService musicaArtistaService;
    private final ArtistaService artistaService;

    public MusicaService(MusicaRepository musicaRepository,
                         MusicaArtistaService musicaArtistaService,
                         ArtistaService artistaService) {
        this.musicaRepository = musicaRepository;
        this.musicaArtistaService = musicaArtistaService;
        this.artistaService = artistaService;
    }

    public List<Musica> getAllMusicas() {
        List<Musica> musicas = musicaRepository.findAll();
        // Load artists for each music
        for (Musica musica : musicas) {
            List<Artista> artistas = musicaArtistaService.getArtistasDaMusica(musica.getId());
            musica.setArtistas(artistas);
        }
        return musicas;
    }

    public Musica getMusicaById(int id) {
        return musicaArtistaService.getMusicaComArtistas(id);
    }

    /**
     * Create a music and associate it with an artist
     * @param musica The music to create
     * @param artistaId The ID of the artist who owns the music
     * @return The created music with ID
     */
    public Musica createMusicaComArtista(Musica musica, int artistaId) {
        // First create the music and get the generated ID
        int musicaId = musicaRepository.save(musica);

        if (musicaId > 0) {
            // Create the relationship
            musicaArtistaService.lancarMusica(artistaId, musicaId);
            return musicaArtistaService.getMusicaComArtistas(musicaId);
        } else {
            throw new RuntimeException("Failed to create music");
        }
    }

    public Musica createMusica(Musica musica) {
        musicaRepository.save(musica);
        return musica;
    }

    public void updateMusica(Musica musica) {
        musicaRepository.update(musica);
    }

    public void deleteMusica(int id) {
        musicaRepository.delete(id);
    }

    /**
     * Get all available artists for selection when creating music
     * @return List of all artists
     */
    public List<Artista> getAvailableArtistas() {
        return artistaService.getAllArtistas();
    }

    /**
     * Associate an existing music with an artist
     * @param musicaId The music ID
     * @param artistaId The artist ID
     */
    public void associarMusicaComArtista(int musicaId, int artistaId) {
        musicaArtistaService.lancarMusica(artistaId, musicaId);
    }

    /**
     * Remove association between music and artist
     * @param musicaId The music ID
     * @param artistaId The artist ID
     */
    public void removerAssociacaoMusicaArtista(int musicaId, int artistaId) {
        musicaArtistaService.removerLancamento(artistaId, musicaId);
    }
    public List<MusicasPorAlbumDTO> getMusicasPorAlbum() {
        return musicaRepository.getMusicasPorAlbum();
    }

    public DuracaoBoxplotDTO getBoxplotDuracao() {
        List<Musica> musicas = musicaRepository.findAll();

        List<Integer> duracoes = musicas.stream()
                .map(Musica::getDuracao)
                .sorted()
                .toList();

        if (duracoes.isEmpty()) {
            return new DuracaoBoxplotDTO(0, 0, 0, 0, 0);
        }

        int n = duracoes.size();

        int min = duracoes.get(0);
        int max = duracoes.get(n - 1);

        // mediana
        int mediana = (n % 2 == 0)
                ? (duracoes.get(n/2 - 1) + duracoes.get(n/2)) / 2
                : duracoes.get(n/2);

        // Q1 = mediana da metade inferior
        List<Integer> lower = duracoes.subList(0, n / 2);
        List<Integer> upper = (n % 2 == 0)
                ? duracoes.subList(n/2, n)
                : duracoes.subList(n/2 + 1, n);

        int q1 = lower.get(lower.size() / 2);
        int q3 = upper.get(upper.size() / 2);

        return new DuracaoBoxplotDTO(min, q1, mediana, q3, max);
    }
    public List<DuracaoMediaPorAnoDTO> getDuracaoMediaPorAno() {
        return musicaRepository.getDuracaoMediaPorAno();
    }
}