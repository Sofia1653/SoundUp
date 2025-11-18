package com.soundup.soundup.model;

import java.util.ArrayList;
import java.util.List;

public class Playlist {

    private int id;
    private long idOuvinte;
    private String visibilidade;
    private String nome;

    //private List<Integer> musicasIds;
    private List<Musica> musicas;

    public Playlist() {
        this.musicas = new ArrayList<>();
    }

    public Playlist(int id, long idOuvinte, String visibilidade, String nome) {
        this.id = id;
        this.idOuvinte = idOuvinte;
        this.visibilidade = visibilidade;
        this.nome = nome;
        //this.musicasIds = musicasIds;
        this.musicas = new ArrayList<>();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public long getIdOuvinte() { return idOuvinte; }
    public void setIdOuvinte(long idOuvinte) { this.idOuvinte = idOuvinte; }

    public String getVisibilidade() { return visibilidade; }
    public void setVisibilidade(String visibilidade) { this.visibilidade = visibilidade; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    //public List<Integer> getMusicasIds() { return musicasIds; }
    //public void setMusicasIds(List<Integer> musicasIds) { this.musicasIds = musicasIds; }

    public List<Musica> getMusicas() { return musicas; }
    public void setMusicas(List<Musica> musicas) { this.musicas = musicas; }
}
