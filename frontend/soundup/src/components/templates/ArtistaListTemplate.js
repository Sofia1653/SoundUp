import React from "react";
import { Box, Typography, IconButton } from "@mui/material"; // Usaremos IconButton e Box/Typography para a estrutura de lista
import { FiEdit, FiTrash } from "react-icons/fi"; // Importando ícones para as ações

export default function ArtistaListTemplate({ artistas, handleDelete, handleEditClick }) {
    if (!artistas || artistas.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhum artista encontrado
                </Typography>
            </Box>
        );
    }

    // Definindo a estrutura de grid para 9 colunas + 60px para o número.
    // Colunas: # (60px), Nome (1.5fr), Email (1.5fr), País (1fr), Estado (1fr), Cidade (1fr), Seguidores (1fr), Telefone (1fr), Ouvintes (1fr), Ações (150px)
    // Ajustado para replicar o estilo de lista sem Table. O número de colunas é grande, então o layout será largo.
    const gridColumns = "60px 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px";

    const formatNumber = (num) => {
        return (num !== null && num !== undefined)
            ? num.toLocaleString()
            : '–';
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            {/* TÍTULO - Mantido para consistência, mas é ideal que o título principal venha do ArtistaList */}
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
            >
                Lista de Artistas
            </Typography>

            {/* HEADER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: gridColumns,
                    padding: "10px 15px",
                    color: "#a1a1a1",
                    fontSize: "14px"
                }}
            >
                <span>#</span>
                <span>Nome</span>
                <span>Email</span>
                <span>País</span>
                <span>Estado</span>
                <span>Cidade</span>
                <span style={{ textAlign: "center" }}>Seguidores</span>
                <span>Telefone</span>
                <span style={{ textAlign: "center" }}>Ouvintes</span>
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
                {artistas.map((a, index) => (
                    <Box
                        key={a.id}
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: gridColumns,
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
                            {a.nome || '–'}
                        </Typography>

                        {/* Email */}
                        <Typography sx={{ color: "#ccc" }}>{a.email || '–'}</Typography>

                        {/* País */}
                        <Typography sx={{ color: "#ccc" }}>{a.pais || '–'}</Typography>

                        {/* Estado */}
                        <Typography sx={{ color: "#ccc" }}>{a.estado || '–'}</Typography>

                        {/* Cidade */}
                        <Typography sx={{ color: "#ccc" }}>{a.cidade || '–'}</Typography>

                        {/* Seguidores */}
                        <Typography sx={{ color: "#ccc", textAlign: "center" }}>
                            {formatNumber(a.quantSeguidores)}
                        </Typography>

                        {/* Telefone */}
                        <Typography sx={{ color: "#ccc" }}>{a.telefone || '–'}</Typography>

                        {/* Ouvintes */}
                        <Typography sx={{ color: "#ccc", textAlign: "center" }}>
                            {formatNumber(a.quant_ouvintes)}
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