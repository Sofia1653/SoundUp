import React from "react";
import {
    Button,
    TextField,
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput
} from "@mui/material";

// Estilos do select múltiplo
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 280,
        },
    },
};

export default function PlaylistFormTemplate({
                                                 playlist,
                                                 allMusicas,
                                                 handleChange,
                                                 handleSubmit,
                                                 editingPlaylist,
                                                 onCancelEdit,
                                                 loading
                                             }) {

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": { borderColor: "#7E57C2" }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Linha 1 - Nome + ID Ouvinte */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                    <TextField
                        label="Nome da Playlist"
                        name="nome"
                        value={playlist.nome}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                        sx={inputStyles}
                    />

                    <TextField
                        label="ID do Ouvinte"
                        name="idOuvinte"
                        value={playlist.idOuvinte}
                        onChange={handleChange}
                        fullWidth
                        disabled={loading}
                        sx={inputStyles}
                    />
                </Box>

                {/* Linha 2 - Visibilidade + Músicas */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>

                    {/* Campo Visibilidade */}
                    <FormControl fullWidth sx={inputStyles}>
                        <InputLabel id="visibilidade-label">Visibilidade</InputLabel>
                        <Select
                            labelId="visibilidade-label"
                            name="visibilidade"
                            value={playlist.visibilidade}
                            onChange={handleChange}
                            label="Visibilidade"
                            disabled={loading}
                        >
                            <MenuItem value="publica">Pública</MenuItem>
                            <MenuItem value="privada">Privada</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Campo Seleção de Músicas */}
                    <FormControl fullWidth sx={inputStyles}>
                        <InputLabel id="musicas-label">Músicas da Playlist</InputLabel>
                        <Select
                            labelId="musicas-label"
                            multiple
                            name="musicasIds"
                            value={playlist.musicasIds || []}
                            onChange={handleChange}
                            input={<OutlinedInput label="Músicas da Playlist" />}
                            MenuProps={MenuProps}
                            disabled={loading}
                        >
                            {allMusicas.map((musica) => (
                                <MenuItem key={musica.id} value={musica.id}>
                                    {musica.nome} — {musica.artista || "Desconhecido"}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

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

                    {editingPlaylist && (
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
