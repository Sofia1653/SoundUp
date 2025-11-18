import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function AlbumListTemplate({ albuns, handleDelete, handleEditClick }) {

    if (!albuns || albuns.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhum álbum encontrado
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
                Lista de Álbuns
            </Typography>

            {/* HEADER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 1fr 150px",
                    padding: "10px 15px",
                    color: "#a1a1a1",
                    fontSize: "14px"
                }}
            >
                <span>#</span>
                <span>Nome</span>
                <span>Ano</span>
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
                {albuns.map((a, index) => (
                    <Box
                        key={a.id}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "60px 1fr 1fr 150px",
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
                            {a.nome}
                        </Typography>

                        {/* Ano */}
                        <Typography sx={{ color: "#ccc" }}>
                            {a.ano || "–"}
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
                                onClick={() => handleEditClick(a)}
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
                                onClick={() => handleDelete(a.id)}
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
