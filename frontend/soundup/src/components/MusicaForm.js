import React, { useEffect, useState } from "react";
import { createMusica, updateMusica } from "../services/musicaService";
import MusicaFormTemplate from "./templates/MusicaFormTemplate";

export default function MusicaForm({ onCreated, editingMusica, onCancelEdit }) {
    const [musica, setMusica] = useState({
        id_versao: 0,
        nome: "",
        duracao: 0
    });

    // Preenche quando for edição
    useEffect(() => {
        if (editingMusica) {
            setMusica({
                ...editingMusica,
                id_versao: Number(editingMusica.id_versao) || 0,
                duracao: Number(editingMusica.duracao) || 0
            });
        }
    }, [editingMusica]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setMusica((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMusica) {
                await updateMusica(musica.id, musica);
                onCreated();
                if (onCancelEdit) onCancelEdit();
            } else {
                const createdMusica = await createMusica(musica);
                onCreated(createdMusica);
            }

            // Reset se não estiver editando
            if (!editingMusica) {
                setMusica({
                    id_versao: 0,
                    nome: "",
                    duracao: 0
                });
            }
        } catch (err) {
            console.error("Falha ao salvar música:", err);
        }
    };

    return React.createElement(MusicaFormTemplate, {
        musica,
        handleChange,
        handleSubmit,
        editingMusica,
        onCancelEdit
    });
}
