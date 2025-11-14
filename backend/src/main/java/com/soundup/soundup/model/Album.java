package com.soundup.soundup.model;

import java.util.List;
import java.util.ArrayList;


public class Album {
    private int id_album;
    private String nome;
    private int duracao;
    private List<Musica> musicas;
    private int ano;

    public Album() {
        this.musicas = new ArrayList<>();
    }

    public Album(int id_album, String nome, int duracao, int ano){
        this.id_album = id_album;
        this.nome = nome;
        this.duracao = duracao;
        this.musicas = new ArrayList<>();
        this.ano = ano;
    }

    public int getId(){
        return id_album;
    }

    public void setId(int id){
        this.id_album = id_album;
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public int getDuracao(){
        return duracao;
    }

    public void setDuracao(int duracaco){
        this.duracao = duracaco;
    }
    public List<Musica> getMusicas(){
        return musicas;
    }
    public void setMusicas(List<Musica> musicas){
        this.musicas = musicas;
    }
    public int getAno(){
        return ano;
    }
    public void setAno(int ano){
        this.ano = ano;
    }
}
