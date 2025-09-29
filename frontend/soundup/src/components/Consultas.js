// src/components/Consultas.js
import React, { useState } from "react";
import ConsultasTemplate from "./templates/ConsultasTemplate";
import {
  musicasPorDuracaoEPais,
  rankingArtistas,
  contagemMusicasPorEstado,
  rankingPaises
} from "../services/consultaService";

export default function Consultas() {
  const [consultaSelecionada, setConsultaSelecionada] = useState("musicas");
  const [duracao, setDuracao] = useState(180);
  const [pais, setPais] = useState("Brasil");
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
  );
}
