import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getArtistas, deleteArtista } from "../services/artistaService";
import ArtistaForm from "./ArtistaForm";
import ArtistaListTemplate from "./templates/ArtistaListTemplate";
import banner from "../banner/artistas.png";

export default function ArtistaList() {
    const [artistas, setArtistas] = useState([]);
    const [editingArtista, setEditingArtista] = useState(null);

    const fetchArtistas = () => {
        getArtistas()
            .then(data => {
                if (Array.isArray(data)) {
                    setArtistas(data);
                } else if (data && data.content) {
                    setArtistas(data.content);
                } else {
                    setArtistas([]);
                }
            })
            .catch(err => {
                console.error("Erro ao buscar artistas:", err);
                setArtistas([]);
            });
    };

    useEffect(() => {
        fetchArtistas();
    }, []);

    const handleDelete = (id) => {
        deleteArtista(id).then(fetchArtistas);
    };

    const handleCreatedOrUpdated = () => {
        fetchArtistas();
        setEditingArtista(null);
    };

    const handleEditClick = (artista) => {
        setEditingArtista(artista);
    };

    const handleCancelEdit = () => {
        setEditingArtista(null);
    };

    return (
        <Box>
            {/* BANNER */}
            <img
                src={banner} // Certifique-se de que o caminho 'banner' esteja correto
                alt="Banner Artista"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />

            {/* TÍTULO DINÂMICO */}
            <Typography variant="h5" component="h2" gutterBottom>
                {editingArtista ? "Editar Artista" : "Criar Artista"}
            </Typography>

            {/* FORMULÁRIO DE ARTISTA */}
            <Box sx={{ mb: 4 }}>
                <ArtistaForm
                    onCreated={handleCreatedOrUpdated}
                    editingArtista={editingArtista}
                    onCancelEdit={handleCancelEdit}
                />
            </Box>

            {/* LISTA DE ARTISTAS */}
            {/* Removi o título extra "Lista de Artistas" daqui, pois ele já está no template */}
            <ArtistaListTemplate
                artistas={artistas}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}