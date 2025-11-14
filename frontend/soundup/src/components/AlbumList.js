import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAlbuns, deleteAlbum } from "../services/albumService";
import AlbumForm from "./AlbumForm";
import AlbumListTemplate from "./templates/AlbumListTemplate";

export default function AlbumList() {
    const [albuns, setAlbuns] = useState([]);
    const [editingAlbum, setEditingAlbum] = useState(null);

    const fetchAlbuns = () => {
        getAlbuns()
            .then(data => {
                if (Array.isArray(data)) setAlbuns(data);
                else if (data?.content) setAlbuns(data.content);
                else setAlbuns([]);
            })
            .catch(err => {
                console.error("Erro ao buscar álbuns:", err);
                setAlbuns([]);
            });
    };

    useEffect(() => {
        fetchAlbuns();
    }, []);

    const handleDelete = (id) => {
        deleteAlbum(id).then(() => {
            setAlbuns(prev => prev.filter(a => a.id !== id));
        });
    };

    const handleCreatedOrUpdated = () => {
        fetchAlbuns();
        setEditingAlbum(null);
    };

    const handleEditClick = (album) => {
        setEditingAlbum(album);
    };

    const handleCancelEdit = () => {
        setEditingAlbum(null);
    };

    return React.createElement(Box, { sx: { p: 3 } }, [
        React.createElement(Typography, {
            key: "titulo",
            variant: "h4",
            component: "h1",
            gutterBottom: true
        }, "Gerenciar Álbuns"),

        React.createElement(Box, { key: "form", sx: { mb: 4 } },
            React.createElement(AlbumForm, {
                onCreated: handleCreatedOrUpdated,
                editingAlbum,
                onCancelEdit: handleCancelEdit
            })
        ),

        React.createElement(Typography, {
            key: "lista-titulo",
            variant: "h5",
            component: "h2",
            gutterBottom: true
        }, "Lista de Álbuns"),

        React.createElement(AlbumListTemplate, {
            key: "lista",
            albuns,
            handleDelete,
            handleEditClick
        })
    ]);
}
