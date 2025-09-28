// components/templates/ArtistaFormTemplate.js
import React from "react";
import { Button, TextField, Stack, Box, Typography } from "@mui/material";

export default function ArtistaFormTemplate({ artista, handleChange, handleSubmit }) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar Artista
      </Typography>
      <Stack spacing={2}>
        <TextField label="Nome" name="nome" value={artista.nome} onChange={handleChange} fullWidth required />
        <TextField label="Email" name="email" value={artista.email} onChange={handleChange} fullWidth required />
        <TextField label="Senha" name="senha" value={artista.senha} onChange={handleChange} fullWidth required type="password" />
        <TextField label="Pais" name="pais" value={artista.pais} onChange={handleChange} fullWidth />
        <TextField label="Estado" name="estado" value={artista.estado} onChange={handleChange} fullWidth />
        <TextField label="Cidade" name="cidade" value={artista.cidade} onChange={handleChange} fullWidth />
        <TextField label="Quant Seguidores" name="quantSeguidores" value={artista.quantSeguidores} onChange={handleChange} fullWidth type="number" />
        <TextField label="Telefone" name="telefone" value={artista.telefone} onChange={handleChange} fullWidth />
        <TextField label="Quant Ouvintes" name="quant_ouvintes" value={artista.quant_ouvintes} onChange={handleChange} fullWidth type="number" />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </Stack>
    </Box>
  );
}