package com.soundup.soundup.dto;

public class DuracaoBoxplotDTO {
    private int min;
    private int q1;
    private int mediana;
    private int q3;
    private int max;

    public DuracaoBoxplotDTO(int min, int q1, int mediana, int q3, int max) {
        this.min = min;
        this.q1 = q1;
        this.mediana = mediana;
        this.q3 = q3;
        this.max = max;
    }

    public int getMin() { return min; }
    public int getQ1() { return q1; }
    public int getMediana() { return mediana; }
    public int getQ3() { return q3; }
    public int getMax() { return max; }
}
