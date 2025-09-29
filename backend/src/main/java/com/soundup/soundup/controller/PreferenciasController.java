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
        List<Preferencias> preferencias = preferenciasService.getAllPreferencias();

        Map<String, Long> plataformas = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getPlataforma, Collectors.counting()));

        Map<String, Long> todosDias = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getTodos_dias, Collectors.counting()));

        // Novos agrupamentos para os gráficos de "media_horas" e "humor"
        Map<String, Long> mediaHoras = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getMedia_horas, Collectors.counting()));

        Map<String, Long> humor = preferencias.stream()
                .collect(Collectors.groupingBy(Preferencias::getHumor, Collectors.counting()));

        return Map.of(
                "plataformas", plataformas,
                "todos_dias", todosDias,
                "media_horas", mediaHoras,
                "humor", humor
        );
    }

    @GetMapping("/todos")
    public List<Preferencias> getAllPreferencias() {
        return preferenciasService.getAllPreferencias();
    }
}