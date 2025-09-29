package com.soundup.soundup.controller;

import com.soundup.soundup.model.Preferencias;
import com.soundup.soundup.service.PreferenciasService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/preferencias")
@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do seu front-end
public class PreferenciasController {

    private final PreferenciasService preferenciasService;

    @Autowired
    public PreferenciasController(PreferenciasService preferenciasService) {
        this.preferenciasService = preferenciasService;
    }

    @PostMapping
    public void createPreferencia(@RequestBody Preferencias preferencia) {
        preferenciasService.createPreferencia(preferencia);
    }

    @GetMapping("/dados-grafico")
    public Map<String, Map<String, Long>> getDadosGrafico() {
        // ... (código que você já tem)
        List<Preferencias> preferencias = preferenciasService.getAllPreferencias();

        Map<String, Long> plataformas = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getPlataforma, Collectors.counting()));
        Map<String, Long> todosDias = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getTodos_dias, Collectors.counting()));

        return Map.of(
                "plataformas", plataformas,
                "todos_dias", todosDias
        );
    }

    @GetMapping("/todos")
    public List<Preferencias> getAllPreferencias() {
        return preferenciasService.getAllPreferencias();
    }
}