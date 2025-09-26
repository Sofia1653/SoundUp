package com.soundup.soundup.model;

public class Usuario {
    private int id;
    private String nome;
    private String pais;
    private String estado;
    private String cidade;
    private String email;
    private String senha;
    private int quantSeguidores;
    private String telefone;

    public Usuario(int id, String nome, String pais, String estado, String cidade, String email, String senha, int quantSeguidores, String telefone){
        this.id = id;
        this.nome = nome;
        this.pais = pais;
        this.estado = estado;
        this.cidade = cidade;
        this.email = email;
        this.senha = senha;
        this.quantSeguidores = quantSeguidores;
        this.telefone = telefone;
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
    public String getPais(){
        return pais;
    }
    public void setPais(String pais){
        this.pais = pais;
    }
    public String getEstado(){
        return estado;
    }
    public void setEstado(){
        this.estado = estado;
    }
    public String getCidade(){
        return cidade;
    }
    public void setCidade(String cidade){
        this.cidade = cidade;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getSenha(){
        return senha;
    }
    public void setSenha(String senha){
        this.senha= senha;
    }
    public int getQuantSeguidores(){
        return quantSeguidores;
    }
    public void setQuantSeguidores(int quantSeguidores){
        this.quantSeguidores = quantSeguidores;
    }
    public String getTelefone(){
        return telefone;
    }
    public void setTelefone(String telefone){
        this.telefone = telefone;
    }
}
