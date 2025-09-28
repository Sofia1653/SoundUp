package com.soundup.soundup.service;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.repository.MusicaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MusicaService {
    private final MusicaRepository musicaRepository;
    public MusicaService(MusicaRepository musicaRepository){
        this.musicaRepository = musicaRepository;
    }
    public List<Musica> getAllMusicas() {
        return musicaRepository.findAll();
    }
    public Musica getMusicaById(int id) {
        return musicaRepository.findById(id);
    }
    public void createMusica(Musica musica) {
        musicaRepository.save(musica);
    }
    public void updateMusica(Musica musica) {
        musicaRepository.update(musica);
    }
    public void deleteMusica(int id) {
        musicaRepository.delete(id);
    }
}
