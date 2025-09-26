package com.soundup.soundup.model;

import java.time.LocalDateTime;

public class Reproducao {
    private int id_historico;   
    private int id_ouvinte;   
    private int id_musica;      
    private LocalDateTime data_hora;

    public Reproducao(int id_historico, int id_ouvinte, int id_musica, LocalDateTime data_hora) {
        this.id_historico = id_historico;
        this.id_ouvinte = id_ouvinte;
        this.id_musica = id_musica;
        this.data_hora = data_hora;
    }

    public int getId_historico() {
        return id_historico;
    }

    public void setId_historico(int id_historico) {
        this.id_historico = id_historico;
    }

    public int getId_ouvinte() {
        return id_ouvinte;
    }

    public void setId_ouvinte(int id_ouvinte) {
        this.id_ouvinte = id_ouvinte;
    }

    public int getId_musica() {
        return id_musica;
    }

    public void setId_musica(int id_musica) {
        this.id_musica = id_musica;
    }

    public LocalDateTime getData_hora() {
        return data_hora;
    }

    public void setData_hora(LocalDateTime data_hora) {
        this.data_hora = data_hora;
    }
}
