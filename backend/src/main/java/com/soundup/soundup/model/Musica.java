package com.soundup.soundup.model;

public class Musica {
    private int id;
    private int id_versao;
    private String nome;
    private int duracao;

    public Musica(int id, int id_versao, String nome, int duracao){
        this.id = id;
        this.id_versao = id_versao;
        this.nome = nome;
        this.duracao = duracao;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public int getIdVersao(){
        return id_versao;
    }
    public void setIdVersao(int id_versao){
        this.id_versao = id_versao;
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
