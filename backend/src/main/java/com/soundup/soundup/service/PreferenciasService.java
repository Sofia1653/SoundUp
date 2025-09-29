package com.soundup.soundup.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.soundup.soundup.model.Preferencias;
import com.soundup.soundup.repository.PreferenciasRepository;
import java.util.List;

@Service
public class PreferenciasService {

    private final PreferenciasRepository preferenciasRepository;

    @Autowired
    public PreferenciasService(PreferenciasRepository preferenciasRepository) {
        this.preferenciasRepository = preferenciasRepository;
    }

    public void createPreferencia(Preferencias preferencia) {
        preferenciasRepository.save(preferencia);
    }

    public List<Preferencias> getAllPreferencias() {
        return preferenciasRepository.findAll();
    }
}