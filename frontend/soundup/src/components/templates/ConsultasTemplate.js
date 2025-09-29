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
  Paper
} from "@mui/material";

const estadosBR = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

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
  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}>
      {/* Seletor de consulta */}
      <FormControl fullWidth sx={{ mb: 2 }}>
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
        </Select>
      </FormControl>

      {/* Inputs dinâmicos */}
      {consultaSelecionada === "musicas" && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Duração mínima (segundos)"
            type="number"
            value={duracao}
            onChange={e => setDuracao(Number(e.target.value))}
          />
          <TextField
            label="País"
            value={pais}
            onChange={e => setPais(e.target.value)}
          />
        </Box>
      )}

      {consultaSelecionada === "musicas-por-estado" && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl fullWidth>
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
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(resultado[0]).map((col, idx) => (
                  <TableCell key={idx}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultado.map((row, idx) => (
                <TableRow key={idx}>
                  {Object.values(row).map((val, i) => (
                    <TableCell key={i}>{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
