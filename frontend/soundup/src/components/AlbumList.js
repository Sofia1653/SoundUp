import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAlbuns, deleteAlbum } from "../services/albumService";
import AlbumForm from "./AlbumForm";
import AlbumListTemplate from "./templates/AlbumListTemplate";
import banner from "../banner/albuns.png";

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
                {editingAlbum ? "Editar Álbum" : "Criar Álbum"}
            </Typography>

            {/* FORMULÁRIO DE ÁLBUM */}
            <Box sx={{ mb: 4 }}>
                <AlbumForm
                    onCreated={handleCreatedOrUpdated}
                    editingAlbum={editingAlbum}
                    onCancelEdit={handleCancelEdit}
                />
            </Box>

            {/* LISTA DE ÁLBUNS */}
            <AlbumListTemplate
                albuns={albuns}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}
