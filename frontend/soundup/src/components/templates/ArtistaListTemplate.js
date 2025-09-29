import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

export default function ArtistaListTemplate({ artistas, handleDelete, handleEditClick }) {
  if (!artistas || artistas.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum artista encontrado
        </Typography>
      </Box>
    );
  }

  return (
      <TableContainer component={Paper} sx={{
        mt: 2,
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#1E1E1E'
      }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1E1E1E' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>País</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Cidade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Seguidores</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Ouvintes</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artistas.map(a => (
              <TableRow
                  key={a.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(126, 87, 194, 0.2)', // 20% do roxo principal
                      cursor: 'pointer' // Opcional: para dar feedback visual de que o item é interativo
                    }
                  }}
              >
              <TableCell>{a.nome || '-'}</TableCell>
              <TableCell>{a.email || '-'}</TableCell>
              <TableCell>{a.pais || '-'}</TableCell>
              <TableCell>{a.estado || '-'}</TableCell>
              <TableCell>{a.cidade || '-'}</TableCell>
              <TableCell align="center">
                {a.quantSeguidores !== null && a.quantSeguidores !== undefined 
                  ? a.quantSeguidores.toLocaleString() 
                  : '-'
                }
              </TableCell>
              <TableCell>{a.telefone || '-'}</TableCell>
              <TableCell align="center">
                {a.quant_ouvintes !== null && a.quant_ouvintes !== undefined 
                  ? a.quant_ouvintes.toLocaleString() 
                  : '-'
                }
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleEditClick(a)}
                    sx={{ minWidth: '70px' }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(a.id)}
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