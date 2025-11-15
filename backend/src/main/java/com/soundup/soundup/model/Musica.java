package com.soundup.soundup.model;

import java.util.List;
import java.util.ArrayList;

public class Musica {
    private int id;
    private String nome;
    private int duracao;
    private List<Artista> artistas;
    private Integer id_album;

    // Default constructor
    public Musica() {
        this.artistas = new ArrayList<>();
    }

    public Musica(int id, String nome, int duracao) {
        this.id = id;
        this.nome = nome;
        this.duracao = duracao;
        this.artistas = new ArrayList<>();
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

    public void setDuracao(int duracao){
        this.duracao = duracao;
    }

    public Integer getId_album() {
        return id_album;
    }
    public void setId_album(Integer id_album) {
        this.id_album = id_album;
    }

    // Methods to manage artist relationship
    public List<Artista> getArtistas() {
        return artistas;
    }

    public void setArtistas(List<Artista> artistas) {
        this.artistas = artistas != null ? artistas : new ArrayList<>();
    }

    public void adicionarArtista(Artista artista) {
        if (this.artistas == null) {
            this.artistas = new ArrayList<>();
        }
        if (!this.artistas.contains(artista)) {
            this.artistas.add(artista);
        }
    }

    public void removerArtista(Artista artista) {
        if (this.artistas != null) {
            this.artistas.remove(artista);
        }
    }
}