package com.soundup.soundup.controller;

import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlist")
@CrossOrigin("*")
public class PlaylistController {

    private final PlaylistService service;

    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping
    public List<Playlist> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> buscar(@PathVariable int id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<String> criar(@RequestBody Playlist playlist) {
        service.criar(playlist);
        return ResponseEntity.ok("Playlist criada");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(
            @PathVariable int id,
            @RequestBody Playlist playlist
    ) {
        service.atualizar(id, playlist);
        return ResponseEntity.ok("Playlist atualizada");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.ok("Playlist deletada");
    }

    @GetMapping("/{idPlaylist}/musicas/count")
    public ResponseEntity<Integer> countMusicasInPlaylist(@PathVariable int idPlaylist) {
        int total = service.countMusicasInPlaylist(idPlaylist);
        return ResponseEntity.ok(total);
    }
}
