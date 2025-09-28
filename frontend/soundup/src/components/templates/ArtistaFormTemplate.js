import React from "react";
import { Button, TextField, Box } from "@mui/material";

export default function ArtistaFormTemplate({ 
  artista, 
  handleChange, 
  handleSubmit, 
  editingArtista, 
  onCancelEdit 
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* First row - Nome and Email */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Nome"
            name="nome"
            value={artista.nome}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={artista.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        {/* Second row - Senha and País */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Senha"
            name="senha"
            type="password"
            value={artista.senha}
            onChange={handleChange}
            fullWidth
            required={!editingArtista}
          />
          <TextField
            label="País"
            name="pais"
            value={artista.pais}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Third row - Estado and Cidade */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Estado"
            name="estado"
            value={artista.estado}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Cidade"
            name="cidade"
            value={artista.cidade}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Fourth row - Seguidores and Telefone */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Quant Seguidores"
            name="quantSeguidores"
            type="number"
            value={artista.quantSeguidores ?? 0}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={artista.telefone}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Fifth row - Ouvintes (full width) */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Quant Ouvintes"
            name="quant_ouvintes"
            type="number"
            value={artista.quant_ouvintes ?? 0}
            onChange={handleChange}
            fullWidth
          />
          {/* Empty space to maintain layout */}
          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />
        </Box>

        {/* Buttons row */}
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="contained" color="primary" type="submit">
            {editingArtista ? "Atualizar" : "Adicionar"}
          </Button>
          {editingArtista && onCancelEdit && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
              Cancelar
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}
