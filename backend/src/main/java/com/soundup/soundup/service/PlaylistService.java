package com.soundup.soundup.service;

import com.soundup.soundup.model.Musica;
import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.repository.PlaylistRepository;
import com.soundup.soundup.repository.PossuiRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository repo;
    private final PossuiRepository possuiRepository;
    private final MusicaService musicaService;

    public PlaylistService(PlaylistRepository repo, PossuiRepository possuiRepository, MusicaService musicaService) {
        this.repo = repo;
        this.possuiRepository = possuiRepository;
        this.musicaService = musicaService;
    }

    private void loadMusicas(Playlist playlist) {
        if (playlist == null) return;

        // 1. OBTÉM OS IDs usando o repositório
        List<Integer> musicaIds = repo.findMusicasIdsByPlaylist(playlist.getId());

        if (musicaIds.isEmpty()) {
            playlist.setMusicas(new ArrayList<>());
            return;
        }

        List<Musica> musicasCompletas = new ArrayList<>();

        // 2. Itera sobre a lista de IDs de músicas e busca o objeto completo (agora sem duplicidade de nome)
        for (int musicaId : musicaIds) {
            Musica musica = musicaService.getMusicaById(musicaId);
            if (musica != null) {
                musicasCompletas.add(musica);
            }
        }
        playlist.setMusicas(musicasCompletas);
    }

    public List<Playlist> listarTodas() {
        List<Playlist> playlists = repo.findAllWithDetails();
        playlists.forEach(this::loadMusicas);
        return playlists;
    }

    public Playlist buscarPorId(int id) {
        Playlist playlist = repo.findById(id);
        if (playlist != null) {
            loadMusicas(playlist);
        }
        return playlist;
    }

    public Playlist criar(Playlist playlist) {
        int idGerado = repo.save(playlist);
        playlist.setId(idGerado);
        if (playlist.getMusicas() != null && !playlist.getMusicas().isEmpty()) {
            for (Musica musica : playlist.getMusicas()) {
                possuiRepository.addMusicaToPlaylist(idGerado, musica.getId());
            }
        }
        return buscarPorId(idGerado);
    }

    public void atualizar(int id, Playlist playlist) {
        repo.update(id, playlist);
    }

    public void deletar(int id) {
        repo.delete(id);
    }

    public int countMusicasInPlaylist(int idPlaylist) {
        return repo.countMusicasInPlaylist(idPlaylist);
    }
}
