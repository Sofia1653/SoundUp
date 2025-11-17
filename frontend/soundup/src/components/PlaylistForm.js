import React, { useEffect, useState } from "react";
import {
    createPlaylist,
    updatePlaylist,
    getPossui,
    getAllMusicas
} from "../services/playlistService";

import PlaylistFormTemplate from "./templates/PlaylistFormTemplate";

export default function PlaylistForm({
                                         onCreated,
                                         editingPlaylist,
                                         onCancelEdit,
                                         currentUserId
                                     }) {

    const [playlist, setPlaylist] = useState({
        id: 0,
        nome: "",
        visibilidade: "publica",
        idOuvinte: currentUserId || 0,
        musicasIds: []
    });

    const [allMusicas, setAllMusicas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [musicasLoading, setMusicasLoading] = useState(false);

    // Carregar todas as músicas disponíveis
    useEffect(() => {
        setMusicasLoading(true);

        getAllMusicas()
            .then(data => {
                // Garantir que é um array
                setAllMusicas(Array.isArray(data) ? data : data?.content || []);
            })
            .catch(err => console.error("Erro ao carregar músicas:", err))
            .finally(() => setMusicasLoading(false));
    }, []);

    // Preencher dados quando está editando
    useEffect(() => {
        if (editingPlaylist) {
            // Preenche os campos básicos imediatamente
            setPlaylist(prev => ({
                ...prev,
                id: Number(editingPlaylist.id),
                nome: editingPlaylist.nome || "",
                visibilidade: editingPlaylist.visibilidade || "publica",
                idOuvinte: editingPlaylist.idOuvinte,
                musicasIds: []
            }));

            // Agora carrega as músicas da playlist
            getPossui(editingPlaylist.id)
                .then(musicas => {
                    const ids = musicas.map(m => m.id);
                    setPlaylist(prev => ({
                        ...prev,
                        musicasIds: ids
                    }));
                })
                .catch(err => console.error("Erro ao carregar músicas da playlist:", err));

        } else {
            // Reset ao entrar no modo criação
            setPlaylist({
                id: 0,
                nome: "",
                visibilidade: "publica",
                idOuvinte: currentUserId || 0,
                musicasIds: []
            });
        }
    }, [editingPlaylist, currentUserId]);

    // Handler genérico
    const handleChange = (e) => {
        const { name, value } = e.target;

        setPlaylist(prev => ({
            ...prev,
            [name]: name === "idOuvinte" ? Number(value) : value
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const playlistToSave = {
            nome: playlist.nome,
            visibilidade: playlist.visibilidade,
            idOuvinte: playlist.idOuvinte,
            musicasIds: playlist.musicasIds
        };

        try {
            if (editingPlaylist) {
                await updatePlaylist(playlist.id, playlistToSave);
            } else {
                await createPlaylist(playlistToSave);
            }

            if (onCreated) onCreated();
            if (editingPlaylist && onCancelEdit) onCancelEdit();

            if (!editingPlaylist) {
                // Reset do formulário
                setPlaylist({
                    id: 0,
                    nome: "",
                    visibilidade: "publica",
                    idOuvinte: currentUserId || 0,
                    musicasIds: []
                });
            }

        } catch (error) {
            console.error("Erro ao salvar playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(PlaylistFormTemplate, {
        playlist,
        allMusicas,
        handleChange,
        handleSubmit,
        editingPlaylist,
        onCancelEdit,
        loading: loading || musicasLoading
    });
}
