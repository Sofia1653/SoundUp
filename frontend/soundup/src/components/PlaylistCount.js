import React, { useEffect, useState } from "react";
import { getPlaylists, getQuantidadeMusicasPlaylist } from "../services/playlistService";
// Garante que o arquivo template se chame PlaylistCountTemplate.js
import PlaylistCountTemplate from "./PlaylistCountTemplate";
import {
    Box,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel
} from "@mui/material";

export default function PlaylistCount() {
    const [idPlaylist, setIdPlaylist] = useState("");
    const [qtd, setQtd] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getPlaylists().then(setPlaylists);
    }, []);

    useEffect(() => {
        if (!idPlaylist) return;

        setQtd(null);

        getQuantidadeMusicasPlaylist(idPlaylist)
            .then((data) => setQtd(data))
            .catch(() => setQtd(0));
    }, [idPlaylist]);

    // Estilos (mantidos)
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
                Consultar quantidade de músicas na Playlist
            </Typography>

            <FormControl fullWidth sx={{ mb: 3, ...inputStyles }}>
                <InputLabel id="playlist-label">Selecione uma Playlist</InputLabel>

                <Select
                    labelId="playlist-label"
                    value={idPlaylist}
                    label="Selecione uma Playlist"
                    onChange={(e) => setIdPlaylist(e.target.value)}
                >
                    {playlists.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* CORREÇÃO APLICADA AQUI */}
            {idPlaylist && <PlaylistCountTemplate quantidade={qtd} subject="Música" />}
        </Box>
    );
}