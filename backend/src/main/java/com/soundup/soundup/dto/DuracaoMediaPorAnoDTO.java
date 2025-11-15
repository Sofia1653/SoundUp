package com.soundup.soundup.dto;

public class DuracaoMediaPorAnoDTO {
    private int ano;
    private double duracaoMedia; // Usamos double para a média

    public DuracaoMediaPorAnoDTO(int ano, double duracaoMedia) {
        this.ano = ano;
        this.duracaoMedia = duracaoMedia;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public double getDuracaoMedia() {
        return duracaoMedia;
    }

    public void setDuracaoMedia(double duracaoMedia) {
        this.duracaoMedia = duracaoMedia;
    }
}