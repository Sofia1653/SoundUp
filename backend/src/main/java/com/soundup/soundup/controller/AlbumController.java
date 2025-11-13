package com.soundup.soundup.controller;

import com.soundup.soundup.model.Album;
import com.soundup.soundup.model.Musica;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.soundup.soundup.service.AlbumService;

import java.util.List;

@RestController
@RequestMapping("/api/album")
public class AlbumController {
    private final AlbumService albumService;
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public List<Album> getAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public Album getAlbum(@PathVariable int id) {
        return albumService.getAlbumById(id);
    }


}
