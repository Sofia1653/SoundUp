package com.soundup.soundup.controller;

import com.soundup.soundup.model.Artista;
import com.soundup.soundup.service.ArtistaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
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

    // POST create
    @PostMapping
    public void addArtista(@RequestBody Artista artista) {
        artistaService.createArtista(artista);
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
}
