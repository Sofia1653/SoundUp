import React, { useState } from "react";
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
    setArtista(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...artista,
      quantSeguidores: artista.quantSeguidores ? Number(artista.quantSeguidores) : 0,
      quant_ouvintes: artista.quant_ouvintes ? Number(artista.quant_ouvintes) : 0
    };

    try {
      const createdArtista = await createArtista(payload); // espera JSON do backend
      console.log("Artista criado:", createdArtista);

      setArtista({
        nome: "", email: "", senha: "", pais: "", estado: "",
        cidade: "", quantSeguidores: "", telefone: "", quant_ouvintes: ""
      });

      if (onCreated) onCreated(); // atualiza lista
    } catch (err) {
      console.error("Failed to create artista:", err);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Artista</h2>
      <input name="nome" placeholder="Nome" value={artista.nome} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={artista.email} onChange={handleChange} required />
      <input name="senha" placeholder="Senha" value={artista.senha} onChange={handleChange} required />
      <input name="pais" placeholder="Pais" value={artista.pais} onChange={handleChange} />
      <input name="estado" placeholder="Estado" value={artista.estado} onChange={handleChange} />
      <input name="cidade" placeholder="Cidade" value={artista.cidade} onChange={handleChange} />
      <input name="quantSeguidores" type="number" placeholder="Quant Seguidores" value={artista.quantSeguidores} onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" value={artista.telefone} onChange={handleChange} />
      <input name="quant_ouvintes" type="number" placeholder="Quant Ouvintes" value={artista.quant_ouvintes} onChange={handleChange} />
      <button type="submit">Add Artista</button>
    </form>
  );
}
