import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function MusicaListTemplate({ musicas, handleDelete, handleEditClick }) {

    if (!musicas || musicas.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhuma música encontrada
                </Typography>
            </Box>
        );
    }

    const formatDuration = (seconds) => {
        if (!seconds) return "-";
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;
        return `${minutes}:${remaining.toString().padStart(2, "0")}`;
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>

            {/* TÍTULO */}
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
            >
                Lista de Músicas
            </Typography>

            {/* HEADER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "60px 2fr 1fr 2fr 120px",
                    padding: "10px 15px",
                    color: "#a1a1a1",
                    fontSize: "14px"
                }}
            >
                <span>#</span>
                <span>Nome</span>
                <span>Duração</span>
                <span>Artistas</span>
                <span style={{ textAlign: "center" }}>Ações</span>
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
                {musicas.map((m, index) => (
                    <Box
                        key={m.id}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "60px 2fr 1fr 2fr 120px",
                            alignItems: "center",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "0.2s",
                            "&:hover": {
                                backgroundColor: "#1f1f1f"
                            }
                        }}
                    >
                        {/* Número */}
                        <Typography sx={{ color: "#bbb" }}>{index + 1}</Typography>

                        {/* Nome */}
                        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                            {m.nome || "-"}
                        </Typography>

                        {/* Duração */}
                        <Typography sx={{ color: "#ccc" }}>
                            {formatDuration(m.duracao)}{" "}
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{ color: "#777" }}
                            >
                                ({m.duracao}s)
                            </Typography>
                        </Typography>

                        {/* Artistas */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {m.artistas?.length ? (
                                m.artistas.map((art, i) => (
                                    <Chip
                                        key={i}
                                        label={art.nome}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ fontSize: "11px" }}
                                    />
                                ))
                            ) : (
                                <Typography sx={{ color: "#777" }}>Nenhum artista</Typography>
                            )}
                        </Box>

                        {/* AÇÕES */}
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            {/* EDITAR */}
                            <IconButton
                                onClick={() => handleEditClick(m)}
                                sx={{
                                    color: "#ffffff",
                                    padding: "6px",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.08)"
                                    }
                                }}
                            >
                                <FiEdit size={18} />
                            </IconButton>

                            {/* DELETAR */}
                            <IconButton
                                onClick={() => handleDelete(m.id)}
                                sx={{
                                    color: "#ff5555",
                                    padding: "6px",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,85,85,0.15)"
                                    }
                                }}
                            >
                                <FiTrash size={18} />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
