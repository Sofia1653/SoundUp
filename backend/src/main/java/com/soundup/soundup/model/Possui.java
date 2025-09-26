package com.soundup.soundup.model;

public class Possui {
    private int id_musica;
    private int id_playlist;

    public Possui(int id_musica, int id_playlist){
        this.id_musica = id_musica;
        this.id_playlist = id_playlist;
    }

    public int getId_musica(){
        return id_musica;
    }
    public void setId_musica(int id_musica){
        this.id_musica = id_musica;
    }
    public int getId_playlist(){
        return id_playlist;
    }
    public void setId_playlist(int id_playlist){
        this.id_playlist = id_playlist;
    }
}
