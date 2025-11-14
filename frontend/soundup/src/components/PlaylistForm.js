import React, { useEffect, useState } from "react";
// Assumindo que você terá funções de serviço similares às de música
import { createPlaylist, updatePlaylist } from "../services/playlistService";
import PlaylistFormTemplate from "./templates/PlaylistFormTemplate";

// O id_ouvinte DEVE ser passado como prop aqui se for para uma nova criação
export default function PlaylistForm({ onCreated, editingPlaylist, onCancelEdit, currentUserId }) {

    // Incluindo id_ouvinte no estado inicial
    const [playlist, setPlaylist] = useState({
        id: 0,
        nome: "",
        visibilidade: "publica",
        id_ouvinte: currentUserId || 0 // Use o ID do usuário logado se for novo
    });
    const [loading, setLoading] = useState(false);

    // Efeito para carregar dados da playlist ao entrar em modo de edição
    useEffect(() => {
        if (editingPlaylist) {
            setPlaylist({
                id: Number(editingPlaylist.id) || 0,
                nome: editingPlaylist.nome || "",
                visibilidade: editingPlaylist.visibilidade || "publica",
                // Pega o ID do ouvinte da playlist que está sendo editada
                id_ouvinte: editingPlaylist.id_ouvinte || 0,
            });
        } else {
            // Reseta para a criação, usando o ID do usuário logado
            setPlaylist({ id: 0, nome: "", visibilidade: "publica", id_ouvinte: currentUserId || 0 });
        }
    }, [editingPlaylist, currentUserId]); // Dependência em currentUserId adicionada

    // Função genérica de manipulação de mudança
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Adaptação da lógica de salvamento (INCLUINDO ID_OUVINTE)
        const playlistToSave = {
            nome: playlist.nome,
            visibilidade: playlist.visibilidade,
            id_ouvinte: playlist.id_ouvinte, // Garante que o ID do ouvinte é enviado
        };

        try {
            if (editingPlaylist) {
                await updatePlaylist(playlist.id, playlistToSave);
            } else {
                await createPlaylist(playlistToSave);
            }

            if (onCreated) onCreated();
            if (editingPlaylist && onCancelEdit) onCancelEdit();

            // Reset form para criação futura
            if (!editingPlaylist) {
                setPlaylist({ id: 0, nome: "", visibilidade: "publica", id_ouvinte: currentUserId || 0 });
            }

        } catch (error) {
            console.error("Erro ao salvar playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(PlaylistFormTemplate, {
        playlist,
        handleChange,
        handleSubmit,
        editingPlaylist,
        onCancelEdit,
        loading
    });
}