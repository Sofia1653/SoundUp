package com.soundup.soundup.service;

import com.soundup.soundup.model.Album;
import com.soundup.soundup.model.Musica;
import com.soundup.soundup.repository.AlbumRepository;
import com.soundup.soundup.repository.MusicaRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final MusicaRepository musicaRepository;

    public AlbumService(AlbumRepository albumRepository, MusicaRepository musicaRepository) {
        this.albumRepository = albumRepository;
        this.musicaRepository = musicaRepository;
    }

    public Album createAlbum(Album album) {
        // 1. Salva o Álbum e obtém o ID gerado
        albumRepository.save(album);

        // 2. Se o Álbum tiver músicas na requisição, associa elas ao novo ID do álbum
        if (album.getMusicas() != null && !album.getMusicas().isEmpty()) {
            for (Musica musica : album.getMusicas()) {
                // Para cada música, seta o ID do álbum recém-criado
                musica.setId_album(album.getId());
                // E atualiza a música no banco de dados (que já deve existir)
                musicaRepository.updateAlbumId(musica.getId(), album.getId()); // NEW METHOD NEEDED
            }
        }
        return album;
    }

    public List<Album> getAllAlbuns() {
        return albumRepository.findAll();
    }

    public Album getAlbumById(int id) {
        Album album = albumRepository.findById(id);
        List<Musica> musicas = musicaRepository.findByAlbumId(id);
        album.setMusicas(musicas);
        return album;
    }

    public void updateAlbum(Album album) {
        // 1. Atualiza as informações do Álbum
        albumRepository.update(album);

        // 2. Lógica de atualização de músicas:
        //    A. Zera o id_album de todas as músicas que pertenciam a este álbum (Desvincula)
        musicaRepository.clearAlbumIdForAlbum(album.getId()); // NEW METHOD NEEDED

        //    B. Seta o novo id_album para as músicas enviadas na lista
        if (album.getMusicas() != null && !album.getMusicas().isEmpty()) {
            for (Musica musica : album.getMusicas()) {
                // Garante que o ID da música está setado e atualiza no banco
                if (musica.getId() > 0) {
                    musicaRepository.updateAlbumId(musica.getId(), album.getId()); // NEW METHOD NEEDED
                }
                // Se a música não tem ID, ela deveria ter sido criada separadamente ou
                // esta lógica de update precisaria ser mais robusta (ex: criar a música se não existir).
                // Assumindo que a música já existe, usamos o updateAlbumId.
            }
        }
    }

    public void deleteAlbum(int id) {
        albumRepository.delete(id);
    }
}
