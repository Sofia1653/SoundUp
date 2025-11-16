package com.soundup.soundup.controller;

import com.soundup.soundup.model.Ouvinte;
import com.soundup.soundup.service.OuvinteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ouvinte")
public class OuvinteController {
    private final OuvinteService ouvinteService;
    public OuvinteController(OuvinteService ouvinteService) {
        this.ouvinteService = ouvinteService;
    }

    @PostMapping
    public ResponseEntity<Ouvinte> createOuvinte(@RequestBody Ouvinte ouvinte) {
        Ouvinte saved = ouvinteService.save(ouvinte);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Ouvinte>> getAll() {
        return ResponseEntity.ok(ouvinteService.findAll());
    }

}
