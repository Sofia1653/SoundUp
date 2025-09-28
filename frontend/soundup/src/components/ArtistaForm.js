import React, { useState } from "react";
import ArtistaFormTemplate from "./templates/ArtistaFormTemplate";
import { createArtista } from "../services/artistaService";

export default function ArtistaForm({ onCreated }) {
  const [artista, setArtista] = useState({
    nome: "",
    email: "",
    senha: "",
    pais: "",
    estado: "",
    cidade: "",
    quantSeguidores: "",
    telefone: "",
    quant_ouvintes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtista((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...artista,
      quantSeguidores: artista.quantSeguidores ? Number(artista.quantSeguidores) : 0,
      quant_ouvintes: artista.quant_ouvintes ? Number(artista.quant_ouvintes) : 0
    };

    try {
      const createdArtista = await createArtista(payload);
      if (onCreated) onCreated(createdArtista);

      setArtista({
        nome: "",
        email: "",
        senha: "",
        pais: "",
        estado: "",
        cidade: "",
        quantSeguidores: "",
        telefone: "",
        quant_ouvintes: ""
      });
    } catch (err) {
      console.error("Failed to create artista:", err);
    }
  };

  return (
    <ArtistaFormTemplate artista={artista} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}