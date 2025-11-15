package com.soundup.soundup.dto;

public class ComparativoArtistaDTO {
    private String nomeArtista;
    private int quantOuvintes;
    private int totalMusicas;
    private double duracaoMediaMusicas; // Em segundos

    public ComparativoArtistaDTO(String nomeArtista, int quantOuvintes, int totalMusicas, double duracaoMediaMusicas) {
        this.nomeArtista = nomeArtista;
        this.quantOuvintes = quantOuvintes;
        this.totalMusicas = totalMusicas;
        this.duracaoMediaMusicas = duracaoMediaMusicas;
    }

    // Getters
    public String getNomeArtista() { return nomeArtista; }
    public int getQuantOuvintes() { return quantOuvintes; }
    public int getTotalMusicas() { return totalMusicas; }
    public double getDuracaoMediaMusicas() { return duracaoMediaMusicas; }

    // Setters (opcionais, mas boas práticas em DTO)
    public void setNomeArtista(String nomeArtista) { this.nomeArtista = nomeArtista; }
    public void setQuantOuvintes(int quantOuvintes) { this.quantOuvintes = quantOuvintes; }
    public void setTotalMusicas(int totalMusicas) { this.totalMusicas = totalMusicas; }
    public void setDuracaoMediaMusicas(double duracaoMediaMusicas) { this.duracaoMediaMusicas = duracaoMediaMusicas; }
}