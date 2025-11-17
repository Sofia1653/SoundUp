import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { getMusicas } from "../services/musicaService";

// Gera uma cor aleatória suave
const getRandomColor = () => {
    const colors = ["#FF6B6B", "#4ECDC4", "#5567FF", "#FFB866", "#B26BFF", "#6BFF8B"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default function MusicaArtistaList() {
    const [musicas, setMusicas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMusicas();
                setMusicas(data);
            } catch (err) {
                console.error("Erro ao buscar músicas", err);
            }
        }
        fetchData();
    }, []);

    return (
        <Box>
            <Box>
                <Typography
                    variant="h6"
                    sx={{ mt:2, mb: 2, fontWeight: "bold", color: "#fff" }}
                >
                    Todas pra você
                </Typography>
            </Box>

            <Box
                sx={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    pr: 1,
                    scrollbarWidth: "none",        // Firefox
                    "&::-webkit-scrollbar": {
                        display: "none"            // Chrome, Edge, Safari
                    }
                }}
            >



                {/* HEADER */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "90px 1fr 1fr 80px",
                        padding: "10px 15px",
                        color: "#a1a1a1",
                        fontSize: "14px"
                    }}
                >
                    <span>#</span>
                    <span>Nome</span>
                    <span>Artista</span>
                    <span>Duração</span>
                </Box>



                {/* LISTA */}
                {musicas.map((musica, index) => (
                    <Box
                        key={musica.id}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "95px 1fr 1fr 80px",
                            alignItems: "center",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "0.2s",
                            "&:hover": { backgroundColor: "#1f1f1f" }
                        }}
                    >
                        {/* Número + Caixa */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2, // número mais afastado da caixa
                            }}
                        >
                            {/* Número sem padding e sem alinhamento horizontal */}
                            <Typography sx={{ mr: 1 }}>
                                {index + 1}
                            </Typography>

                            {/* Caixa de cor */}
                            <Box
                                sx={{
                                    width: 45,
                                    height: 45,
                                    minWidth: 45,
                                    minHeight: 45,
                                    flexShrink: 0,
                                    borderRadius: "6px",
                                    background: getRandomColor(),
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <MusicNoteIcon sx={{ color: "#fff" }} />
                            </Box>
                        </Box>

                        {/* Nome */}
                        <Typography sx={{ color: "#fff" }}>{musica.nome}</Typography>

                        {/* Artista */}
                        <Typography sx={{ color: "#ccc" }}>
                            {musica.artistas?.[0]?.nome || "Desconhecido"}
                        </Typography>

                        {/* Duração */}
                        <Typography sx={{ color: "#ccc" }}>
                            {musica.duracao ? formatarDuracao(musica.duracao) : "--:--"}
                        </Typography>
                    </Box>
                ))}

            </Box>
        </Box>
    );
}

/* Formatador de segundos → mm:ss */
function formatarDuracao(segundos) {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}
