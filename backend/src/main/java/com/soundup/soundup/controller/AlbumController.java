package com.soundup.soundup.controller;

import com.soundup.soundup.model.Album;
import com.soundup.soundup.service.AlbumService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albuns")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public List<Album> getAll() {
        return albumService.getAllAlbuns();
    }

    @GetMapping("/{id}")
    public Album getOne(@PathVariable int id) {
        return albumService.getAlbumById(id);
    }

    @PostMapping
    public Album create(@RequestBody Album album) {
        return albumService.createAlbum(album);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable int id, @RequestBody Album album) {
        album.setId(id);
        albumService.updateAlbum(album);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        albumService.deleteAlbum(id);
    }
}
