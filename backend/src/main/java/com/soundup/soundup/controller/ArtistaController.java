package com.soundup.soundup.controller;

import com.soundup.soundup.dto.ComparativoArtistaDTO;
import com.soundup.soundup.dto.CorrelacaoDuracaoSeguidoresDTO;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.service.ArtistaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }

    @PostMapping
    public ResponseEntity<Artista> createArtista(@RequestBody Artista artista) {
        Artista saved = artistaService.save(artista);
        return ResponseEntity.ok(saved);
    }

    // GET all
    @GetMapping
    public List<Artista> getArtistas() {
        return artistaService.getAllArtistas();
    }

    // GET by ID
    @GetMapping("/{id}")
    public Artista getArtista(@PathVariable int id) {
        return artistaService.getArtistaById(id);
    }

    // PUT update
    @PutMapping("/{id}")
    public void updateArtista(@PathVariable int id, @RequestBody Artista artista) {
        artista.setId(id); // garante que o ID seja o correto
        artistaService.updateArtista(artista);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteArtista(@PathVariable int id) {
        artistaService.deleteArtista(id);
    }

    @GetMapping("/estatisticas/comparativo")
    public List<ComparativoArtistaDTO> getComparativoArtistas() {
        return artistaService.getMetricasComparativas();
    }
    @GetMapping("/estatisticas/correlacao-duracao-seguidores")
    public List<CorrelacaoDuracaoSeguidoresDTO> getCorrelacaoDuracaoSeguidores() {
        return artistaService.getCorrelacaoDuracaoSeguidores();
    }
}
