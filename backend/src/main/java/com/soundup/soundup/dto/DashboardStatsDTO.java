package com.soundup.soundup.dto;

public class DashboardStatsDTO {

    private long totalUsuarios;
    private long totalMusicas;
    private long totalAlbuns;
    private String topArtista;
    private int topArtistaOuvintes;
    private double pctPlaylistsPublicas;
    private double mediaOuvintesArtista;
    private double mediaDuracaoMusica;
    private double mediaMusicasPorPlaylist;

    public DashboardStatsDTO(long totalUsuarios, long totalMusicas, long totalAlbuns,
                             String topArtista, int topArtistaOuvintes,
                             double pctPlaylistsPublicas, double mediaOuvintesArtista,
                             double mediaDuracaoMusica, double mediaMusicasPorPlaylist) {
        this.totalUsuarios = totalUsuarios;
        this.totalMusicas = totalMusicas;
        this.totalAlbuns = totalAlbuns;
        this.topArtista = topArtista;
        this.topArtistaOuvintes = topArtistaOuvintes;
        this.pctPlaylistsPublicas = pctPlaylistsPublicas;
        this.mediaOuvintesArtista = mediaOuvintesArtista;
        this.mediaDuracaoMusica = mediaDuracaoMusica;
        this.mediaMusicasPorPlaylist = mediaMusicasPorPlaylist; // NOVO
    }

    // Getters
    public long getTotalUsuarios() { return totalUsuarios; }
    public long getTotalMusicas() { return totalMusicas; }
    public long getTotalAlbuns() { return totalAlbuns; }
    public String getTopArtista() { return topArtista; }
    public int getTopArtistaOuvintes() { return topArtistaOuvintes; }
    public double getPctPlaylistsPublicas() { return pctPlaylistsPublicas; }
    public double getMediaOuvintesArtista() { return mediaOuvintesArtista; }
    public double getMediaDuracaoMusica() { return mediaDuracaoMusica; }
    public double getMediaMusicasPorPlaylist() { return mediaMusicasPorPlaylist; }
}