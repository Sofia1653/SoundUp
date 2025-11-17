package com.soundup.soundup.dto;

public class CorrelacaoDuracaoSeguidoresDTO {
    private String nomeArtista;
    private int quantSeguidores;
    private double duracaoMedia; // Variável dependente (eixo X)

    public CorrelacaoDuracaoSeguidoresDTO(String nomeArtista, int quantSeguidores, double duracaoMedia) {
        this.nomeArtista = nomeArtista;
        this.quantSeguidores = quantSeguidores;
        this.duracaoMedia = duracaoMedia;
    }

    // Getters
    public String getNomeArtista() { return nomeArtista; }
    public int getQuantSeguidores() { return quantSeguidores; }
    public double getDuracaoMedia() { return duracaoMedia; }

    // Setters (Opcionais)
    public void setNomeArtista(String nomeArtista) { this.nomeArtista = nomeArtista; }
    public void setQuantSeguidores(int quantSeguidores) { this.quantSeguidores = quantSeguidores; }
    public void setDuracaoMedia(double duracaoMedia) { this.duracaoMedia = duracaoMedia; }
}