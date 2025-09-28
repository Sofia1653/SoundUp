import React from "react";
import { Button, TextField, Box } from "@mui/material";

export default function MusicaFormTemplate({
                                               musica,
                                               handleChange,
                                               handleSubmit,
                                               editingMusica,
                                               onCancelEdit
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
                    />
                    <TextField
                        label="Duração (segundos)"
                        name="duracao"
                        type="number"
                        value={musica.duracao ?? ""}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Box>

                {/* Buttons row */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button variant="contained" color="primary" type="submit">
                        {editingMusica ? "Atualizar" : "Adicionar"}
                    </Button>
                    {editingMusica && onCancelEdit && (
                        <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
                            Cancelar
                        </Button>
                    )}
                </Box>
            </Box>
        </form>
    );
}
