import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CircularProgress, Paper, Slide } from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { HiUserGroup, HiMusicNote, HiCollection, HiMicrophone, HiClock } from "react-icons/hi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#B0B0B0'; 
ChartJS.defaults.font.family = 'Inter';
ChartJS.defaults.borderColor = '#444'; 

const cardStyle = {
    height: '100%',
    p: 2, 
    borderRadius: '16px', 
    background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
};

const TotalStatCard = React.forwardRef(({ title, value, icon: IconComponent, color, subtext }, ref) => (
    <Card ref={ref} sx={{ ...cardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 1 }}>
            {IconComponent && (
                <Box sx={{ color: color, mr: 2 }}>
                    <IconComponent size="3.5rem" /> 
                </Box>
            )}
            <Box>
                <Typography variant="h3" sx={{ fontWeight: 'normal', lineHeight: 1.1 }}>
                    {value}
                </Typography>
                {subtext && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {subtext}
                    </Typography>
                )}
            </Box>
        </Box>
    </Card>
));

const GaugeCard = React.forwardRef(({ title, value, color }, ref) => {
    const data = {
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: [color, '#444'], 
                borderColor: ['transparent'],
                borderWidth: 0,
                circumference: 180, 
                rotation: 270,       
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2, 
        plugins: {
            tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.7)' },
            legend: { display: false },
        },
        cutout: '75%', 
    };

    return (
        <Card ref={ref} sx={{ ...cardStyle, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                {title}
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', height: 120, margin: '0 auto' }}>
                <Doughnut data={data} options={options} />
                <Typography 
                    variant="h4" 
                    sx={{ 
                        position: 'absolute', 
                        top: '65%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        fontWeight: 'normal',
                        color: 'white'
                    }}
                >
                    {value.toFixed(1)}%
                </Typography>
            </Box>
        </Card>
    );
});

const BarChartCard = React.forwardRef(({ title, label1, value1, label2, value2, color }, ref) => {
    const data = {
        labels: [label1, label2],
        datasets: [
            {
                label: title,
                data: [value1, value2],
                backgroundColor: [color, 'rgba(126, 87, 194, 0.4)'], 
                borderRadius: 6,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', 
        plugins: {
            legend: { display: false },
            tooltip: { 
                backgroundColor: 'rgba(0,0,0,0.7)',
                callbacks: {
                    label: function(context) {
                        const val = context.raw;
                        return val > 1000000 ? (val / 1000000).toFixed(1) + 'M' : val.toLocaleString();
                    }
                }
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: { color: '#B0B0B0' },
                grid: { color: '#333' }
            },
            y: {
                ticks: { color: '#FFFFFF', font: { size: 14, weight: 'normal' } },
                grid: { display: false }
            }
        }
    };

    return (
        <Card ref={ref} sx={{ ...cardStyle }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                {title}
            </Typography>
            <Box sx={{ mt: 2, height: 130 }}> 
                <Bar data={data} options={options} />
            </Box>
        </Card>
    );
});

const MetricasPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cardsVisible, setCardsVisible] = useState(Array(8).fill(false)); 

    const formatTime = (seconds) => {
        if (!seconds || seconds === 0) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const formatNumber = (num) => {
        if (num === null || num === undefined) return "N/A";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString();
    };


    useEffect(() => {
        const fetchStats = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 300)); 
                
                const response = await fetch('http://localhost:8080/api/stats');
                if (!response.ok) throw new Error('Falha ao buscar dados');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Erro no dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        if (!loading && stats) { 
            cardsVisible.forEach((_, index) => {
                setTimeout(() => {
                    setCardsVisible(prev => {
                        const newVisibility = [...prev];
                        newVisibility[index] = true;
                        return newVisibility;
                    });
                }, 150 * index); 
            });
        }
    }, [loading, stats]); 

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#121212' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (!stats) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10, bgcolor: '#121212' }}>
                <Typography variant="h5" color="error">Erro ao carregar o dashboard. Verifique o backend.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4, overflowX: 'hidden' }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    color="white"
                    sx={{ mb: 4, textAlign: 'center', fontWeight: 'normal' }}
                >
                    Dashboard Estatístico
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4}>
                        <Slide direction="up" in={cardsVisible[0]} timeout={500}> 
                            <TotalStatCard 
                                title="Usuários Ativos" 
                                value={formatNumber(stats.totalUsuarios)}
                                icon={HiUserGroup} 
                                color="#7E57C2" 
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                         <Slide direction="up" in={cardsVisible[1]} timeout={500}> 
                            <TotalStatCard 
                                title="Catálogo de Músicas" 
                                value={formatNumber(stats.totalMusicas)}
                                icon={HiMusicNote} 
                                color="#7E57C2" 
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                         <Slide direction="up" in={cardsVisible[2]} timeout={500}>
                            <TotalStatCard 
                                title="Total de Álbuns" 
                                value={formatNumber(stats.totalAlbuns)}
                                icon={HiCollection} 
                                color="#7E57C2" 
                            />
                        </Slide>
                    </Grid>

                    <Grid item xs={12} md={8}>
                         <Slide direction="up" in={cardsVisible[3]} timeout={500}> 
                            <BarChartCard
                                title="Artista em Destaque vs. Média"
                                label1={stats.topArtista || 'N/A'}
                                value1={stats.topArtistaOuvintes}
                                label2="Média Plataforma"
                                value2={stats.mediaOuvintesArtista}
                                color="#EC407A" 
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} md={4}>
                         <Slide direction="up" in={cardsVisible[4]} timeout={500}> 
                            <GaugeCard
                                title="Playlists Públicas"
                                value={stats.pctPlaylistsPublicas}
                                color="#9CCC65" 
                            />
                        </Slide>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                         <Slide direction="up" in={cardsVisible[5]} timeout={500}> 
                             <BarChartCard
                                title="Músicas por Playlist"
                                label1="Média Atual"
                                value1={stats.mediaMusicasPorPlaylist}
                                label2="Meta Sugerida"
                                value2={8} 
                                color="#00BCD4" 
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                         <Slide direction="up" in={cardsVisible[6]} timeout={500}> 
                            <TotalStatCard 
                                title="Duração Média" 
                                value={formatTime(stats.mediaDuracaoMusica)}
                                icon={HiClock} 
                                color="#FFEE58" 
                                subtext="Por faixa"
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                         <Slide direction="up" in={cardsVisible[7]} timeout={500}> 
                            <TotalStatCard 
                                title="Artista Mais Popular" 
                                value={stats.topArtista || 'Nenhum'}
                                icon={HiMicrophone} 
                                color="#7E57C2" 
                                subtext={`${formatNumber(stats.topArtistaOuvintes)} Ouvintes`}
                            />
                        </Slide>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default MetricasPage;