package com.soundup.soundup.dto;

public class ArtistaColaboracaoDTO {
    private String nomeArtista;
    private String papel;
    private int totalColaboracoes;

    public ArtistaColaboracaoDTO(String nomeArtista, String papel, int totalColaboracoes) {
        this.nomeArtista = nomeArtista;
        this.papel = papel;
        this.totalColaboracoes = totalColaboracoes;
    }

    public String getNomeArtista() {
        return nomeArtista;
    }

    public String getPapel() {
        return papel;
    }

    public int getTotalColaboracoes() {
        return totalColaboracoes;
    }
}
