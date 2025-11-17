import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Registrar os componentes necessários para o Gráfico de Barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = 'Inter, "Helvetica Neue", Arial, sans-serif';
const PRIMARY_PURPLE = '#7E57C2';
const SECONDARY_GREEN = '#1DB954';
const BACKGROUND_PAPER = '#1E1E1E';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#B0B0B0';

// Mantemos o mesmo endpoint que já retorna as métricas comparativas
const ENDPOINT = "http://localhost:8080/api/artistas/estatisticas/comparativo";

const Top5ArtistasBarra = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const maxArtists = 5;

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(ENDPOINT);

                // O backend já ordena por quant_ouvintes DESC (pela cláusula ORDER BY na SQL)
                const topArtists = response.data.slice(0, maxArtists);

                if (topArtists.length === 0) {
                    setChartData({ labels: [], datasets: [] });
                    return;
                }

                // 1. Extrair os rótulos (nomes) e os dados (ouvintes)
                const labels = topArtists.map(artist => artist.nomeArtista);
                const ouvintes = topArtists.map(artist => artist.quantOuvintes);

                // 2. Definir cores para o gráfico
                const colors = ['#9C27B0',  '#7E57C2', '#5E35B1', '#4527A0', '#311B92'];

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Quantidade de Ouvintes',
                            data: ouvintes,
                            backgroundColor: colors.slice(0, labels.length).map(c => c + 'B3'), // Opacidade 70%
                            borderColor: colors.slice(0, labels.length),
                            borderWidth: 1,
                        },
                    ],
                });

            } catch (err) {
                console.error("Erro ao buscar dados de Top Artistas:", err);
                setError("Falha ao carregar o gráfico de Top Artistas.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <div>Carregando Top 5 Artistas...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!chartData || chartData.labels.length === 0) return <div>Nenhum artista com ouvintes válidos encontrado.</div>;

    // 3. Configurações do Gráfico de Barras Horizontal
    const options = {
        indexAxis: 'y', // 🛑 CHAVE para Barras Horizontais
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Não precisamos da legenda se houver apenas um dataset
            },
            title: {
                display: true,
                text: `Top ${maxArtists} Artistas por Quantidade de Ouvintes`,
                color: '#FFFF',
                font: { size: 15 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Formata o número de ouvintes para ser mais legível
                        const valor = context.parsed.x.toLocaleString();
                        return `Ouvintes: ${valor}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Quantidade de Ouvintes',
                    color: TEXT_SECONDARY, // 🛑 Título do Eixo X: Cinza Claro
                },
                ticks: { color: TEXT_PRIMARY }, // 🛑 Números (Ticks) do Eixo X: Branco
                grid: { color: TEXT_SECONDARY }, // 🛑 Grade: Escura
                beginAtZero: true,
            },
            y: {
                title: { display: false },
                ticks: { color: TEXT_PRIMARY }, // 🛑 Nomes dos Artistas (Ticks) do Eixo Y: Branco
                grid: { color: 'rgba(0, 0, 0, 0)' }, // Grade Vertical Removida
            }
        }
    };

    return (
        <div style={{ width: '80%', height: '400px', margin: '80px auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Top5ArtistasBarra;