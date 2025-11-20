import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getPlaylists, deletePlaylist } from "../services/playlistService"; // Funções de serviço
import PlaylistForm from "./PlaylistForm";
import PlaylistListTemplate from "./templates/PlaylistListTemplate";

export default function PlaylistList() {
    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    const fetchPlaylists = () => {
        getPlaylists()
            .then(data => {
                // Lógica de manipulação de dados igual à de MusicaList
                if (Array.isArray(data)) setPlaylists(data);
                else if (data?.content) setPlaylists(data.content);
                else setPlaylists([]);
            })
            .catch(err => {
                console.error("Erro ao buscar playlists:", err);
                setPlaylists([]);
            });
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleDelete = (id) => {
        deletePlaylist(id).then(() => {
            setPlaylists(prev => prev.filter(p => p.id !== id));
        });
    };

    const handleCreatedOrUpdated = (playlistAtualizada) => {
        // Para simplificar, sempre busca a lista atualizada após salvar
        fetchPlaylists();
        setEditingPlaylist(null);
    };

    const handleEditClick = (playlist) => {
        setEditingPlaylist(playlist);
    };

    const handleCancelEdit = () => {
        setEditingPlaylist(null);
    };

    return (
        React.createElement(Box, { sx: { p: 3 } }, [
            React.createElement(
                Typography,
                { key: "titulo", variant: "h4", component: "h1", gutterBottom: true },
                "Gerenciar Playlists"
            ),
            React.createElement(
                Box,
                { key: "form", sx: { mb: 4 } },
                React.createElement(PlaylistForm, {
                    onCreated: handleCreatedOrUpdated,
                    editingPlaylist,
                    onCancelEdit: handleCancelEdit
                })
            ),
            React.createElement(
                Typography,
                { key: "lista-titulo", variant: "h5", component: "h2", gutterBottom: true },
                "Lista de Playlists"
            ),
            React.createElement(PlaylistListTemplate, {
                key: "lista",
                playlists,
                handleDelete,
                handleEditClick
            })
        ])
    );
}