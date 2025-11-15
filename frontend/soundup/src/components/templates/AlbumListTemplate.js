import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

export default function AlbumListTemplate({ albuns, handleDelete, handleEditClick }) {

    if (!albuns || albuns.length === 0) {
        return React.createElement(Box, { sx: { textAlign: "center", py: 4 } },
            React.createElement(Typography, { variant: "body1", color: "text.secondary" },
                "Nenhum álbum encontrado"
            )
        );
    }

    return React.createElement(
        TableContainer,
        {
            component: Paper,
            sx: {
                mt: 2,
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#1E1E1E"
            }
        },
        React.createElement(Table, null, [
            React.createElement(TableHead, { key: "thead" },
                React.createElement(TableRow, { sx: { backgroundColor: "#1E1E1E" } }, [
                    React.createElement(TableCell, { key: "nome", sx: { fontWeight: "bold" } }, "Nome"),
                    React.createElement(TableCell, { key: "ano", sx: { fontWeight: "bold" } }, "Ano"),
                    React.createElement(TableCell, { key: "acoes", sx: { fontWeight: "bold" }, align: "center" }, "Ações"),
                ])
            ),

            React.createElement(TableBody, { key: "tbody" },
                albuns.map(a =>
                    React.createElement(TableRow, {
                        key: a.id,
                        sx: {
                            "&:hover": {
                                backgroundColor: "rgba(126, 87, 194, 0.2)",
                                cursor: "pointer"
                            }
                        }
                    }, [
                        React.createElement(TableCell, { key: "nome" }, a.nome),
                        React.createElement(TableCell, { key: "ano" }, a.ano),
                        React.createElement(TableCell, { key: "acoes", align: "center" },
                            React.createElement(Box, { sx: { display: "flex", gap: 1, justifyContent: "center" } }, [
                                React.createElement(Button, {
                                    key: "editar",
                                    variant: "outlined",
                                    size: "small",
                                    onClick: () => handleEditClick(a)
                                }, "Editar"),

                                React.createElement(Button, {
                                    key: "excluir",
                                    variant: "outlined",
                                    color: "error",
                                    size: "small",
                                    onClick: () => handleDelete(a.id)
                                }, "Excluir")
                            ])
                        )
                    ])
                )
            )
        ])
    );
}
