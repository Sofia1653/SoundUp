package com.soundup.soundup.model;

public class Curte {
    private int id_ouvinte;
    private int id_playlist;

    public Curte(int id_ouvinte, int id_playlist){
        this.id_ouvinte = id_ouvinte;
        this.id_playlist = id_playlist;
    }

    public int getId_ouvinte(){
        return id_ouvinte;
    }

    public void setId_ouvinte(int id_ouvinte){
        this.id_ouvinte = id_ouvinte;
    }

    public int getId_playlist(){
        return id_playlist;
    }

    public void setId_playlist(int id_playlist){
        this.id_playlist = id_playlist;
    }
}
