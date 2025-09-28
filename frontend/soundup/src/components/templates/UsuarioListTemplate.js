import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

export default function UsuarioListTemplate({ usuarios, handleDelete, handleEditClick }) {
  if (!usuarios || usuarios.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum usuário encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>País</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Cidade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Seguidores</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map(u => (
            <TableRow 
              key={u.id} 
              sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
            >
              <TableCell>{u.nome || '-'}</TableCell>
              <TableCell>{u.email || '-'}</TableCell>
              <TableCell>{u.pais || '-'}</TableCell>
              <TableCell>{u.estado || '-'}</TableCell>
              <TableCell>{u.cidade || '-'}</TableCell>
              <TableCell align="center">
                {u.quantSeguidores !== null && u.quantSeguidores !== undefined 
                  ? u.quantSeguidores.toLocaleString() 
                  : '-'
                }
              </TableCell>
              <TableCell>{u.telefone || '-'}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleEditClick(u)}
                    sx={{ minWidth: '70px' }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(u.id)}
                    sx={{ minWidth: '70px' }}
                  >
                    Excluir
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}