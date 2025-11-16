import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Select from 'react-select'; // Necessário instalar: npm install react-select

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ENDPOINT = "http://localhost:8080/api/artistas/estatisticas/comparativo";

// Mapeamento de cores para cada dataset (métrica)
const METRIC_COLORS = {
    'Ouvintes': { bg: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' }, // Azul
    'Músicas Totais': { bg: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' }, // Vermelho
};

const ComparativoArtistasSelecionavel = () => {
    const [allData, setAllData] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch de todos os dados comparativos (quant_ouvintes, total_musicas)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(ENDPOINT);
                setAllData(response.data);
                // Inicialmente, selecione os 3 primeiros artistas como padrão
                const initialSelection = response.data.slice(0, 3).map(a => ({
                    value: a.nomeArtista,
                    label: a.nomeArtista
                }));
                setSelectedArtists(initialSelection);
            } catch (err) {
                setError("Falha ao carregar dados comparativos de artistas.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Opções de seleção para o dropdown
    const artistOptions = useMemo(() => {
        return allData.map(artist => ({
            value: artist.nomeArtista,
            label: artist.nomeArtista
        }));
    }, [allData]);

    // 3. Processar Dados para o Gráfico (Baseado na seleção do usuário)
    const chartJsData = useMemo(() => {
        if (!selectedArtists || selectedArtists.length === 0) {
            return { labels: [], datasets: [] };
        }

        // Os rótulos do eixo X são os artistas selecionados
        const labels = selectedArtists.map(a => a.label);

        // Filtrar os objetos de dados apenas para os artistas selecionados
        const filteredArtists = allData.filter(artist =>
            selectedArtists.some(s => s.value === artist.nomeArtista)
        );

        // Criar o dataset de Ouvintes
        const ouvintesData = filteredArtists.map(a => a.quantOuvintes);

        // Criar o dataset de Músicas Totais
        const musicasData = filteredArtists.map(a => a.totalMusicas);

        return {
            labels,
            datasets: [
                {
                    label: 'Quantidade de Ouvintes',
                    data: ouvintesData,
                    backgroundColor: METRIC_COLORS.Ouvintes.bg,
                    borderColor: METRIC_COLORS.Ouvintes.border,
                    borderWidth: 1,
                },
                {
                    label: 'Total de Músicas',
                    data: musicasData,
                    backgroundColor: METRIC_COLORS['Músicas Totais'].bg,
                    borderColor: METRIC_COLORS['Músicas Totais'].border,
                    borderWidth: 1,
                }
            ],
        };
    }, [allData, selectedArtists]);

    if (loading) return <div>Carregando dados de artistas...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Comparativo de Performance de Artistas Selecionados',
                font: { size: 18 }
            },
        },
        scales: {
            y: {
                // Eixo Y é compartilhado, mas as escalas são muito diferentes
                // Uma solução avançada seria usar dois eixos Y (eixo secundário)
                // Para este exemplo, usaremos a escala simples para ambas.
                title: { display: true, text: 'Valores Absolutos' },
                beginAtZero: true
            },
            x: {
                // Eixo X são os nomes dos artistas
            }
        }
    };

    return (
        <div style={{ width: '80%', margin: '20px auto' }}>
            <h2>Comparação Interativa de Artistas</h2>

            {/* 🛑 INTERAÇÃO: Seleção Múltipla */}
            <div style={{ marginBottom: '20px' }}>
                <label><strong>Selecione Artistas para Comparar (Múltipla Escolha):</strong></label>
                <Select
                    isMulti
                    options={artistOptions}
                    onChange={setSelectedArtists}
                    value={selectedArtists}
                    placeholder="Selecione os artistas..."
                />
            </div>

            <div style={{ height: '400px' }}>
                <Bar data={chartJsData} options={options} />
            </div>
        </div>
    );
};

export default ComparativoArtistasSelecionavel;