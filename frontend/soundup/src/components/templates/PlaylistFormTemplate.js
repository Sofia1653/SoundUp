import React from "react";
import {
    Button, TextField, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

export default function PlaylistFormTemplate({
                                                 playlist,
                                                 handleChange,
                                                 handleSubmit,
                                                 editingPlaylist,
                                                 onCancelEdit,
                                                 loading
                                             }) {

    // Estilos reutilizáveis para os campos de entrada
    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
                borderColor: "#7E57C2", // Cor roxa no hover
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Linha 1: Nome da Playlist e ID do Ouvinte */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
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

                    {/* NOVO CAMPO: ID do Ouvinte - Desativado para edição direta */}
                    <TextField
                        label="ID do Ouvinte"
                        name="id_ouvinte"
                        // O valor será o id_ouvinte existente ou 0 para nova playlist
                        value={playlist.id_ouvinte || 0}
                        onChange={handleChange}
                        fullWidth
                        sx={inputStyles}
                    />
                </Box>

                {/* Linha 2: Visibilidade - Agora com largura total na linha dela */}
                <Box>
                    <FormControl fullWidth sx={inputStyles}>
                        <InputLabel id="visibilidade-label">Visibilidade</InputLabel>
                        <Select
                            labelId="visibilidade-label"
                            name="visibilidade"
                            value={playlist.visibilidade || "publica"}
                            label="Visibilidade"
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <MenuItem value="publica">Pública</MenuItem>
                            <MenuItem value="privada">Privada</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Botões - Alinhados à esquerda */}
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