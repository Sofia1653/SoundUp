package com.soundup.soundup.model;

public class Versao {
    private int idVersao;
    private int versao;

    public Versao(int idVersao, int versao){
        this.idVersao = idVersao;
        this.versao = versao;
    }
    public int getIdVersao(){
        return idVersao;
    }
    public void setIdVersao(int idVersao){
        this.idVersao = idVersao;
    }
    public int versao(){
        return idVersao;
    }
    public void setVersao(int versao){
        this.versao = versao;
    }
}
