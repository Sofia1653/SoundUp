package com.soundup.soundup.model;

public class Playlist {
    private int id;
    private int id_ouvinte;
    private String visibilidade;
    private String nome;

    public Playlist(int id, int id_ouvinte, String visibilidade, String nome){
        this.id = id;
        this.id_ouvinte = id_ouvinte;
        this.visibilidade = visibilidade;
        this.nome = nome;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public int getId_ouvinte(){
        return id_ouvinte;
    }
    public void setId_ouvinte(int id_ouvinte){
        this.id_ouvinte = id_ouvinte;
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
