import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function PlaylistListTemplate({ playlists, handleDelete, handleEditClick }) {

    if (!playlists || playlists.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhuma playlist encontrada
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", mt: 2 }}>

            {/* TÍTULO */}
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
            >
                Lista de Playlists
            </Typography>

            {/* HEADER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "60px 2fr 1fr 1fr 150px",
                    padding: "10px 15px",
                    color: "#a1a1a1",
                    fontSize: "14px"
                }}
            >
                <span>#</span>
                <span>Nome</span>
                <span>ID Ouvinte</span>
                <span>Visibilidade</span>
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
                {playlists.map((p, index) => (
                    <Box
                        key={p.id}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "60px 2fr 1fr 1fr 150px",
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
                            {p.nome || "-"}
                        </Typography>

                        {/* ID Ouvinte */}
                        <Typography sx={{ color: "#ccc" }}>
                            {p.idOuvinte || "-"}
                        </Typography>

                        {/* Visibilidade */}
                        <Typography sx={{ color: "#ccc" }}>
                            {p.visibilidade
                                ? p.visibilidade.charAt(0).toUpperCase() + p.visibilidade.slice(1)
                                : "-"}
                        </Typography>

                        {/* Ações */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "center"
                            }}
                        >
                            {/* EDITAR */}
                            <IconButton
                                onClick={() => handleEditClick(p)}
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
                                onClick={() => handleDelete(p.id)}
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