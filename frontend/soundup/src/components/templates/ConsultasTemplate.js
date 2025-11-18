// src/components/templates/ConsultasTemplate.js
import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from "@mui/material";

const estadosBR = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const PRIMARY_PURPLE = '#7E57C2';
const PAPER_BACKGROUND = '#1E1E1E';

const COLUMN_HEADERS_MAP = {
    "musicas": {
        "musica": "Música",
        "duracao": "Duração (s)",
        "artista": "Nome do Artista",
        "pais": "País do Artista"
    },
    "ranking-artistas": {
        "artista": "Artista",
        "quant_ouvintes": "Quantidade de ouvintes",
        "duracao_media": "Média de duração"
    },
    "musicas-por-estado": {
        "artista": "Artista",
        "total_musicas": "Total de músicas"
    },
    "ranking-paises": {
        "pais": "País",
        "total_artistas": "Total de Artistas"
    },
    "duracao-por-album": {
        "albumId": "#",
        "albumNome": "Nome do álbum",
        "duracaoTotalSegundos": "Duração total em segundos"
    },
    "artistas-independentes": {
        "nome": "Artista"
    },
    "colaboracoes-por-artista": {
        "nomeArtista": "Artista",
        "papel": "Papel",
        "totalColaboracoes": "Total de colaborações"
    },
    "musica-e-genero": {
        "musica": "Música",
        "genero": "Gênero"
    }
};


export default function ConsultasTemplate({
                                              consultaSelecionada,
                                              setConsultaSelecionada,
                                              duracao,
                                              setDuracao,
                                              pais,
                                              setPais,
                                              estado,
                                              setEstado,
                                              executarConsulta,
                                              loading,
                                              resultado
                                          }) {
    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
                borderColor: PRIMARY_PURPLE,
            },
        },
    };

    const tableStyles = {
        mt: 2,
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        backgroundColor: PAPER_BACKGROUND
    };


    const getDisplayTitle = (columnKey) => {
        const currentMap = COLUMN_HEADERS_MAP[consultaSelecionada];
        return (currentMap && currentMap[columnKey]) ? currentMap[columnKey] : columnKey;
    };


    return (
        <Box sx={{ mt: 3, p: 3, borderRadius: "12px" }}>
            <Typography variant="h5" sx={{ mb: 3, color: "#fff", fontWeight: "bold" }}>
                Consultas gerais
            </Typography>
            <Box>
                {/* Seletor de consulta */}
                <FormControl fullWidth sx={{ mb: 2, ...inputStyles }}>
                    <InputLabel id="consulta-label">Consulta</InputLabel>
                    <Select
                        labelId="consulta-label"
                        value={consultaSelecionada}
                        label="Consulta"
                        onChange={e => setConsultaSelecionada(e.target.value)}
                    >
                        <MenuItem value="musicas">Músicas por duração e país</MenuItem>
                        <MenuItem value="ranking-artistas">Ranking de artistas</MenuItem>
                        <MenuItem value="musicas-por-estado">Contagem de músicas por estado</MenuItem>
                        <MenuItem value="ranking-paises">Ranking de países</MenuItem>

                        <MenuItem value="duracao-por-album">Duração por álbum</MenuItem>
                        <MenuItem value="artistas-independentes">Artistas Independentes</MenuItem>
                        <MenuItem value="colaboracoes-por-artista">Colaborações por artista</MenuItem>
                        <MenuItem value="musica-e-genero">Música e Gênero</MenuItem>
                    </Select>
                </FormControl>
                {/* Inputs dinâmicos (Resto do código omitido para brevidade, sem alterações) */}
                {consultaSelecionada === "musicas" && (
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            label="Duração mínima (segundos)"
                            type="number"
                            value={duracao}
                            onChange={e => setDuracao(Number(e.target.value))}
                            sx={inputStyles}
                        />
                        <TextField
                            label="País"
                            value={pais}
                            onChange={e => setPais(e.target.value)}
                            sx={inputStyles}
                        />
                    </Box>
                )}

                {consultaSelecionada === "musicas-por-estado" && (
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <FormControl fullWidth sx={inputStyles}>
                            <InputLabel id="estado-label">Estado</InputLabel>
                            <Select
                                labelId="estado-label"
                                value={estado}
                                label="Estado"
                                onChange={e => setEstado(e.target.value)}
                            >
                                {estadosBR.map(e => (
                                    <MenuItem key={e} value={e}>{e}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}

                {/* Botão */}
                <Button
                    variant="contained"
                    onClick={executarConsulta}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? "Carregando..." : "Executar Consulta"}
                </Button>

                {/* Resultado */}
                {resultado.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                            Resultado
                        </Typography>

                        <TableContainer
                            component={Paper}
                            sx={{
                                borderRadius: "12px",
                                backgroundColor: PAPER_BACKGROUND,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {Object.keys(resultado[0]).map((col, idx) => (
                                            <TableCell
                                                key={idx}
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "#fff",
                                                    backgroundColor: "#1E1E1E"
                                                }}
                                            >
                                                {getDisplayTitle(col)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {resultado.map((row, idx) => (
                                        <TableRow
                                            key={idx}
                                            sx={{
                                                backgroundColor: "#222",
                                                borderBottom: "1px solid #333",
                                                "&:last-child td": { borderBottom: 0 }
                                            }}
                                        >
                                            {Object.values(row).map((val, i) => (
                                                <TableCell key={i} sx={{ color: "#ddd" }}>
                                                    {val}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
