import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function UsuarioListTemplate({ usuarios, handleDelete, handleEditClick }) {
    if (!usuarios || usuarios.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhum usuário encontrado
                </Typography>
            </Box>
        );
    }

    // Colunas: # (60px), Nome (1.5fr), Email (1.5fr), País (1fr), Estado (1fr), Cidade (1fr), Seguidores (1fr), Telefone (1fr), Ações (150px)
    const gridColumns = "60px 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 150px";

    const formatNumber = (num) => {
        return (num !== null && num !== undefined)
            ? num.toLocaleString()
            : '–';
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            {/* TÍTULO */}
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
            >
                Lista de Usuários
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
                {usuarios.map((u, index) => (
                    <Box
                        key={u.id}
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
                            {u.nome || '–'}
                        </Typography>

                        {/* Email */}
                        <Typography sx={{ color: "#ccc" }}>{u.email || '–'}</Typography>

                        {/* País */}
                        <Typography sx={{ color: "#ccc" }}>{u.pais || '–'}</Typography>

                        {/* Estado */}
                        <Typography sx={{ color: "#ccc" }}>{u.estado || '–'}</Typography>

                        {/* Cidade */}
                        <Typography sx={{ color: "#ccc" }}>{u.cidade || '–'}</Typography>

                        {/* Seguidores */}
                        <Typography sx={{ color: "#ccc", textAlign: "center" }}>
                            {formatNumber(u.quantSeguidores)}
                        </Typography>

                        {/* Telefone */}
                        <Typography sx={{ color: "#ccc" }}>{u.telefone || '–'}</Typography>

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
                                onClick={() => handleEditClick(u)}
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
                                onClick={() => handleDelete(u.id)}
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