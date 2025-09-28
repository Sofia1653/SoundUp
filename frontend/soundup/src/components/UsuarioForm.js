import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { createUsuario, updateUsuario } from "../services/usuarioService";

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
    } catch (err) {
      console.error("Falha ao salvar usuário:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nome" name="nome" value={usuario.nome} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" name="email" type="email" value={usuario.email} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Senha" name="senha" type="password" value={usuario.senha} onChange={handleChange} fullWidth required={!editingUsuario} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Pais" name="pais" value={usuario.pais} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Estado" name="estado" value={usuario.estado} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Cidade" name="cidade" value={usuario.cidade} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Quant Seguidores" name="quantSeguidores" type="number" value={usuario.quantSeguidores ?? 0} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Telefone" name="telefone" value={usuario.telefone} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {editingUsuario ? "Atualizar" : "Adicionar"}
          </Button>
          {editingUsuario && onCancelEdit && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit} style={{ marginLeft: 8 }}>
              Cancelar
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}