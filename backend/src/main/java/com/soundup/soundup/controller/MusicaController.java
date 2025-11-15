package com.soundup.soundup.controller;

import com.soundup.soundup.dto.MusicasPorAlbumDTO;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.service.MusicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musicas")
public class MusicaController {

    private final MusicaService musicaService;

    public MusicaController(MusicaService musicaService) {
        this.musicaService = musicaService;
    }

    @GetMapping
    public List<Musica> getMusicas() {
        return musicaService.getAllMusicas();
    }

    @GetMapping("/{id}")
    public Musica getMusica(@PathVariable int id) {
        return musicaService.getMusicaById(id);
    }

    // NEW: Create music with artist selection
    @PostMapping("/com-artista")
    public ResponseEntity<Musica> createMusicaComArtista(
            @RequestBody Musica musica,
            @RequestParam int artistaId) {
        try {
            Musica musicaCriada = musicaService.createMusicaComArtista(musica, artistaId);
            return ResponseEntity.ok(musicaCriada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Original create method (without artist) - kept for backward compatibility
    @PostMapping
    public void createMusica(@RequestBody Musica musica) {
        musicaService.createMusica(musica);
    }

    // NEW: Get all artists for selection dropdown
    @GetMapping("/artistas/select")
    public ResponseEntity<List<Artista>> getArtistasForSelection() {
        List<Artista> artistas = musicaService.getAvailableArtistas();
        return ResponseEntity.ok(artistas);
    }

    // NEW: Associate an existing music with an artist
    @PostMapping("/{musicaId}/artistas/{artistaId}")
    public ResponseEntity<String> associarMusicaComArtista(
            @PathVariable int musicaId,
            @PathVariable int artistaId) {
        try {
            musicaService.associarMusicaComArtista(musicaId, artistaId);
            return ResponseEntity.ok("Music associated with artist successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // NEW: Remove association between music and artist
    @DeleteMapping("/{musicaId}/artistas/{artistaId}")
    public ResponseEntity<String> removerAssociacaoMusicaArtista(
            @PathVariable int musicaId,
            @PathVariable int artistaId) {
        try {
            musicaService.removerAssociacaoMusicaArtista(musicaId, artistaId);
            return ResponseEntity.ok("Association removed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteMusica(@PathVariable int id) {
        musicaService.deleteMusica(id);
    }

    @PutMapping("/{id}")
    public void updateMusica(@PathVariable int id, @RequestBody Musica musica) {
        musica.setId(id);
        musicaService.updateMusica(musica);
    }
    @GetMapping("/estatisticas/musicas-por-album")
    public List<MusicasPorAlbumDTO> getMusicasPorAlbum() {
        return musicaService.getMusicasPorAlbum();
    }
    // Associar música a um álbum
}