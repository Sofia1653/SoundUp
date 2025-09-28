import React, { useState } from "react";
import { createUsuario } from "../services/usuarioService";
import UsuarioFormTemplate from "./UsuarioFormTemplate";

export default function UsuarioForm({ onCreated }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    pais: "",
    estado: "",
    cidade: "",
    quantSeguidores: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...usuario,
      quantSeguidores: usuario.quantSeguidores ? Number(usuario.quantSeguidores) : 0
    };

    try {
      const createdUsuario = await createUsuario(payload);
      console.log("Usuario criado:", createdUsuario);

      // limpa form
      setUsuario({
        nome: "", email: "", senha: "", pais: "", estado: "",
        cidade: "", quantSeguidores: "", telefone: ""
      });

      if (onCreated) onCreated(createdUsuario); // atualiza lista no parent
    } catch (err) {
      console.error("Failed to create usuario:", err);
    }
  };

  return <UsuarioFormTemplate usuario={usuario} handleChange={handleChange} handleSubmit={handleSubmit} />;
}