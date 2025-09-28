// components/templates/ArtistaListTemplate.js
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

export default function ArtistaListTemplate({ artistas, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Artistas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Seguidores</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ouvintes</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(artistas) && artistas.length > 0 ? (
            artistas.map((a) =>
              a ? (
                <TableRow key={a.id}>
                  <TableCell>{a.nome}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.pais}</TableCell>
                  <TableCell>{a.estado}</TableCell>
                  <TableCell>{a.cidade}</TableCell>
                  <TableCell>{a.quantSeguidores}</TableCell>
                  <TableCell>{a.telefone}</TableCell>
                  <TableCell>{a.quant_ouvintes}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => handleDelete(a.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            )
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                Nenhum artista encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}