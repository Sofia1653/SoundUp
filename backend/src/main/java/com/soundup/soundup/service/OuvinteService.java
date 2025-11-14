package com.soundup.soundup.service;

import com.soundup.soundup.model.Ouvinte;
import com.soundup.soundup.repository.OuvinteRepository;
import org.springframework.stereotype.Service;

@Service
public class OuvinteService {

    private final OuvinteRepository ouvinteRepository;

    public OuvinteService(OuvinteRepository ouvinteRepository) {
        this.ouvinteRepository = ouvinteRepository;
    }

    public Ouvinte getOuvinteById(Long id) {
        return ouvinteRepository.findById(id);
    }
}

