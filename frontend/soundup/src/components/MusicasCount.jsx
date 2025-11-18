import React, { useEffect, useState } from "react";
import { getQuantidadeMusicas, getArtistas } from "../services/artistaService";
import MusicasCountTemplate from "./MusicasCountTemplate";
import { Box, MenuItem, Select, Typography } from "@mui/material";

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

    return (
        <Box sx={{ padding: "20px", color: "#fff" }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Consultar músicas lançadas</Typography>

            <Select
                value={idArtista}
                onChange={(e) => setIdArtista(e.target.value)}
                displayEmpty
                sx={{
                    mb: 3,
                    backgroundColor: "#1f1f1f",
                    color: "#fff",
                    padding: "5px 10px",
                    width: "300px"
                }}
            >
                <MenuItem value="" disabled>Selecione um artista</MenuItem>

                {artistas.map((a) => (
                    <MenuItem key={a.id} value={a.id}>
                        {a.nome}
                    </MenuItem>
                ))}
            </Select>

            {idArtista && <MusicasCountTemplate quantidade={qtd} />}
        </Box>
    );
}