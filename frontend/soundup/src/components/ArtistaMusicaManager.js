import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, FormControl, InputLabel, Select, MenuItem,
    Typography, Box, Alert
} from "@mui/material";
import { associarMusicaComArtista, removerAssociacaoMusicaArtista } from "../services/musicaService";

export default function ArtistaMusicaManager({
    open,
    onClose,
    musica,
    artistas,
    onAssociationChange
}) {
    const [selectedArtistaId, setSelectedArtistaId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAssociate = async () => {
        if (!selectedArtistaId || !musica) return;

        setLoading(true);
        try {
            await associarMusicaComArtista(musica.id, parseInt(selectedArtistaId));
            setMessage("Artista associado com sucesso!");
            onAssociationChange();
            setTimeout(() => {
                setMessage("");
                setSelectedArtistaId("");
            }, 2000);
        } catch (error) {
            setMessage("Erro ao associar artista: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveAssociation = async (artistaId) => {
        if (!musica) return;

        setLoading(true);
        try {
            await removerAssociacaoMusicaArtista(musica.id, artistaId);
            setMessage("Associação removida com sucesso!");
            onAssociationChange();
            setTimeout(() => setMessage(""), 2000);
        } catch (error) {
            setMessage("Erro ao remover associação: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Gerenciar Artistas - {musica?.nome}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>

                    {message && (
                        <Alert severity={message.includes("Erro") ? "error" : "success"}>
                            {message}
                        </Alert>
                    )}

                    {/* Current artists */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Artistas Atuais:
                        </Typography>
                        {musica?.artistas && musica.artistas.length > 0 ? (
                            musica.artistas.map(artista => (
                                <Box key={artista.id_artista} sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1,
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: 'grey.300',
                                    borderRadius: 1
                                }}>
                                    <Typography>{artista.nome}</Typography>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleRemoveAssociation(artista.id_artista)}
                                        disabled={loading}
                                    >
                                        Remover
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography color="text.secondary">
                                Nenhum artista associado
                            </Typography>
                        )}
                    </Box>

                    {/* Add new artist */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Adicionar Artista:
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Selecionar Artista</InputLabel>
                            <Select
                                value={selectedArtistaId}
                                label="Selecionar Artista"
                                onChange={(e) => setSelectedArtistaId(e.target.value)}
                                disabled={loading}
                            >
                                {artistas
                                    .filter(artista =>
                                        !musica?.artistas?.some(a => a.id_artista === artista.id_artista)
                                    )
                                    .map(artista => (
                                        <MenuItem key={artista.id_artista} value={artista.id_artista}>
                                            {artista.nome} ({artista.email})
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleAssociate}
                            disabled={!selectedArtistaId || loading}
                            fullWidth
                        >
                            Associar Artista
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}