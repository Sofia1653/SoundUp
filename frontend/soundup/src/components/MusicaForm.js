import React, { useEffect, useState } from "react";
import { createMusica, updateMusica, createMusicaComArtista, getAvailableArtistas } from "../services/musicaService";
import MusicaFormTemplate from "./templates/MusicaFormTemplate";

export default function MusicaForm({ onCreated, editingMusica, onCancelEdit }) {
    const [musica, setMusica] = useState({
        id_versao: 0,
        nome: "",
        duracao: 0
    });

    const [artistas, setArtistas] = useState([]);
    const [selectedArtistaId, setSelectedArtistaId] = useState("");
    const [loading, setLoading] = useState(false);

    // Load available artists on component mount
    useEffect(() => {
        const fetchArtistas = async () => {
            try {
                const artistasList = await getAvailableArtistas();
                setArtistas(artistasList || []);
            } catch (error) {
                console.error("Error fetching artists:", error);
                setArtistas([]);
            }
        };

        fetchArtistas();
    }, []);

    // Preenche quando for edição
    useEffect(() => {
        if (editingMusica) {
            setMusica({
                ...editingMusica,
                id_versao: Number(editingMusica.id_versao) || 0,
                duracao: Number(editingMusica.duracao) || 0
            });
            // For editing, you might want to set the current artist
            // This would require additional API call to get current artist of the music
        }
    }, [editingMusica]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setMusica((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleArtistaChange = (e) => {
        setSelectedArtistaId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingMusica) {
                // For editing, use the original update method
                await updateMusica(musica.id, musica);
                onCreated();
                if (onCancelEdit) onCancelEdit();
            } else {
                // For creating new music
                if (selectedArtistaId) {
                    // Create music with selected artist
                    const createdMusica = await createMusicaComArtista(musica, parseInt(selectedArtistaId));
                    onCreated(createdMusica);
                } else {
                    // Create music without artist (original method)
                    const createdMusica = await createMusica(musica);
                    onCreated(createdMusica);
                }

                // Reset form
                setMusica({
                    id_versao: 0,
                    nome: "",
                    duracao: 0
                });
                setSelectedArtistaId("");
            }
        } catch (err) {
            console.error("Falha ao salvar música:", err);
            alert("Erro ao salvar música: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(MusicaFormTemplate, {
        musica,
        artistas,
        selectedArtistaId,
        handleChange,
        handleArtistaChange,
        handleSubmit,
        editingMusica,
        onCancelEdit,
        loading
    });
}