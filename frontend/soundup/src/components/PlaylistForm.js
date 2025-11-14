import React, { useEffect, useState } from "react";
import { createPlaylist, updatePlaylist } from "../services/playlistService";

export default function PlaylistForm({ onCreated, editingPlaylist, onCancelEdit }) {

    const [playlist, setPlaylist] = useState({
        id: 0,
        id_ouvinte: 0,
        visibilidade: "",
        nome: ""
    });

    useEffect(() => {
        if (editingPlaylist) {
            setPlaylist({
                id: Number(editingPlaylist.id) || 0,
                id_ouvinte: Number(editingPlaylist.id_ouvinte) || 0,
                visibilidade: editingPlaylist.visibilidade || "",
                nome: editingPlaylist.nome || ""
            });
        } else {
            setPlaylist({ id: 0, id_ouvinte: 0, visibilidade: "", nome: "" });
        }
    }, [editingPlaylist]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingPlaylist) {
                await updatePlaylist(playlist.id, playlist);
            } else {
                await createPlaylist(playlist);
            }

            if (onCreated) onCreated();
            if (editingPlaylist && onCancelEdit) onCancelEdit();

            setPlaylist({ id: 0, id_ouvinte: 0, visibilidade: "", nome: "" });

        } catch (error) {
            console.error("Erro ao salvar playlist:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
                type="text"
                name="nome"
                placeholder="Nome da playlist"
                value={playlist.nome}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="id_ouvinte"
                placeholder="ID do ouvinte"
                value={playlist.id_ouvinte}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="visibilidade"
                placeholder="Visibilidade (publica/privada)"
                value={playlist.visibilidade}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {editingPlaylist ? "Atualizar Playlist" : "Criar Playlist"}
            </button>

            {editingPlaylist && (
                <button type="button" onClick={onCancelEdit} style={{ marginTop: 10 }}>
                    Cancelar edição
                </button>
            )}
        </form>
    );
}
