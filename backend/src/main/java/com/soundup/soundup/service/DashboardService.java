package com.soundup.soundup.service;

import com.soundup.soundup.dto.DashboardStatsDTO;
import com.soundup.soundup.model.Artista;
import com.soundup.soundup.repository.AlbumRepository;
import com.soundup.soundup.repository.ArtistaRepository;
import com.soundup.soundup.repository.MusicaRepository;
import com.soundup.soundup.repository.PlaylistRepository;
import com.soundup.soundup.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MusicaRepository musicaRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private ArtistaRepository artistaRepository;

    public DashboardStatsDTO getDashboardStats() {
        long totalUsuarios = usuarioRepository.count();
        long totalMusicas = musicaRepository.count();
        long totalAlbuns = albumRepository.count();

        String nomeTopArtista = "N/A";
        int ouvintesTopArtista = 0;

        Artista topArtista = artistaRepository.findTopByOrderByQuantOuvintesDesc();

        if (topArtista != null) {
            nomeTopArtista = topArtista.getNome();
            ouvintesTopArtista = topArtista.getQuant_ouvintes();
        }

        long playlistsPublicas = playlistRepository.countByVisibilidade("publica");
        long totalPlaylists = playlistRepository.count();
        double pctPublicas = (totalPlaylists > 0) ?
                ((double) playlistsPublicas * 100.0 / totalPlaylists) : 0.0;

        double mediaOuvintes = artistaRepository.avgOuvintes();
        double mediaDuracao = musicaRepository.avgDuracao();
        double mediaMusicasPlaylist = playlistRepository.avgMusicasPorPlaylist(); // NOVO

        return new DashboardStatsDTO(
                totalUsuarios,
                totalMusicas,
                totalAlbuns,
                nomeTopArtista,
                ouvintesTopArtista,
                pctPublicas,
                mediaOuvintes,
                mediaDuracao,
                mediaMusicasPlaylist // NOVO
        );
    }
}