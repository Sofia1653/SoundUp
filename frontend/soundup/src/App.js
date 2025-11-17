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

// Importar os componentes da segunda página
import UsuarioList from "./components/UsuarioList";
import ArtistaList from "./components/ArtistaList";
import MusicaList from "./components/MusicaList";
import PreferenciasPage from "./components/PreferenciasPage";
import Consultas from "./components/Consultas";
import GraficosPage from "./components/GraficosPage";
import PlaylistList from "./components/PlaylistList";
import AlbumList from "./components/AlbumList";
import Sidebar from "./components/Sidebar";
import SoundUpContainer from "./components/SoundUpContainer";

// Cores e Tema (estilo da primeira página)
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

            {/* Conteúdo das Rotas */}
            <Routes>
                <Route path="/" element={<SoundUpContainer />} />
                <Route path="/preferencias" element={<PreferenciasPage />} />
                <Route path="/graficos" element={<GraficosPage />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;