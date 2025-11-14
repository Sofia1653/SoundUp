import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

export default function PlaylistListTemplate({ playlists, handleDelete, handleEditClick }) {

    if (!playlists || playlists.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Nenhuma playlist encontrada
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{
            mt: 2,
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#1E1E1E",
        }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#1E1E1E" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {playlists.map(p => (
                        <TableRow
                            key={p.id}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(126, 87, 194, 0.2)",
                                    cursor: "pointer"
                                }
                            }}
                        >
                            <TableCell>
                                <Typography variant="body2" fontWeight="medium">
                                    {p.nome || "-"}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {p.descricao || "-"}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleEditClick(p)}
                                        sx={{ minWidth: "70px" }}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(p.id)}
                                        sx={{ minWidth: "70px" }}
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
