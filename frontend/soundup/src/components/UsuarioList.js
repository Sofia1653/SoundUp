// UsuarioList.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material"; // Updated imports
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import UsuarioForm from "./UsuarioForm";
import UsuarioListTemplate from "./templates/UsuarioListTemplate";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUsuario, setEditingUsuario] = useState(null);

  const fetchUsuarios = () => {
    getUsuarios()
      .then(data => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else if (data && data.content) {
          setUsuarios(data.content);
        } else {
          setUsuarios([]);
        }
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        setUsuarios([]);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = (id) => {
    deleteUsuario(id).then(fetchUsuarios);
  };

  const handleCreatedOrUpdated = () => {
    fetchUsuarios();
    setEditingUsuario(null);
  };

  const handleEditClick = (usuario) => {
    setEditingUsuario(usuario);
  };

  const handleCancelEdit = () => {
    setEditingUsuario(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciar Usuários
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <UsuarioForm
          onCreated={handleCreatedOrUpdated}
          editingUsuario={editingUsuario}
          onCancelEdit={handleCancelEdit}
        />
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Lista de Usuários
      </Typography>
      
      <UsuarioListTemplate
        usuarios={usuarios}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
}