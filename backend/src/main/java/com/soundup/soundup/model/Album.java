package com.soundup.soundup.model;

public class Album {
    private int id;
    private String nome;
    private int duracao;

    public Album(int id, String nome, int duracao){
        this.id = id;
        this.nome = nome;
        this.duracao = duracao;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
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
}
