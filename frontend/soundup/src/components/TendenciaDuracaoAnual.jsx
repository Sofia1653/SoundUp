import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// 1. Registrar os componentes necessários para um Gráfico de Linha
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// O novo endpoint que criamos
const ENDPOINT = "/api/musicas/estatisticas/duracao/tendencia-anual";

const TendenciaDuracaoAnual = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Chama o novo endpoint
                const response = await axios.get(ENDPOINT);
                const dataFromBackend = response.data; // Lista de DuracaoMediaPorAnoDTO

                // 2. Preparar os dados para o Chart.js
                const labels = dataFromBackend.map(item => item.ano); // Eixo X: Anos
                const duracoes = dataFromBackend.map(item => item.duracaoMedia.toFixed(2)); // Eixo Y: Duração Média (com 2 casas decimais)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Duração Média das Músicas (segundos)',
                            data: duracoes,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            tension: 0.4, // Suaviza a linha (tendência)
                            pointRadius: 5
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
                text: 'Tendência Temporal da Duração Média das Músicas por Ano',
                font: { size: 18 }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ano de Lançamento do Álbum',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Duração Média (segundos)',
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '90%', height: '500px', margin: '20px auto' }}>
            <h2>Tendência Temporal</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TendenciaDuracaoAnual;