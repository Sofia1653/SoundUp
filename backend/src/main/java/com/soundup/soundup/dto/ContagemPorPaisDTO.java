package com.soundup.soundup.dto;

public class ContagemPorPaisDTO {
    private String pais;
    private int contagem;

    public ContagemPorPaisDTO(String pais, int contagem) {
        this.pais = pais;
        this.contagem = contagem;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public int getContagem() {
        return contagem;
    }

    public void setContagem(int contagem) {
        this.contagem = contagem;
    }
}
