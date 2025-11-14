package com.soundup.soundup.model;

import java.util.List;
import java.util.ArrayList;

public class Musica {
    private int id;
    private String nome;
    private int duracao;
    private List<Artista> artistas;
    private Integer albumId;

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

    public Integer getAlbumId() {
        return albumId;
    }
    public void setAlbumId(Integer albumId) {
        this.albumId = albumId;
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