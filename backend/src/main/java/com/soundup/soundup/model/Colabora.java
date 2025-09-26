package com.soundup.soundup.model;

public class Colabora {
    private int id_artistaPrincipal;
    private int id_artistaConvidado;

    public Colabora(int id_artistaPrincipal, int id_artistaConvidado){
        this.id_artistaPrincipal = id_artistaPrincipal;
        this.id_artistaConvidado = id_artistaConvidado;
    }

    public int getId_artistaPrincipal() {
        return id_artistaPrincipal;
    }
    public void setId_artistaPrincipal(int id_artistaPrincipal){
        this.id_artistaPrincipal = id_artistaPrincipal;
    }
    public int getId_artistaConvidado() {
        return id_artistaConvidado;
    }
    public void setId_artistaConvidado(int id_artistaConvidado){
        this.id_artistaConvidado = id_artistaConvidado;
    }
}
