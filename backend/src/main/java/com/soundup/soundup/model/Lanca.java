package com.soundup.soundup.model;

public class Lanca {
    private int id_artista;
    private int id_musica;

    public Lanca(int id_artista, int id_musica){
        this.id_artista = id_artista;
        this.id_musica = id_musica;
    }

    public int getId_artista(){
        return id_artista;
    }

    public void setId_artista(int id_artista){
        this.id_artista = id_artista;
    }

    public int getId_musica(){
        return id_musica;
    }

    public void setId_musica(int id_musica){
        this.id_musica = id_musica;
    }
}
