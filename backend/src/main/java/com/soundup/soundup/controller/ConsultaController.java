package com.soundup.soundup.controller;

import com.soundup.soundup.service.ConsultaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping("/musicas")
    public ResponseEntity<List<Map<String, Object>>> musicasPorDuracaoEPais(
            @RequestParam int duracao,
            @RequestParam String pais) {
        return ResponseEntity.ok(consultaService.musicasPorDuracaoEPais(duracao, pais));
    }

    @GetMapping("/ranking-artistas")
    public ResponseEntity<List<Map<String, Object>>> rankingArtistas() {
        return ResponseEntity.ok(consultaService.rankingArtistas());
    }

    @GetMapping("/musicas-por-estado")
    public ResponseEntity<List<Map<String, Object>>> contagemMusicasPorEstado(
            @RequestParam String estado) {
        return ResponseEntity.ok(consultaService.contagemMusicasPorEstado(estado));
    }

    @GetMapping("/ranking-paises")
    public ResponseEntity<List<Map<String, Object>>> rankingPaises() {
        return ResponseEntity.ok(consultaService.rankingPaises());
    }
}
