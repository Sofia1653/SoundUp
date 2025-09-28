// src/templates/UsuarioFormTemplate.js
import React from "react";
import { Box, Stack, TextField, Button, Paper, Typography } from "@mui/material";

export default function UsuarioFormTemplate({ usuario, handleChange, handleSubmit }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Adicionar Usuário
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nome"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={usuario.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            name="senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={usuario.telefone}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Pais"
              name="pais"
              value={usuario.pais}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Estado"
              name="estado"
              value={usuario.estado}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Cidade"
              name="cidade"
              value={usuario.cidade}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <TextField
            label="Quant. Seguidores"
            name="quantSeguidores"
            type="number"
            value={usuario.quantSeguidores}
            onChange={handleChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Adicionar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}