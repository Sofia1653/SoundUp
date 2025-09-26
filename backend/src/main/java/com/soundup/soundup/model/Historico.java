package com.soundup.soundup.model;

import java.time.LocalDateTime;

public class Historico {
  private int id;
    private LocalDateTime hora_inicio;
    private LocalDateTime hora_fim;

    public Historico(int id, LocalDateTime hora_inicio, LocalDateTime hora_fim) {
        this.id = id;
        this.hora_inicio = hora_inicio;
        this.hora_fim = hora_fim;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public LocalDateTime getHora_inicio() {
        return hora_inicio;
    }
    public void setHora_inicio(LocalDateTime hora_inicio) {
        this.hora_inicio = hora_inicio;
    }
    public LocalDateTime getHora_fim() {
        return hora_fim;
    }
    public void setHora_fim(LocalDateTime hora_fim) {
        this.hora_fim = hora_fim;
    }
}
