package com.soundup.soundup.service;

import com.soundup.soundup.model.Artista;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.repository.ArtistaRepository;
import com.soundup.soundup.repository.LancaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistaService {

    private final ArtistaRepository artistaRepository;
    private final LancaRepository lancaRepository;

    public ArtistaService(ArtistaRepository artistaRepository, LancaRepository lancaRepository) {
        this.artistaRepository = artistaRepository;
        this.lancaRepository = lancaRepository;
    }

    public Artista save(Artista artista) {
        int idGerado = artistaRepository.save(artista);
        artista.setId_artista(idGerado); // atualiza objeto
        artista.setId(idGerado); // se id do Usuario = id_artista
        return artistaRepository.findById(idGerado);
    }

    // GET all
    public List<Artista> getAllArtistas() {
        List<Artista> artistas = artistaRepository.findAll();

        for (Artista artista : artistas) {
            List<Musica> musicas = lancaRepository.findMusicasByArtista(artista.getId_artista());
            artista.setMusicasLancadas(musicas);
        }

        return artistas;
    }

    // GET by ID
    public Artista getArtistaById(int id) {
        Artista artista = artistaRepository.findById(id);

        if (artista != null) {
            // pegar músicas lançadas
            List<Musica> musicas = lancaRepository.findMusicasByArtista(artista.getId_artista());
            artista.setMusicasLancadas(musicas);
        }

        return artista;
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

    public int countMusicasLancadas(int idArtista) {
        return artistaRepository.countMusicasLancadas(idArtista);
    }
}
