import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material"; // Updated imports
import { getArtistas, deleteArtista } from "../services/artistaService";
import ArtistaForm from "./ArtistaForm";
import ArtistaListTemplate from "./templates/ArtistaListTemplate";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Artistas
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <ArtistaForm
          onCreated={handleCreatedOrUpdated}
          editingArtista={editingArtista}
          onCancelEdit={handleCancelEdit}
        />
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Lista de Artistas
      </Typography>
      
      <ArtistaListTemplate
        artistas={artistas}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
}