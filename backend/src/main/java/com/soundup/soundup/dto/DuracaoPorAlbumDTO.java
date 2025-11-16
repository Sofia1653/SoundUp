package com.soundup.soundup.dto;

public class DuracaoPorAlbumDTO {

    private int albumId;
    private String albumNome;
    private int duracaoTotalSegundos;

    public DuracaoPorAlbumDTO(int albumId, String albumNome, int duracaoTotalSegundos) {
        this.albumId = albumId;
        this.albumNome = albumNome;
        this.duracaoTotalSegundos = duracaoTotalSegundos;
    }

    public int getAlbumId() {
        return albumId;
    }

    public String getAlbumNome() {
        return albumNome;
    }

    public int getDuracaoTotalSegundos() {
        return duracaoTotalSegundos;
    }
}
