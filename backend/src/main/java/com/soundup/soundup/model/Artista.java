package com.soundup.soundup.model;

import java.util.List;
import java.util.ArrayList;

public class Artista extends Usuario{
    private int id_artista;
    private int quant_ouvintes = 0;
    private List<Musica> musicasLancadas;

    public Artista() {
        super();
        this.musicasLancadas = new ArrayList<>();
    }

    public Artista (int id, String nome, String pais, String estado, String cidade, String email, String senha,
                    int quantSeguidores, String telefone, int id_artista, int quant_ouvintes) {
        super(id, nome, pais, estado, cidade, email, senha, quantSeguidores, telefone);
        this.id_artista = id_artista;
        this.quant_ouvintes = quant_ouvintes;
        this.musicasLancadas = new ArrayList<>();
    }

    public int getId_artista() {
        return id_artista;
    }

    public void setId_artista(int id_artista) {
        this.id_artista = id_artista;
    }

    public int getQuant_ouvintes() {
        return quant_ouvintes;
    }

    public void setQuant_ouvintes(int quant_ouvintes) {
        this.quant_ouvintes = quant_ouvintes;
    }

    // Methods to manage music relationship
    public List<Musica> getMusicasLancadas() {
        return musicasLancadas;
    }

    public void setMusicasLancadas(List<Musica> musicasLancadas) {
        this.musicasLancadas = musicasLancadas != null ? musicasLancadas : new ArrayList<>();
    }

    public void adicionarMusica(Musica musica) {
        if (this.musicasLancadas == null) {
            this.musicasLancadas = new ArrayList<>();
        }
        if (!this.musicasLancadas.contains(musica)) {
            this.musicasLancadas.add(musica);
        }
    }

    public void removerMusica(Musica musica) {
        if (this.musicasLancadas != null) {
            this.musicasLancadas.remove(musica);
        }
    }
}