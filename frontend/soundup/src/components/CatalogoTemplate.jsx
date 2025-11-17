// src/components/CatalogoTemplate.jsx
import { Box, Typography } from "@mui/material";

export default function CatalogoTemplate({ data }) {
    return (
        <Box sx={{ width: "100%" }}>
            {/* TÍTULO */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
                Catálogo de Músicas
            </Typography>

            {/* HEADER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 1fr 1fr 1fr 80px", // 6 colunas
                    padding: "10px 15px",
                    color: "#a1a1a1",
                    fontSize: "14px"
                }}
            >
                <span>#</span>
                <span>Música</span>
                <span>Artista</span>
                <span>Álbum</span>
                <span>Gênero</span>
                <span>Duração</span>
            </Box>

            {/* LISTA COM SCROLL */}
            <Box
                sx={{
                    maxHeight: "460px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    pr: 1
                }}
            >
                {data.map((item, index) => (
                    <Box
                        key={`${item.id_musica}-${index}`}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "60px 1fr 1fr 1fr 1fr 70px",
                            alignItems: "center",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "0.2s",
                            "&:hover": { backgroundColor: "#1f1f1f" }
                        }}
                    >
                        <Typography sx={{ color: "#bbb" }}>{index + 1}</Typography>
                        <Typography sx={{ color: "#fff", fontWeight: 500 }}>{item.nomeMusica}</Typography>
                        <Typography sx={{ color: "#ccc" }}>{item.nomeArtista || "–"}</Typography>
                        <Typography sx={{ color: "#ccc" }}>{item.nomeAlbum || "–"}</Typography>
                        <Typography sx={{ color: "#ccc" }}>{item.nomeGenero || "–"}</Typography>
                        <Typography sx={{ color: "#ccc" }}>
                            {item.duracaoSegundos ? formatarDuracao(item.duracaoSegundos) : "--:--"}
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
