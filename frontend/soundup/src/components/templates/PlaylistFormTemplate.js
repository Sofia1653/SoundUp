import React from "react";
import {
    Button, TextField, Box, CircularProgress
} from "@mui/material";

export default function PlaylistFormTemplate({
                                                 playlist,
                                                 handleChange,
                                                 handleSubmit,
                                                 editingPlaylist,
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

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Nome da Playlist */}
                <TextField
                    label="Nome da Playlist"
                    name="nome"
                    value={playlist.nome ?? ""}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={loading}
                    sx={inputStyles}
                />

                {/* Descrição */}
                <TextField
                    label="Descrição"
                    name="descricao"
                    value={playlist.descricao ?? ""}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={loading}
                    sx={inputStyles}
                />

                {/* Botões */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading
                            ? "Salvando..."
                            : editingPlaylist
                                ? "Atualizar"
                                : "Adicionar"}
                    </Button>

                    {editingPlaylist && onCancelEdit && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onCancelEdit}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
            </Box>
        </form>
    );
}
