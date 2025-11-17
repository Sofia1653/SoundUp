import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ScatterController, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';

// Registrar os componentes necessários para o Gráfico de Dispersão
ChartJS.register(ScatterController, PointElement, LinearScale, Title, Tooltip, Legend);
ChartJS.defaults.font.family = 'Inter, "Helvetica Neue", Arial, sans-serif';

const ENDPOINT = "http://localhost:8080/api/artistas/estatisticas/correlacao-duracao-seguidores";

const PRIMARY_PURPLE = '#7E57C2';
const SECONDARY_GREEN = '#1DB954';
const BACKGROUND_PAPER = '#1E1E1E';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#B0B0B0';

const CorrelacaoScatter = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(ENDPOINT);
                const dataFromBackend = response.data;

                if (dataFromBackend.length === 0) {
                    setChartData({ datasets: [] });
                    return;
                }

                // Mapear os dados para o formato {x, y} que o Chart.js espera para Scatter
                const scatterPoints = dataFromBackend.map(item => ({
                    // Eixo X: Duração Média (segundos)
                    x: item.duracaoMedia.toFixed(1),
                    // Eixo Y: Quantidade de Seguidores
                    y: item.quantSeguidores,
                    // Armazena o nome do artista para o tooltip
                    nome: item.nomeArtista
                }));

                setChartData({
                    datasets: [
                        {
                            label: 'Artistas',
                            data: scatterPoints,
                            backgroundColor: PRIMARY_PURPLE + 'b3',
                            borderColor: PRIMARY_PURPLE,
                            pointRadius: 6, // Tamanho dos pontos
                        },
                    ],
                });

            } catch (err) {
                console.error("Erro ao buscar dados de Correlação:", err);
                setError("Falha ao carregar o gráfico de dispersão.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <div>Carregando Gráfico de Correlação...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!chartData || chartData.datasets.length === 0) return <div>Nenhum ponto de correlação encontrado.</div>;

    // 3. Configurações do Gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Correlação: Duração Média da Música vs. Seguidores do Artista',
                font: { size: 18 },
                color: '#FFFFFF'
            },
            tooltip: {
                backgroundColor: BACKGROUND_PAPER,
                titleColor: PRIMARY_PURPLE,
                bodyColor: TEXT_PRIMARY,
                borderColor: PRIMARY_PURPLE,
                borderWidth: 1,
                callbacks: {
                    // Mostra o nome do artista na tooltip
                    label: function(context) {
                        const ponto = context.raw;
                        return [
                            `Artista: ${ponto.nome}`,
                            `Duração Média (X): ${ponto.x}s`,
                            `Seguidores (Y): ${ponto.y.toLocaleString()}`,
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Duração Média das Músicas (segundos)',
                    color: '#FFFF'
                },
                ticks: { color: TEXT_PRIMARY },
                grid: { color: TEXT_SECONDARY },
                beginAtZero: true
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Quantidade de Seguidores',
                    color: '#FFFF'
                },
                ticks: { color: TEXT_PRIMARY },
                grid: { color: TEXT_SECONDARY },
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '80%', height: '500px', margin: '20px auto' }}>
            <Scatter data={chartData} options={options} />
        </div>
    );
};

export default CorrelacaoScatter;