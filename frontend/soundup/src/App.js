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

// Componente para a página principal
const Dashboard = () => (
    <Box sx={{
        bgcolor: BACKGROUND_DEFAULT,
        minHeight: 'calc(100vh - 89px)',
        py: 4
    }}>
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                color="white"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                🎯 Dashboard Principal
            </Typography>
            <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: '1fr'
            }}>
                <UsuarioList />
                <ArtistaList />
                <MusicaList />
                <Consultas />
            </Box>
        </Container>
    </Box>
);

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                {/* Header Fixo com Navegação */}
                <Box
                    component="header"
                    sx={{
                        bgcolor: PAPER_BACKGROUND,
                        py: 2,
                        borderBottom: `1px solid ${PRIMARY_PURPLE}`,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000
                    }}
                >
                    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: PRIMARY_PURPLE }}>
                            🎵 SoundUp
                        </Typography>
                        <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: PRIMARY_PURPLE,
                                        backgroundColor: 'rgba(126, 87, 194, 0.1)'
                                    }
                                }}
                            >
                                🏠 Página Inicial
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/preferencias"
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: PRIMARY_PURPLE,
                                        backgroundColor: 'rgba(126, 87, 194, 0.1)'
                                    }
                                }}
                            >
                                📊 Preferências Musicais
                            </Button>
                        </Box>
                    </Container>
                </Box>
                {/* Conteúdo das Rotas */}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/preferencias" element={<PreferenciasPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;