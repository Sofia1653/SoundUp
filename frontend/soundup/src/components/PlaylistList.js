import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getPlaylists, deletePlaylist } from "../services/playlistService";
import PlaylistForm from "./PlaylistForm";
import PlaylistListTemplate from "./templates/PlaylistListTemplate";
import banner from "../banner/playlists.png";

export default function PlaylistList() {
    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    const fetchPlaylists = () => {
        getPlaylists()
            .then(data => {
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

    const handleCreatedOrUpdated = () => {
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
        <Box>
            {/* BANNER */}
            <img
                src={banner}
                alt="Logo"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />

            {/* TÍTULO DINÂMICO */}
            <Typography variant="h5" component="h2" gutterBottom>
                {editingPlaylist ? "Editar Playlist" : "Criar Playlist"}
            </Typography>

            {/* FORMULÁRIO */}
            <Box sx={{ mb: 4 }}>
                <PlaylistForm
                    onCreated={handleCreatedOrUpdated}
                    editingPlaylist={editingPlaylist}
                    onCancelEdit={handleCancelEdit}
                />
            </Box>

            {/* LISTA */}
            <PlaylistListTemplate
                playlists={playlists}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}
