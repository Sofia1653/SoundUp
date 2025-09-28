import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

export default function MusicaListTemplate({ musicas, handleDelete, handleEditClick }) {
    if (!musicas || musicas.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhuma música encontrada
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
                        <TableCell sx={{ fontWeight: 'bold' }}>Duração (s)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID Versão</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {musicas.map(m => (
                        <TableRow
                            key={m.id}
                            sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                        >
                            <TableCell>{m.nome || '-'}</TableCell>
                            <TableCell>
                                {m.duracao !== null && m.duracao !== undefined
                                    ? m.duracao
                                    : '-'
                                }
                            </TableCell>
                            <TableCell>{m.id_versao || '-'}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleEditClick(m)}
                                        sx={{ minWidth: '70px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(m.id)}
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
