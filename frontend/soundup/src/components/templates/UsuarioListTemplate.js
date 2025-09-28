import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography
} from "@mui/material";

export default function UsuarioListTemplate({ usuarios, handleDelete }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Lista de Usuários
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
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.nome}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.pais}</TableCell>
              <TableCell>{u.estado}</TableCell>
              <TableCell>{u.cidade}</TableCell>
              <TableCell>{u.quantSeguidores}</TableCell>
              <TableCell>{u.telefone}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}