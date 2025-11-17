import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import MusicaList from "../components/MusicaList";
import ArtistaList from "../components/ArtistaList";
import AlbumList from "../components/AlbumList";
import PlaylistList from "../components/PlaylistList";
import UsuarioList from "../components/UsuarioList";
import PreferenciasPage from "../components/PreferenciasPage";
import GraficosPage from "../components/GraficosPage";
import PaginaInicial from "../components/PaginaInicial";

export default function SoundUpContainer() {
    return (
        <Box
            sx={{
                marginLeft: "240px", // espaço da sidebar fixa
                height: "100vh",
                overflowY: "auto",
                backgroundColor: "#121212",
                color: "white",
                px: 3,
                py: 2,
                scrollbarWidth: "none",        // Firefox
                "&::-webkit-scrollbar": {
                    display: "none"            // Chrome, Edge, Safari
                }
            }}
        >
            <Routes>
                <Route path="/musicas" element={<MusicaList />} />
                <Route path="/artistas" element={<ArtistaList />} />
                <Route path="/albuns" element={<AlbumList />} />
                <Route path="/playlists" element={<PlaylistList />} />
                <Route path="/usuarios" element={<UsuarioList />} />
                <Route path="/preferencias" element={<PreferenciasPage />} />
                <Route path="/graficos" element={<GraficosPage />} />

                {/* Página inicial */}
                <Route path="/" element={<PaginaInicial/>} />
            </Routes>
        </Box>
    );
}
