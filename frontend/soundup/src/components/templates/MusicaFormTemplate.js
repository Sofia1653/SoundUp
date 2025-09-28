import React from "react";
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";

export default function MusicaFormTemplate({
    musica,
    artistas,
    selectedArtistaId,
    handleChange,
    handleArtistaChange,
    handleSubmit,
    editingMusica,
    onCancelEdit,
    loading
}) {
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* First row - Nome and Duração */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2
                    }}
                >
                    <TextField
                        label="Nome"
                        name="nome"
                        value={musica.nome}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                    />
                    <TextField
                        label="Duração (segundos)"
                        name="duracao"
                        type="number"
                        value={musica.duracao ?? ""}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                    />
                </Box>

                {/* Artist selection row - Only show when creating new music */}
                {!editingMusica && (
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="artista-select-label">Artista (Opcional)</InputLabel>
                            <Select
                                labelId="artista-select-label"
                                value={selectedArtistaId}
                                label="Artista (Opcional)"
                                onChange={handleArtistaChange}
                                disabled={loading}
                            >
                                <MenuItem value="">
                                    <em>Nenhum artista selecionado</em>
                                </MenuItem>
                                {artistas.map((artista) => (
                                    <MenuItem key={artista.id_artista} value={artista.id_artista}>
                                        {artista.nome} ({artista.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}

                {/* Buttons row */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? "Salvando..." : (editingMusica ? "Atualizar" : "Adicionar")}
                    </Button>
                    {editingMusica && onCancelEdit && (
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