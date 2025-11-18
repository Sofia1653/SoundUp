import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material';
import banner from "../banner/estatisticas.png";

import ComparativoArtistas from './ComparativoArtistas';
import DistribuicaoPorPais from './DistribuicaoPorPais';
import MusicasPorAlbumChart from './MusicasPorAlbumGraf';
import Top5ArtistasBarra from './Top5ArtistasBarra';
import TendenciaDuracaoAnual from './TendenciaDuracaoAnual';
import CorrelacaoScatter from './CorrelacaoScatter';


export default function EstatisticasPage() {

    const spacingValue = 3;

    // Estilo dos cards (widgets) ajustado para o tema escuro
    const cardStyle = {
        p: spacingValue,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '12px',
        minHeight: 450,
        backgroundColor: '#1E1E1E', // Fundo escuro para os cards
        color: '#FFFFFF', // Cor do texto principal
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)', // Sombra para destaque
    };

    const chartBoxStyle = {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        minHeight: 350,
        position: 'relative',
        p: 2,
    };

    return (
        <Box>
            {/* BANNER */}
            <img
                src={banner}
                alt="Banner de Estatísticas"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />

            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                {/* TÍTULO PRINCIPAL - Cor ajustada para o padrão do tema escuro/roxo */}
                <Typography
                    variant="h4"
                    gutterBottom
                    component="h1"
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        color: '#FFFFFF' // Cor branca para o título principal (em vez de roxo claro)
                    }}
                >
                </Typography>

                <Grid container spacing={spacingValue}>
                    {/* Exemplo de Card 1: Comparativo Artistas */}
                    <Grid item xs={12}>
                        <Paper sx={{...cardStyle, minHeight: 550}} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Comparativo Detalhado de Artistas
                            </Typography>
                            <Box sx={{ ...chartBoxStyle, minHeight: 450 }}>
                                <ComparativoArtistas />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Exemplo de Card 2: Correlação */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={cardStyle} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Correlação de Atributos (Scatter Plot)
                            </Typography>
                            <Box sx={chartBoxStyle}>
                                <CorrelacaoScatter />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Exemplo de Card 3: Top 5 Artistas */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={cardStyle} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Top 5 Artistas
                            </Typography>
                            <Box sx={chartBoxStyle}>
                                <Top5ArtistasBarra />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Card 4: Tendência Duração Anual */}
                    <Grid item xs={12}>
                        <Paper sx={{...cardStyle, minHeight: 500}} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Tendência de Duração Anual
                            </Typography>
                            <Box sx={{ ...chartBoxStyle, minHeight: 400 }}>
                                <TendenciaDuracaoAnual />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Card 5: Distribuição por País */}
                    <Grid item xs={12}>
                        <Paper sx={cardStyle} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Distribuição de Usuários por País
                            </Typography>
                            <Box sx={chartBoxStyle}>
                                <DistribuicaoPorPais />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Card 6: Músicas por Álbum */}
                    <Grid item xs={12}>
                        <Paper sx={cardStyle} elevation={3}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#E0E0E0' }}>
                                Músicas por Álbum
                            </Typography>
                            <Box sx={chartBoxStyle}>
                                <MusicasPorAlbumChart />
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}