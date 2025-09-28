// UsuarioForm.js
import React, { useEffect, useState } from "react";
import { createUsuario, updateUsuario } from "../services/usuarioService";
import UsuarioFormTemplate from "./templates/UsuarioFormTemplate";

export default function UsuarioForm({ onCreated, editingUsuario, onCancelEdit }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    pais: "",
    estado: "",
    cidade: "",
    quantSeguidores: 0,
    telefone: ""
  });

  // Se estiver editando, popula o form
  useEffect(() => {
    if (editingUsuario) {
      setUsuario({
        ...editingUsuario,
        quantSeguidores: Number(editingUsuario.quantSeguidores) || 0
      });
    }
  }, [editingUsuario]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        await updateUsuario(usuario.id, usuario);
        onCreated(); // atualiza lista
        if (onCancelEdit) onCancelEdit();
      } else {
        const createdUsuario = await createUsuario(usuario);
        onCreated(createdUsuario);
      }
      
      // Reset form only if not editing
      if (!editingUsuario) {
        setUsuario({
          nome: "",
          email: "",
          senha: "",
          pais: "",
          estado: "",
          cidade: "",
          quantSeguidores: 0,
          telefone: ""
        });
      }
    } catch (err) {
      console.error("Falha ao salvar usuário:", err);
    }
  };

  return (
    <UsuarioFormTemplate
      usuario={usuario}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      editingUsuario={editingUsuario}
      onCancelEdit={onCancelEdit}
    />
  );
}