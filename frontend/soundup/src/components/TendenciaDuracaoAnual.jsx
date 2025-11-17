import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ENDPOINT = "http://localhost:8080/api/musicas/estatisticas/duracao/tendencia-anual";
ChartJS.defaults.font.family = 'Inter, "Helvetica Neue", Arial, sans-serif';
const PRIMARY_PURPLE = '#7E57C2';
const SECONDARY_GREEN = '#1DB954';
const BACKGROUND_PAPER = '#1E1E1E';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#B0B0B0';

const TendenciaDuracaoAnual = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(ENDPOINT);
                const dataFromBackend = response.data;

                const labels = dataFromBackend.map(item => item.ano);
                const duracoes = dataFromBackend.map(item => item.duracaoMedia.toFixed(2));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Duração Média das Músicas (segundos)',
                            data: duracoes,
                            borderColor: PRIMARY_PURPLE + 'b3',
                            backgroundColor: PRIMARY_PURPLE,
                            tension: 0.4,
                            pointRadius: 5,
                        },
                    ],
                });

            } catch (err) {
                console.error("Erro ao buscar tendência anual:", err);
                setError("Falha ao carregar o gráfico de tendência anual.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <div>Carregando Gráfico de Tendência...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!chartData || chartData.labels.length === 0) return <div>Nenhuma música vinculada a álbuns com ano de lançamento para análise.</div>;


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#FFFF'
                }
            },
            title: {
                display: true,
                text: 'Tendência Temporal da Duração Média das Músicas por Ano',
                font: { size: 18 },
                color: '#FFFF'
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ano de Lançamento do Álbum',
                    color: '#FFFF'
                },
                ticks: {color: '#FFFF'}
            },
            y: {
                title: {
                    display: true,
                    text: 'Duração Média (segundos)',
                    color: '#FFFF'
                },
                ticks: {color: '#FFFF'},
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '90%', height: '500px', margin: '20px auto' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TendenciaDuracaoAnual;