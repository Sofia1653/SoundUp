package com.soundup.soundup.service;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.repository.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    //private final PlaylistService playlistService;
    private final OuvinteService ouvinteService;

    public PlaylistService(PlaylistRepository playlistRepository, OuvinteService ouvinteService) {
        this.playlistRepository = playlistRepository;
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
        playlistRepository.save(playlist);
    }

    public void updatePlaylist(Playlist playlist) {
        playlistRepository.update(playlist);
    }

    public void deletePlaylistById(int id) {
        playlistRepository.delete(id);
    }

    public Playlist save(Playlist playlist) {
        playlistRepository.save(playlist);
        return playlist;
    }
}
