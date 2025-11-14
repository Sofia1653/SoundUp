import React, { useState, useEffect } from "react";
import { createAlbum, updateAlbum } from "../services/albumService";
import AlbumFormTemplate from "./templates/AlbumFormTemplate";

export default function AlbumForm({ onCreated, editingAlbum, onCancelEdit }) {
    const [album, setAlbum] = useState({ id: 0, nome: "", ano: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingAlbum) {
            setAlbum({
                id: editingAlbum.id,
                nome: editingAlbum.nome,
                ano: editingAlbum.ano
            });
        } else {
            setAlbum({ id: 0, nome: "", ano: "" });
        }
    }, [editingAlbum]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingAlbum) {
                await updateAlbum(album.id, album);
            } else {
                await createAlbum(album);
            }

            if (onCreated) onCreated();
            if (editingAlbum && onCancelEdit) onCancelEdit();

            if (!editingAlbum) {
                setAlbum({ id: 0, nome: "", ano: "" });
            }

        } catch (error) {
            console.error("Erro ao salvar álbum:", error);
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(AlbumFormTemplate, {
        album,
        handleChange,
        handleSubmit,
        editingAlbum,
        onCancelEdit,
        loading
    });
}
