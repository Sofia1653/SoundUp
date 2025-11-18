package com.soundup.soundup.service;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.repository.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository repo;

    public PlaylistService(PlaylistRepository repo) {
        this.repo = repo;
    }

    public List<Playlist> listarTodas() {
        return repo.findAllWithDetails();
    }

    public Playlist buscarPorId(int id) {
        return repo.findById(id);
    }

    public void criar(Playlist playlist) {
        repo.save(playlist);
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
