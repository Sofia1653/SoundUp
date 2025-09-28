package com.soundup.soundup.controller;

import com.soundup.soundup.model.Musica;
import com.soundup.soundup.model.Usuario;
import com.soundup.soundup.service.MusicaService;
import com.soundup.soundup.service.UsuarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/musicas")
public class MusicaController {
    private final MusicaService MusicaService;
    public MusicaController(MusicaService MusicaService) {
        this.MusicaService = MusicaService;
    }

    @GetMapping
    public List<Musica> getMusicas() {
        return MusicaService.getAllMusicas();
    }

    @GetMapping("/{id}")
    public Musica getMusica(@PathVariable int id) {
        return MusicaService.getMusicaById(id);
    }

    @PostMapping
    public void createMusica(@RequestBody Musica musica) {
        MusicaService.createMusica(musica);
    }

    @DeleteMapping("/{id}")
    public void deleteMusica(@PathVariable int id) {
        MusicaService.deleteMusica(id);
    }

    @PutMapping("/{id}")
    public void updateMusica(@PathVariable int id, @RequestBody Musica musica) {
        musica.setId(id);
        MusicaService.updateMusica(musica);
    }
}