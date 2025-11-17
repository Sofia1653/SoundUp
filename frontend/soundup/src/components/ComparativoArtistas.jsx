import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Select from 'react-select'; // Componente de seleção

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = 'Inter, "Helvetica Neue", Arial, sans-serif';

const ENDPOINT = "http://localhost:8080/api/artistas/estatisticas/comparativo";

const PRIMARY_PURPLE = '#7E57C2';
const SECONDARY_PURPLE = '#4527A0';
const BACKGROUND_PAPER = '#1E1E1E';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#B0B0B0';

const METRIC_COLORS = {
    'Ouvintes': { bg: PRIMARY_PURPLE + 'b3', border: PRIMARY_PURPLE }, // b3 eh 70% de opacidade
    'Músicas Totais': { bg: SECONDARY_PURPLE + 'b3', border: SECONDARY_PURPLE },
};

const ComparativoArtistasSelecionavel = () => {
    const [allData, setAllData] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(ENDPOINT);
                setAllData(response.data);
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

    const artistOptions = useMemo(() => {
        return allData.map(artist => ({
            value: artist.nomeArtista,
            label: artist.nomeArtista
        }));
    }, [allData]);

    const chartJsData = useMemo(() => {
        if (!selectedArtists || selectedArtists.length === 0) {
            return { labels: [], datasets: [] };
        }
        const labels = selectedArtists.map(a => a.label);
        const ouvintesData = selectedArtists.map(selection => {
            const artistData = allData.find(artist => artist.nomeArtista === selection.value);
            return artistData ? artistData.quantOuvintes : 0;
        });

        const musicasData = selectedArtists.map(selection => {
            const artistData = allData.find(artist => artist.nomeArtista === selection.value);
            return artistData ? artistData.totalMusicas : 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Quantidade de Ouvintes',
                    data: ouvintesData,
                    backgroundColor: METRIC_COLORS.Ouvintes.bg,
                    borderColor: METRIC_COLORS.Ouvintes.border,
                    borderWidth: 1,
                    hoverBackgroundColor: METRIC_COLORS.Ouvintes.border,
                },
                {
                    label: 'Total de Músicas',
                    data: musicasData,
                    backgroundColor: METRIC_COLORS['Músicas Totais'].bg,
                    borderColor: METRIC_COLORS['Músicas Totais'].border,
                    borderWidth: 1,
                    hoverBackgroundColor: METRIC_COLORS['Músicas Totais'].border,
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
            legend: {
                position: 'top',
                labels: { color: TEXT_PRIMARY },
            },
            title: {
                display: false,
                text: 'Comparativo de Performance de Artistas Selecionados',
                color: TEXT_PRIMARY,
                font: { size: 18 }
            },
            tooltip: {
                bodyColor: '#FFFFFF',
                titleColor: '#FFFFFF',
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Valores Absolutos',
                    color: TEXT_SECONDARY

                },
                ticks: { color: TEXT_SECONDARY },
                grid: { color: '#333333' },
                beginAtZero: true,
            },
            x: {
                ticks: { color: TEXT_SECONDARY },
                grid: { color: 'rgba(0, 0, 0, 0)' },
            }
        }
    };

    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: BACKGROUND_PAPER,
            borderColor: state.isFocused ? PRIMARY_PURPLE : '#333333',
            boxShadow: state.isFocused ? `0 0 0 1px ${PRIMARY_PURPLE}` : 'none',
            '&:hover': { borderColor: PRIMARY_PURPLE },
            color: TEXT_PRIMARY,
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: BACKGROUND_PAPER,
            zIndex: 10,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? PRIMARY_PURPLE + '20'
                : state.isSelected
                    ? PRIMARY_PURPLE
                    : BACKGROUND_PAPER,
            color: TEXT_PRIMARY,
            '&:active': { backgroundColor: PRIMARY_PURPLE + '40' },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: TEXT_PRIMARY,
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: PRIMARY_PURPLE + '30',
            color: TEXT_PRIMARY,
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: TEXT_PRIMARY,
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: TEXT_SECONDARY,
            '&:hover': {
                backgroundColor: PRIMARY_PURPLE,
                color: 'white',
            },
        }),
        input: (provided) => ({
            ...provided,
            color: TEXT_PRIMARY,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: TEXT_SECONDARY,
        }),
    };


    return (
        <div style={{ padding: '0 20px' }}>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ color: TEXT_SECONDARY, display: 'block', marginBottom: '8px' }}>
                    <strong>Selecione Artistas para Comparar (Múltipla Escolha):</strong>
                </label>
                <Select
                    isMulti
                    options={artistOptions}
                    onChange={setSelectedArtists}
                    value={selectedArtists}
                    placeholder="Selecione os artistas..."
                    styles={selectStyles}
                />
            </div>

            <div style={{ height: '450px' }}>
                <Bar data={chartJsData} options={options} />
            </div>
        </div>
    );
};

export default ComparativoArtistasSelecionavel;