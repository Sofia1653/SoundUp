package com.soundup.soundup.service;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.repository.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MusicaService musicaService;
    private final OuvinteService ouvinteService;

    public PlaylistService(PlaylistRepository playlistRepository, MusicaService musicaService ,OuvinteService ouvinteService) {
        this.playlistRepository = playlistRepository;
        this.musicaService = musicaService;
        this.ouvinteService = ouvinteService;
    }

    public List<Playlist> getAllPlaylists() {
        List<Playlist> playlists = playlistRepository.findAll();
        return playlists;
    }

    public Playlist getPlaylistById(int id) {
        return playlistRepository.findById(id);
    }

    public void createPlaylist(Playlist playlist) {
        verificarSeOuvinteExiste(playlist.getIdOuvinte());
        playlistRepository.save(playlist);
    }

    public void updatePlaylist(Playlist playlist) {

        verificarSeOuvinteExiste(playlist.getIdOuvinte());
        playlistRepository.update(playlist);
    }

    public void deletePlaylistById(int id) {
        playlistRepository.delete(id);
    }

    public Playlist save(Playlist playlist) {
        playlistRepository.save(playlist);
        return playlist;
    }

    public void adicionarMusicaNaPlaylist(int playlistId, int musicaId) {

        Playlist playlist = playlistRepository.findById(playlistId);
        if (playlist == null) {
            throw new RuntimeException("Playlist não encontrada");
        }

        if (musicaService.getMusicaById(musicaId) == null) {
            throw new RuntimeException("Música não encontrada");
        }

        playlistRepository.addMusicaToPlaylist(playlistId, musicaId);
    }

    public void verificarSeOuvinteExiste(Long idOuvinte) {
        if (ouvinteService.getOuvinteById(idOuvinte) == null) {
            throw new RuntimeException("Ouvinte não encontrado");
        }
    }


}
