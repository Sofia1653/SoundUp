package com.soundup.soundup.model;

public class Segue {
    private int id_seguidor;
    private int id_seguido;

    public Segue(int id_seguidor, int id_seguido){
        this.id_seguidor = id_seguidor;
        this.id_seguido = id_seguido;
    }

    public int getId_seguidor(){
        return id_seguidor;
    }

    public void setId_seguidor(int id_seguidor){
        this.id_seguidor = id_seguidor;
    }

    public int getId_seguido(){
        return id_seguido;
    }

    public void setId_seguido(int id_seguido){
        this.id_seguido = id_seguido;
    }
}
