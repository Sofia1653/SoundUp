import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

// Registrar os componentes necessários para um Gráfico de Pizza
ChartJS.register(ArcElement, Tooltip, Legend);

// O novo endpoint
const ENDPOINT = "http://localhost:8080/api/usuarios/estatisticas/distribuicao-pais";

// Função utilitária para gerar cores dinâmicas
const generateColors = (count) => {
    const colors = [];
    const baseColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4CAF50', '#E91E63'
    ];
    for (let i = 0; i < count; i++) {
        // Cicla pelas cores base
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};

const DistribuicaoPorPais = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Lembre-se: O proxy do package.json lida com o localhost:8080
                const response = await axios.get(ENDPOINT);
                const dataFromBackend = response.data; // Lista de ContagemPorPaisDTO

                if (dataFromBackend.length === 0) {
                    // Caso não haja dados, evitamos o erro de renderização
                    setChartData({ labels: [], datasets: [] });
                    return;
                }

                // Extrair rótulos e valores
                const labels = dataFromBackend.map(item => item.pais);
                const contagens = dataFromBackend.map(item => item.contagem);

                // Gerar cores dinamicamente baseado no número de países
                const backgroundColors = generateColors(labels.length);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total de Usuários',
                            data: contagens,
                            backgroundColor: backgroundColors,
                            borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
                            borderWidth: 1,
                        },
                    ],
                });

            } catch (err) {
                console.error("Erro ao buscar distribuição por país:", err);
                setError("Falha ao carregar o gráfico de distribuição geográfica.");
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <div>Carregando Gráfico de Distribuição Geográfica...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!chartData || chartData.labels.length === 0) return <div>Nenhum dado de usuário com informação de país encontrado para análise.</div>;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right', // Colocamos a legenda à direita para melhor visualização
            },
            title: {
                display: true,
                text: 'Distribuição de Usuários por País',
                font: { size: 18 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Calcula a porcentagem para mostrar na tooltip
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const valor = context.parsed;
                        const porcentagem = ((valor / total) * 100).toFixed(2);
                        return `${context.label}: ${valor} (${porcentagem}%)`;
                    }
                }
            }
        },
    };

    return (
        <div style={{ width: '400px', height: '400px', margin: '20px auto' }}>
            <h2>Distribuição Geográfica</h2>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default DistribuicaoPorPais;