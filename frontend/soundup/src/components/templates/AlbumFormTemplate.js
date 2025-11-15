import React from "react";
import {
    Button, TextField, Box, CircularProgress
} from "@mui/material";

export default function AlbumFormTemplate({
                                              album,
                                              handleChange,
                                              handleSubmit,
                                              editingAlbum,
                                              onCancelEdit,
                                              loading
                                          }) {
    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
                borderColor: "#7E57C2",
            },
        },
    };

    return React.createElement(
        "form",
        { onSubmit: handleSubmit },
        React.createElement(Box, { sx: { display: "flex", flexDirection: "column", gap: 2 } }, [

            // Nome
            React.createElement(TextField, {
                key: "nome",
                label: "Nome do Álbum",
                name: "nome",
                value: album.nome,
                onChange: handleChange,
                fullWidth: true,
                required: true,
                disabled: loading,
                sx: inputStyles
            }),

            // Ano
            React.createElement(TextField, {
                key: "ano",
                label: "Ano de Lançamento",
                name: "ano",
                type: "number",
                value: album.ano ?? "",
                onChange: handleChange,
                fullWidth: true,
                required: true,
                disabled: loading,
                sx: inputStyles
            }),

            // Botões
            React.createElement(Box, { key: "botoes", sx: { display: "flex", gap: 1, mt: 1 } }, [
                React.createElement(Button, {
                    key: "salvar",
                    variant: "contained",
                    color: "primary",
                    type: "submit",
                    disabled: loading,
                    startIcon: loading ? React.createElement(CircularProgress, { size: 20 }) : null
                }, loading ? "Salvando..." : (editingAlbum ? "Atualizar" : "Adicionar")),

                editingAlbum &&
                React.createElement(Button, {
                    key: "cancelar",
                    variant: "outlined",
                    color: "secondary",
                    onClick: onCancelEdit,
                    disabled: loading
                }, "Cancelar")
            ])
        ])
    );
}
