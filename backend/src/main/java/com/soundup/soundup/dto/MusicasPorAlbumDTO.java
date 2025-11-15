package com.soundup.soundup.dto;

public class MusicasPorAlbumDTO {
    private String album;
    private int quantidade;

    public MusicasPorAlbumDTO(String album, int quantidade) {
        this.album = album;
        this.quantidade = quantidade;
    }

    public String getAlbum() {
        return album;
    }

    public int getQuantidade() {
        return quantidade;
    }
}