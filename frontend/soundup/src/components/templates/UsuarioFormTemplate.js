// components/templates/UsuarioFormTemplate.js
import React from "react";
import { Button, TextField, Stack, Box, Typography } from "@mui/material";

export default function UsuarioFormTemplate({ usuario, handleChange, handleSubmit, isEditing }) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Editar Usuario" : "Add Usuario"}
      </Typography>
      <Stack spacing={2}>
        <TextField label="Nome" name="nome" value={usuario.nome} onChange={handleChange} fullWidth required />
        <TextField label="Email" name="email" value={usuario.email} onChange={handleChange} fullWidth required />
        <TextField label="Senha" name="senha" value={usuario.senha} onChange={handleChange} fullWidth required type="password" />
        <TextField label="Pais" name="pais" value={usuario.pais} onChange={handleChange} fullWidth />
        <TextField label="Estado" name="estado" value={usuario.estado} onChange={handleChange} fullWidth />
        <TextField label="Cidade" name="cidade" value={usuario.cidade} onChange={handleChange} fullWidth />
        <TextField
          label="Quant Seguidores"
          name="quantSeguidores"
          value={usuario.quantSeguidores}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
        />
        <TextField label="Telefone" name="telefone" value={usuario.telefone} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Salvar Alterações" : "Add Usuario"}
        </Button>
      </Stack>
    </Box>
  );
}