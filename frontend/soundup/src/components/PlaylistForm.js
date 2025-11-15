import React, { useEffect, useState } from "react";
import { createPlaylist, updatePlaylist, getPlaylistMusicas, getAllMusicas } from "../services/playlistService";
import PlaylistFormTemplate from "./templates/PlaylistFormTemplate";

// O id_ouvinte DEVE ser passado como prop
export default function PlaylistForm({ onCreated, editingPlaylist, onCancelEdit, currentUserId }) {

    const [playlist, setPlaylist] = useState({
        id: 0,
        nome: "",
        visibilidade: "publica",
        id_ouvinte: currentUserId || 0,
        musica_ids: [] // Novo campo para IDs de músicas selecionadas
    });
    const [allMusicas, setAllMusicas] = useState([]); // Todas as músicas disponíveis
    const [loading, setLoading] = useState(false);
    const [musicasLoading, setMusicasLoading] = useState(false);

    // 1. Carregar TODAS as músicas disponíveis
    useEffect(() => {
        setMusicasLoading(true);
        getAllMusicas()
            .then(data => {
                // Assume que data é um array de { id: number, nome: string, artista: string }
                setAllMusicas(Array.isArray(data) ? data : data?.content || []);
            })
            .catch(err => console.error("Erro ao carregar músicas disponíveis:", err))
            .finally(() => setMusicasLoading(false));
    }, []);

    // 2. Carregar músicas da playlist em edição
    useEffect(() => {
        if (editingPlaylist) {
            setPlaylist(prev => ({
                ...prev,
                id: Number(editingPlaylist.id) || 0,
                nome: editingPlaylist.nome || "",
                visibilidade: editingPlaylist.visibilidade || "publica",
                id_ouvinte: editingPlaylist.id_ouvinte || 0,
                // Mantém as músicas antigas como fallback, mas o ideal é carregar:
                musica_ids: [],
            }));

            // Busca os IDs das músicas que JÁ estão nesta playlist
            getPlaylistMusicas(editingPlaylist.id)
                .then(musicasNaPlaylist => {
                    const ids = musicasNaPlaylist.map(m => m.id);
                    setPlaylist(prev => ({ ...prev, musica_ids: ids }));
                })
                .catch(err => console.error("Erro ao carregar músicas da playlist:", err));

        } else {
            // Reseta para a criação
            setPlaylist({ id: 0, nome: "", visibilidade: "publica", id_ouvinte: currentUserId || 0, musica_ids: [] });
        }
    }, [editingPlaylist, currentUserId]);

    // Função genérica de manipulação de mudança
    const handleChange = (e) => {
        const { name, value } = e.target;

        // O Select Múltiplo para músicas retorna um array
        const finalValue = name === 'id_ouvinte' ? Number(value) : value;

        setPlaylist(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const playlistToSave = {
            nome: playlist.nome,
            visibilidade: playlist.visibilidade,
            id_ouvinte: playlist.id_ouvinte,
            // NOVO CAMPO: Lista de IDs de músicas
            musica_ids: playlist.musica_ids,
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
                setPlaylist({ id: 0, nome: "", visibilidade: "publica", id_ouvinte: currentUserId || 0, musica_ids: [] });
            }

        } catch (error) {
            console.error("Erro ao salvar playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(PlaylistFormTemplate, {
        playlist,
        allMusicas, // Passa todas as músicas disponíveis para o template
        handleChange,
        handleSubmit,
        editingPlaylist,
        onCancelEdit,
        loading: loading || musicasLoading
    });
}