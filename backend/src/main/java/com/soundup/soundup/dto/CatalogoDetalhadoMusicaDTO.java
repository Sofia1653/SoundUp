package com.soundup.soundup.dto;

import lombok.Getter;

@Getter
public class CatalogoDetalhadoMusicaDTO {

    private int idMusica;
    private String nomeMusica;
    private int duracaoSegundos;

    private Integer idArtista;
    private String nomeArtista;

    private Integer idAlbum;
    private String nomeAlbum;

    private Integer idGenero;
    private String nomeGenero;

    public CatalogoDetalhadoMusicaDTO(int idMusica, String nomeMusica, int duracaoSegundos,
                                      Integer idArtista, String nomeArtista,
                                      Integer idAlbum, String nomeAlbum,
                                      Integer idGenero, String nomeGenero) {
        this.idMusica = idMusica;
        this.nomeMusica = nomeMusica;
        this.duracaoSegundos = duracaoSegundos;
        this.idArtista = idArtista;
        this.nomeArtista = nomeArtista;
        this.idAlbum = idAlbum;
        this.nomeAlbum = nomeAlbum;
        this.idGenero = idGenero;
        this.nomeGenero = nomeGenero;
    }

}
