import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material';

// --- 1. IMPORTAR TODOS OS SEUS COMPONENTES DE GRÁFICOS ---
import ComparativoArtistas from './ComparativoArtistas';
import DistribuicaoPorPais from './DistribuicaoPorPais';
import MusicasPorAlbumChart from './MusicasPorAlbumGraf';
import Top5ArtistasBarra from './Top5ArtistasBarra';
import TendenciaDuracaoAnual from './TendenciaDuracaoAnual';
import CorrelacaoScatter from './CorrelacaoScatter';


export default function EstatisticasPage() {

    const spacingValue = 3;

    // Estilo base para os cards de gráficos
    const cardStyle = {
        p: spacingValue,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '12px',
        minHeight: 450, // Altura mínima para gráficos
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>

            <Typography variant="h4" gutterBottom component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#7E57C2' }}>
                Dashboard de Estatísticas e Métricas
            </Typography>

            <Grid container spacing={spacingValue}>

                {/* -------------------- LINHA 1: COMPARATIVO DE ARTISTAS (12/12) -------------------- */}
                <Grid item xs={12}>
                    <Paper sx={{...cardStyle, minHeight: 550}} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Comparativo Detalhado de Artistas
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><ComparativoArtistas /></Box>
                    </Paper>
                </Grid>

                {/* -------------------- LINHA 2: SCATTER E TOP 5 (6/12 cada) -------------------- */}
                <Grid item xs={12} md={7}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Correlação de Atributos (Scatter Plot)
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><CorrelacaoScatter /></Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Top 5 Artistas
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><Top5ArtistasBarra /></Box>
                    </Paper>
                </Grid>

                {/* -------------------- LINHA 3: TENDÊNCIA ANUAL (12/12) -------------------- */}
                <Grid item xs={12}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Tendência de Duração Anual
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><TendenciaDuracaoAnual /></Box>
                    </Paper>
                </Grid>

                {/* -------------------- LINHA 4: DISTRIBUIÇÃO POR PAÍS (12/12) -------------------- */}
                <Grid item xs={12}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Distribuição de Usuários por País
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><DistribuicaoPorPais /></Box>
                    </Paper>
                </Grid>

                {/* -------------------- LINHA 5: MÚSICAS POR ÁLBUM (12/12) -------------------- */}
                <Grid item xs={12}>
                    <Paper sx={cardStyle} elevation={3}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Músicas por Álbum
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}><MusicasPorAlbumChart /></Box>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
}