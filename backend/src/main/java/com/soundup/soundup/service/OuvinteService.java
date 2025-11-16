package com.soundup.soundup.service;

import com.soundup.soundup.model.Ouvinte;
import com.soundup.soundup.model.Playlist;
import com.soundup.soundup.repository.OuvinteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OuvinteService {

    private final OuvinteRepository ouvinteRepository;

    public OuvinteService(OuvinteRepository ouvinteRepository) {
        this.ouvinteRepository = ouvinteRepository;
    }

    public Ouvinte getOuvinteById(Long id) {
        return ouvinteRepository.findById(id);
    }

    public Ouvinte save(Ouvinte ouvinte) {
        ouvinteRepository.save(ouvinte);
        return ouvinte;
    }

    public List<Ouvinte> findAll() {
        List<Ouvinte> ouvintes = ouvinteRepository.findAll();
        return ouvintes;
    }
}

