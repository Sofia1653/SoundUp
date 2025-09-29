import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography, Chip
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

    const formatDuration = (seconds) => {
        if (!seconds) return '-';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

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
                        <TableCell sx={{ fontWeight: 'bold' }}>Duração</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Artistas</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {musicas.map(m => (
                        <TableRow
                            key={a.id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(126, 87, 194, 0.2)', // 20% do roxo principal
                                    cursor: 'pointer' // Opcional: para dar feedback visual de que o item é interativo
                                }
                            }}
                        >
                            <TableCell>
                                <Typography variant="body2" fontWeight="medium">
                                    {m.nome || '-'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {formatDuration(m.duracao)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    ({m.duracao}s)
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {m.artistas && m.artistas.length > 0 ? (
                                        m.artistas.map((artista, index) => (
                                            <Chip
                                                key={index}
                                                label={artista.nome}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            Nenhum artista
                                        </Typography>
                                    )}
                                </Box>
                            </TableCell>
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