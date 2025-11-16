package com.soundup.soundup.controller;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        playlistService.createPlaylist(playlist);
        return ResponseEntity.ok(playlist);
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

    @PostMapping("/{playlistId}/musicas/{musicaId}")
    public ResponseEntity<?> addMusica(
            @PathVariable int playlistId,
            @PathVariable int musicaId) {

        playlistService.adicionarMusicaNaPlaylist(playlistId, musicaId);
        return ResponseEntity.ok("Música adicionada à playlist!");
    }

    @PostMapping
    public ResponseEntity<?> createPlaylist(@RequestBody Map<String,Object> body){
        Playlist p = new Playlist(
                0,
                Long.valueOf(body.get("id_ouvinte").toString()),
                body.get("visibilidade").toString(),
                body.get("nome").toString()
        );

        List<Integer> musicas = (List<Integer>) body.get("musica_ids");
        playlistService.saveWithMusicas(p, musicas);

        return ResponseEntity.ok(p);
    }

}
