package com.soundup.soundup.model;

public class Musica {
    private int id;
    private int idVersao;
    private String nome;
    private int duracao;

    public Musica(int id, int idVersao, String nome, int duracao){
        this.id = id;
        this.idVersao = idVersao;
        this.nome = nome;
        this.duracao = duracao;
    }

    public int getId(){
        return id;
    }
    public void setId(){
        this.id = id;
    }
    public int getIdVersao(){
        return idVersao;
    }
    public void setIdVersao(int idVersao){
        this.idVersao = idVersao;
    }
    public String getNome(){
        return nome;
    }
    public void setNome(){
        this.nome = nome;
    }
    public int getDuracao(){
        return duracao;
    }
    public void setDuracao(int duracao){
        this.duracao = duracao;
    }
}
