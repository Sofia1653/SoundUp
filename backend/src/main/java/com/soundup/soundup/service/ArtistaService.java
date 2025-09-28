package com.soundup.soundup.service;

import com.soundup.soundup.model.Artista;
import com.soundup.soundup.repository.ArtistaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistaService {

    private final ArtistaRepository artistaRepository;

    public ArtistaService(ArtistaRepository artistaRepository) {
        this.artistaRepository = artistaRepository;
    }

    public Artista save(Artista artista) {
        int idGerado = artistaRepository.save(artista);
        artista.setId_artista(idGerado); // atualiza objeto
        artista.setId(idGerado); // se id do Usuario = id_artista
        return artistaRepository.findById(idGerado);
    }


    // GET all
    public List<Artista> getAllArtistas() {
        return artistaRepository.findAll();
    }

    // GET by ID
    public Artista getArtistaById(int id) {
        return artistaRepository.findById(id);
    }

    // POST create
    public void createArtista(Artista artista) {
        artistaRepository.save(artista);
    }

    // PUT update
    public void updateArtista(Artista artista) {
        artistaRepository.update(artista);
    }

    // DELETE
    public void deleteArtista(int id) {
        artistaRepository.delete(id);
    }
}
