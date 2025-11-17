import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material';

import ComparativoArtistas from './ComparativoArtistas';
import DistribuicaoPorPais from './DistribuicaoPorPais';
import MusicasPorAlbumChart from './MusicasPorAlbumGraf';
import Top5ArtistasBarra from './Top5ArtistasBarra';
import TendenciaDuracaoAnual from './TendenciaDuracaoAnual';
import CorrelacaoScatter from './CorrelacaoScatter';


export default function EstatisticasPage() {

    const spacingValue = 3;

    const cardStyle = {
        p: spacingValue,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '12px',
        minHeight: 450,
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
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>

            <Typography variant="h4" gutterBottom component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#7E57C2' }}>
                Dashboard de Estatísticas e Métricas
            </Typography>

            <Grid container spacing={spacingValue}>

                <Grid item xs={12}>
                    <Paper sx={{...cardStyle, minHeight: 550}} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Comparativo Detalhado de Artistas
                        </Typography>
                        <Box sx={{ ...chartBoxStyle, minHeight: 450 }}>
                            <ComparativoArtistas />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Correlação de Atributos (Scatter Plot)
                        </Typography>
                        <Box sx={chartBoxStyle}>
                            <CorrelacaoScatter />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Top 5 Artistas
                        </Typography>
                        <Box sx={chartBoxStyle}>
                            <Top5ArtistasBarra />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{...cardStyle, minHeight: 500}} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Tendência de Duração Anual
                        </Typography>
                        <Box sx={{ ...chartBoxStyle, minHeight: 400 }}>
                            <TendenciaDuracaoAnual />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Distribuição de Usuários por País
                        </Typography>
                        <Box sx={chartBoxStyle}>
                            <DistribuicaoPorPais />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Músicas por Álbum
                        </Typography>
                        <Box sx={chartBoxStyle}>
                            <MusicasPorAlbumChart />
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
}