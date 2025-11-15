import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import axios from 'axios';

// 1. Registrar os componentes necessários para o Gráfico de Radar
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ENDPOINT = "http://localhost:8080/api/artistas/estatisticas/comparativo";

// Cores base para os datasets (artistas)
const ARTIST_COLORS = [
    { bg: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' }, // Vermelho
    { bg: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' }, // Azul
    { bg: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' }, // Verde
    { bg: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' }, // Amarelo
];

const ComparativoArtistaRadar = ({ maxArtists = 5 }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(ENDPOINT);
                // Pegamos apenas o TOP X artistas, conforme ordenado pelo backend
                const topArtists = response.data.slice(0, maxArtists);

                if (topArtists.length === 0) {
                    setChartData({ labels: [], datasets: [] });
                    return;
                }

                // Definir os rótulos (as métricas)
                const labels = [
                    'Quant. Ouvintes',
                    'Total Músicas',
                    'Duração Média (s)',
                ];

                // 2. Criar os datasets para o Chart.js
                const datasets = topArtists.map((artist, index) => {
                    const color = ARTIST_COLORS[index % ARTIST_COLORS.length];
                    return {
                        label: artist.nomeArtista,
                        data: [
                            artist.quantOuvintes,
                            artist.totalMusicas,
                            artist.duracaoMediaMusicas.toFixed(1), // Arredonda
                        ],
                        backgroundColor: color.bg,
                        borderColor: color.border,
                        borderWidth: 2,
                        pointBackgroundColor: color.border,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: color.border
                    };
                });

                setChartData({ labels, datasets });

            } catch (err) {
                console.error("Erro ao buscar comparativo de artistas:", err);
                setError("Falha ao carregar o gráfico de radar dos artistas.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [maxArtists]); // Reexecuta se o número máximo de artistas mudar

    if (loading) return <div>Carregando Comparativo de Artistas...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!chartData || chartData.labels.length === 0) return <div>Nenhum artista com métricas válidas encontrado.</div>;

    // 3. Configurações do Gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Comparativo de Performance dos Top ${maxArtists} Artistas`,
                font: { size: 18 }
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0, // Inicia em zero
                pointLabels: {
                    font: {
                        size: 14 // Aumenta o tamanho dos rótulos (métricas)
                    }
                },
                // Garante que a escala se ajuste ao valor máximo de CADA métrica (não precisa de normalização manual)
                grid: {
                    circular: true
                }
            }
        }
    };

    return (
        <div style={{ width: '600px', height: '600px', margin: '20px auto' }}>
            <h2>Performance dos Artistas</h2>
            <Radar data={chartData} options={options} />
        </div>
    );
};

export default ComparativoArtistaRadar;