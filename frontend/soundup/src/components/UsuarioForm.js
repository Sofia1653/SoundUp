import React, { useState } from "react";
import { createUsuario } from "../services/usuarioService";

export default function UsuarioForm({ onCreated }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    pais: "",
    estado: "",
    cidade: "",
    quantSeguidores: "", // keep as string for input
    telefone: ""
  });

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert quantSeguidores to number before sending
    const payload = {
      ...usuario,
      quantSeguidores: usuario.quantSeguidores ? Number(usuario.quantSeguidores) : 0
    };

    try {
      await createUsuario(payload);

      // Reset form
      setUsuario({
        nome: "",
        email: "",
        senha: "",
        pais: "",
        estado: "",
        cidade: "",
        quantSeguidores: "",
        telefone: ""
      });

      if (onCreated) onCreated(); // refresh list in parent
    } catch (err) {
      console.error("Failed to create usuario:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Usuario</h2>

      {/* Required fields */}
      <input
        name="nome"
        placeholder="Nome"
        value={usuario.nome}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={usuario.email}
        onChange={handleChange}
        required
      />
      <input
        name="senha"
        placeholder="Senha"
        value={usuario.senha}
        onChange={handleChange}
        required
      />

      {/* Optional fields */}
      <input
        name="pais"
        placeholder="Pais"
        value={usuario.pais}
        onChange={handleChange}
      />
      <input
        name="estado"
        placeholder="Estado"
        value={usuario.estado}
        onChange={handleChange}
      />
      <input
        name="cidade"
        placeholder="Cidade"
        value={usuario.cidade}
        onChange={handleChange}
      />
      <input
        name="quantSeguidores"
        type="number"
        placeholder="Quant Seguidores"
        value={usuario.quantSeguidores}
        onChange={handleChange}
      />
      <input
        name="telefone"
        placeholder="Telefone"
        value={usuario.telefone}
        onChange={handleChange}
      />

      <button type="submit">Add Usuario</button>
    </form>
  );
}
