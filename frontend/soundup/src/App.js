import React from "react";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent
} from "@mui/material";
import Consultas from "./components/Consultas";
import Sidebar from "./components/Sidebar";
import SoundUpContainer from "./components/SoundUpContainer";
import MusicaList from "./components/MusicaList";
import ArtistaList from "./components/ArtistaList";
import AlbumList from "./components/AlbumList";
import PlaylistList from "./components/PlaylistList";
import UsuarioList from "./components/UsuarioList";
import PreferenciasPage from "./components/PreferenciasPage";
import GraficosPage from "./components/GraficosPage";
import PaginaInicial from "./components/PaginaInicial";
import Catalogo from "./components/Catalogo";
import MetricasPage from "./components/MetricasPage";
import EstatisticasPage from "./components/EstatisticasPage";
import MusicasCount from "./components/MusicasCount";
import ConsultasPage from "./components/ConsultasPage";

import MusicasPorAlbumChart from "./components/MusicasPorAlbumGraf";
import TendenciaDuracaoAnual from "./components/TendenciaDuracaoAnual";
import DistribuicaoPorPais from "./components/DistribuicaoPorPais";
import ComparativoArtistaRadar from "./components/ComparativoArtistaRadar";
import Top5ArtistasBarra from "./components/Top5ArtistasBarra";
import CorrelacaoScatter from "./components/CorrelacaoScatter";
import ComparativoArtistasSelecionavel from "./components/ComparativoArtistas";


const PRIMARY_PURPLE = '#7E57C2';
const SECONDARY_GREEN = '#1DB954';
const BACKGROUND_DEFAULT = '#121212';
const PAPER_BACKGROUND = '#1E1E1E';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: PRIMARY_PURPLE,
        },
        secondary: {
            main: SECONDARY_GREEN,
        },
        background: {
            default: BACKGROUND_DEFAULT,
            paper: PAPER_BACKGROUND,
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
        },
    },
    typography: {
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '12px 24px',
                    fontWeight: 700,
                    '&:hover': {
                        backgroundColor: PRIMARY_PURPLE,
                        boxShadow: '0 0 15px 3px rgba(126, 87, 194, 0.5)',
                    }
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
            <Sidebar />

            <SoundUpContainer>
                <Routes>
                    <Route path="/" element={<PaginaInicial />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/musicas" element={<MusicaList />} />
                    <Route path="/preferencias" element={<PreferenciasPage />} />
                    <Route path="/consultas" element={<Consultas />} />
                    <Route path="/consultas" element={<Consultas />} />

                    <Route path="/metricas" element={<MetricasPage />} />
                    <Route path="/estatisticas" element={<EstatisticasPage />} />
                    <Route path="/graficos" element={<GraficosPage />} />
                    <Route path="/count" element={<MusicasCount />} />

                    <Route path="/playlists" element={<PlaylistList />} />
                    <Route path="/musicas" element={<ArtistaList />} />
                    <Route path="/albuns" element={<AlbumList />} />
                    <Route path="/artistas" element={<ArtistaList />} />
                    <Route path="/usuarios" element={<UsuarioList />} />
                </Routes>
            </SoundUpContainer>
        </Router>
        </ThemeProvider>
    );
}

export default App;