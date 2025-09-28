package com.soundup.soundup.model;

public class Versao {
    private int id_versao;
    private int versao;

    public Versao(int id_versao, int versao){
        this.id_versao = id_versao;
        this.versao = versao;
    }
    public int getIdVersao(){
        return id_versao;
    }
    public void setIdVersao(int id_versao){
        this.id_versao = id_versao;
    }
    public int versao(){
        return id_versao;
    }
    public void setVersao(int versao){
        this.versao = versao;
    }
}
