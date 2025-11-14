package com.soundup.soundup.service;

import com.soundup.soundup.model.Album;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.repository.AlbumRepository;
import com.soundup.soundup.repository.MusicaRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final MusicaRepository musicaRepository;

    public AlbumService(AlbumRepository albumRepository, MusicaRepository musicaRepository) {
        this.albumRepository = albumRepository;
        this.musicaRepository = musicaRepository;
    }

    public Album createAlbum(Album album) {
        albumRepository.save(album);
        return album;
    }

    public List<Album> getAllAlbuns() {
        return albumRepository.findAll();
    }

    public Album getAlbumById(int id) {
        Album album = albumRepository.findById(id);
        List<Musica> musicas = musicaRepository.findByAlbumId(id);
        album.setMusicas(musicas);
        return album;
    }

    public void updateAlbum(Album album) {
        albumRepository.update(album);
    }

    public void deleteAlbum(int id) {
        albumRepository.delete(id);
    }
}
