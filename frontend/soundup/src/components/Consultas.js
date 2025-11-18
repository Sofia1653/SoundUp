// src/components/Consultas.js
import React, { useState } from "react";
import { Box } from "@mui/material"; // Importando Box para envolver o conteúdo
import ConsultasTemplate from "./templates/ConsultasTemplate";
import banner from "../banner/consultas.png";

import {
    musicasPorDuracaoEPais,
    rankingArtistas,
    contagemMusicasPorEstado,
    rankingPaises,
    duracaoPorAlbum,
    artistasIndependentes,
    colaboracoesPorArtista,
    musicaEGenero
} from "../services/consultaService";

export default function Consultas() {
    const [consultaSelecionada, setConsultaSelecionada] = useState("musicas");
    const [duracao, setDuracao] = useState(180);
    const [pais, setPais] = useState("Brazil");
    const [estado, setEstado] = useState("SP");
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState([]);

    const executarConsulta = async () => {
        setLoading(true);
        try {
            let data = [];
            switch (consultaSelecionada) {
                case "musicas":
                    data = await musicasPorDuracaoEPais(duracao, pais);
                    break;
                case "ranking-artistas":
                    data = await rankingArtistas();
                    break;
                case "musicas-por-estado":
                    data = await contagemMusicasPorEstado(estado);
                    break;
                case "ranking-paises":
                    data = await rankingPaises();
                    break;

                case "duracao-por-album":
                    data = await duracaoPorAlbum();
                    break;
                case "artistas-independentes":
                    data = await artistasIndependentes();
                    break;
                case "colaboracoes-por-artista":
                    data = await colaboracoesPorArtista();
                    break;
                case "musica-e-genero":
                    data = await musicaEGenero();
                    break;

                default:
                    data = [];
            }

            setResultado(data);
        } catch (error) {
            console.error(error);
            setResultado([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {/* BANNER ADICIONADO AQUI */}
            <img
                src={banner}
                alt="Banner de Consultas"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />
            {/* FIM DO BANNER */}

            <ConsultasTemplate
                consultaSelecionada={consultaSelecionada}
                setConsultaSelecionada={setConsultaSelecionada}
                duracao={duracao}
                setDuracao={setDuracao}
                pais={pais}
                setPais={setPais}
                estado={estado}
                setEstado={setEstado}
                executarConsulta={executarConsulta}
                loading={loading}
                resultado={resultado}
            />
        </Box>
    );
}