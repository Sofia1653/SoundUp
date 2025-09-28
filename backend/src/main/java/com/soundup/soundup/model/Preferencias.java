package com.soundup.soundup.model;

public class Preferencias {
    private String todos_dias;
    private String plataforma;
    private String tipo_playlist;
    private String media_horas;
    private String humor;
    private String horario_dia;
    private String concentracao;
    private String locomocao;
    private String tipo_musica;
    private String musica_dormir;
    private String momentos_vida;
    private String motivacao;
    private String polemicas;

    public Preferencias(String todos_dias, String plataforma, String tipo_playlist, String media_horas, String humor, String horario_dia, String concentracao, String locomocao, String tipo_musica, String musica_dormir, String momentos_vida, String motivacao, String polemicas){
        this.todos_dias = todos_dias;
        this.plataforma = plataforma;
        this.tipo_playlist = tipo_playlist;
        this.media_horas = media_horas;
        this.humor = humor;
        this.horario_dia = horario_dia;
        this.concentracao = concentracao;
        this.locomocao = locomocao;
        this.tipo_musica = tipo_musica;
        this.musica_dormir = musica_dormir;
        this.momentos_vida = momentos_vida;
        this.motivacao = motivacao;
        this.polemicas = polemicas;
    }
    public String getTodos_dias(){
        return todos_dias;
    }
    public void setTodos_dias(String todos_dias){
        this.todos_dias = todos_dias;
    }
    public String getPlataforma(){
        return plataforma;
    }
    public void setPlataforma(String plataforma){
        this.plataforma = plataforma;
    }
    public String getTipo_playlist(){
        return tipo_playlist;
    }
    public void setTipo_playlist(String tipo_playlist){
        this.tipo_playlist = tipo_playlist;
    }
    public String getMedia_horas(){
        return media_horas;
    }
    public void setMedia_horas(String media_horas){
        this.media_horas = media_horas;
    }
    public String getHumor(){
        return humor;
    }
    public void setHumor(String humor){
        this.humor = humor;
    }
    public String getHorario_dia(){
        return horario_dia;
    }
    public void setHorario_dia(String horario_dia){
        this.horario_dia = horario_dia;
    }
    public String getConcentracao(){
        return concentracao;
    }
    public void setConcentracao(String concentracao){
        this.concentracao = concentracao;
    }
    public String getLocomocao(){
        return locomocao;
    }
    public void setLocomocao(String locomocao){
        this.locomocao = locomocao;
    }
    public String getTipo_musica(){
        return tipo_musica;
    }
    public void setTipo_musica(String tipo_musica){
        this.tipo_musica = tipo_musica;
    }
    public String getMusica_dormir(){
        return musica_dormir;
    }
    public void setMusica_dormir(String musica_dormir){
        this.musica_dormir = musica_dormir;
    }
    public String getMomentos_vida(){
        return momentos_vida;
    }
    public void setMomentos_vida(String momentos_vida){
        this.momentos_vida = momentos_vida;
    }
    public String getMotivacao(){
        return motivacao;
    }
    public void setMotivacao(String motivacao){
        this.motivacao = motivacao;
    }
    public String getPolemicas(){
        return polemicas;
    }
    public void setPolemicas(String polemicas){
        this.polemicas = polemicas;
    }
}
