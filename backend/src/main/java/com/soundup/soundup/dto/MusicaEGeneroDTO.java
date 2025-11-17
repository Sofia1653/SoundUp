package com.soundup.soundup.dto;

public class MusicaEGeneroDTO {
    private String musica;
    private String genero;

    public MusicaEGeneroDTO(String musica, String genero) {
        this.musica = musica;
        this.genero = genero;
    }

    public String getMusica() {
        return musica;
    }

    public String getGenero() {
        return genero;
    }
}
