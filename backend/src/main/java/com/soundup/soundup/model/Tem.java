package com.soundup.soundup.model;

public class Tem {
    private int id_musica;
    private int id_genero;

    public Tem(int id_musica, int id_genero) {
        this.id_musica = id_musica;
        this.id_genero = id_genero;
    }
    public int getId_musica() {
        return id_musica;
    }
    public void setId_musica(int id_musica) {
        this.id_musica = id_musica;
    }
    public int getId_genero() {
        return id_genero;
    }
    public void setId_genero(int id_genero) {
        this.id_genero = id_genero;
    }
}
