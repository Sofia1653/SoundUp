import React, { useEffect, useState } from "react";
import { getQuantidadeMusicas, getArtistas } from "../services/artistaService";
import MusicasCountTemplate from "./MusicasCountTemplate";
import {
    Box,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel
} from "@mui/material";

export default function MusicasCount() {
    const [idArtista, setIdArtista] = useState("");
    const [qtd, setQtd] = useState(null);
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        getArtistas().then(setArtistas);
    }, []);

    useEffect(() => {
        if (!idArtista) return;

        getQuantidadeMusicas(idArtista)
            .then((data) => setQtd(data))
            .catch(() => setQtd(0));
    }, [idArtista]);

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            borderRadius: "8px",
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#7E57C2" }
        },
        "& .MuiInputLabel-root": {
            color: "#ccc"
        }
    };

    return (
        <Box sx={{ mt: 3, p: 3, borderRadius: "12px" }}>

            <Typography variant="h5" sx={{ mb: 3, color: "#fff", fontWeight: "bold" }}>
                Consultar músicas lançadas
            </Typography>

            {/* SELECT PADRONIZADO */}
            <FormControl fullWidth sx={{ mb: 3, ...inputStyles }}>
                <InputLabel id="artista-label">Selecione um artista</InputLabel>

                <Select
                    labelId="artista-label"
                    value={idArtista}
                    label="Selecione um artista"
                    onChange={(e) => setIdArtista(e.target.value)}
                >
                    {artistas.map((a) => (
                        <MenuItem key={a.id} value={a.id}>
                            {a.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* RESULTADO */}
            {idArtista && <MusicasCountTemplate quantidade={qtd} />}
        </Box>
    );
}
