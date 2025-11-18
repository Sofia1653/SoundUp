import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getMusicas, deleteMusica } from "../services/musicaService";
import MusicaForm from "./MusicaForm";
import MusicaListTemplate from "./templates/MusicaListTemplate";
import banner from "../banner/musicas.png";

export default function MusicaList() {
    const [musicas, setMusicas] = useState([]);
    const [editingMusica, setEditingMusica] = useState(null);

    const fetchMusicas = () => {
        getMusicas()
            .then(data => {
                if (Array.isArray(data)) setMusicas(data);
                else if (data?.content) setMusicas(data.content);
                else setMusicas([]);
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
        deleteMusica(id).then(() => {
            setMusicas(prev => prev.filter(m => m.id !== id));
        });
    };

    const handleCreatedOrUpdated = (musicaAtualizada) => {
        if (musicaAtualizada) {
            // Atualiza apenas a música editada
            setMusicas(prev =>
                prev.map(m => (m.id === musicaAtualizada.id ? musicaAtualizada : m))
            );
        } else {
            fetchMusicas();
        }
        setEditingMusica(null);
    };

    const handleEditClick = (musica) => {
        setEditingMusica(musica);
    };

    const handleCancelEdit = () => {
        setEditingMusica(null);
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
                {editingMusica ? "Editar Música" : "Criar Música"}
            </Typography>

            {/* FORMULÁRIO */}
            <Box sx={{ mb: 4 }}>
                <MusicaForm
                    onCreated={handleCreatedOrUpdated}
                    editingMusica={editingMusica}
                    onCancelEdit={handleCancelEdit}
                />
            </Box>

            {/* LISTA */}
            <MusicaListTemplate
                musicas={musicas}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}
