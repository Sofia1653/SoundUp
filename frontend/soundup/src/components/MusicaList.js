import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getMusicas, deleteMusica } from "../services/musicaService";
import MusicaForm from "./MusicaForm";
import MusicaListTemplate from "./templates/MusicaListTemplate";

export default function MusicaList() {
    const [musicas, setMusicas] = useState([]);
    const [editingMusica, setEditingMusica] = useState(null);

    const fetchMusicas = () => {
        getMusicas()
            .then(data => {
                if (Array.isArray(data)) {
                    setMusicas(data);
                } else if (data && data.content) {
                    setMusicas(data.content);
                } else {
                    setMusicas([]);
                }
            })
            .catch(err => {
                console.error("Erro ao buscar músicas:", err);
                setMusicas([]);
            });
    };

    useEffect(() => {
        fetchMusicas();
    }, []);

    const handleDelete = (id) => {
        deleteMusica(id).then(fetchMusicas);
    };

    const handleCreatedOrUpdated = () => {
        fetchMusicas();
        setEditingMusica(null);
    };

    const handleEditClick = (musica) => {
        setEditingMusica(musica);
    };

    const handleCancelEdit = () => {
        setEditingMusica(null);
    };

    return (
        React.createElement(Box, { sx: { p: 3 } }, [
            React.createElement(
                Typography,
                { key: "titulo", variant: "h4", component: "h1", gutterBottom: true },
                "Gerenciar Músicas"
            ),

            React.createElement(
                Box,
                { key: "form", sx: { mb: 4 } },
                React.createElement(MusicaForm, {
                    onCreated: handleCreatedOrUpdated,
                    editingMusica: editingMusica,
                    onCancelEdit: handleCancelEdit
                })
            ),

            React.createElement(
                Typography,
                { key: "lista-titulo", variant: "h5", component: "h2", gutterBottom: true },
                "Lista de Músicas"
            ),

            React.createElement(MusicaListTemplate, {
                key: "lista",
                musicas: musicas,
                handleDelete: handleDelete,
                handleEditClick: handleEditClick
            })
        ])
    );
}
