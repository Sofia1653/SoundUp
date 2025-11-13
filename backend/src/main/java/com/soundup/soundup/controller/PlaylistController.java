package com.soundup.soundup.controller;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        Playlist saved = playlistService.save(playlist);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Playlist> getPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/{id}")
    public Playlist getPlaylist(@PathVariable int id) {
        return playlistService.getPlaylistById(id);
    }

    @PutMapping("/{id}")
    public void updatePlaylist(@PathVariable int id, @RequestBody Playlist playlist) {
        playlist.setId(id); // garante consistência do ID
        playlistService.updatePlaylist(playlist);
    }

    @DeleteMapping("/{id}")
    public void deletePlaylist(@PathVariable int id) {
        playlistService.deletePlaylistById(id);
    }

}
