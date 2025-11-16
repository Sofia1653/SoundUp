package com.soundup.soundup.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Playlist {
    private int id;
    private long idOuvinte;
    private String visibilidade;
    private String nome;

    private Ouvinte ouvinte;

    public Playlist(int id, long idOuvinte, String visibilidade, String nome){
        this.id = id;
        this.idOuvinte = idOuvinte;
        this.visibilidade = visibilidade;
        this.nome = nome;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public long getIdOuvinte(){
        return idOuvinte;
    }
    public void setIdOuvinte(int id_ouvinte){
        this.idOuvinte = id_ouvinte;
    }
    public String getVisibilidade(){
        return visibilidade;
    }
    public void setVisibilidade(String visibilidade){
        this.visibilidade = visibilidade;
    }
    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }
}
