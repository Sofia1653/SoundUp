import React, { useEffect, useState } from "react";
import { createArtista, updateArtista } from "../services/artistaService";
import ArtistaFormTemplate from "./templates/ArtistaFormTemplate";

export default function ArtistaForm({ onCreated, editingArtista, onCancelEdit }) {
  const [artista, setArtista] = useState({
    nome: "",
    email: "",
    senha: "",
    pais: "",
    estado: "",
    cidade: "",
    quantSeguidores: 0,
    telefone: "",
    quant_ouvintes: 0
  });

  // Se estiver editando, popula o form
  useEffect(() => {
    if (editingArtista) {
      setArtista({
        ...editingArtista,
        quantSeguidores: Number(editingArtista.quantSeguidores) || 0,
        quant_ouvintes: Number(editingArtista.quant_ouvintes) || 0
      });
    }
  }, [editingArtista]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setArtista(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingArtista) {
        await updateArtista(artista.id, artista);
        onCreated(); // atualiza lista
        if (onCancelEdit) onCancelEdit();
      } else {
        const createdArtista = await createArtista(artista);
        onCreated(createdArtista);
      }
      
      // Reset form only if not editing
      if (!editingArtista) {
        setArtista({
          nome: "",
          email: "",
          senha: "",
          pais: "",
          estado: "",
          cidade: "",
          quantSeguidores: 0,
          telefone: "",
          quant_ouvintes: 0
        });
      }
    } catch (err) {
      console.error("Falha ao salvar artista:", err);
    }
  };

  return (
    <ArtistaFormTemplate
      artista={artista}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      editingArtista={editingArtista}
      onCancelEdit={onCancelEdit}
    />
  );
}
