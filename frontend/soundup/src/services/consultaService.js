// src/services/consultaService.js
const API_BASE = "http://localhost:8080/api/consultas";

// 1. Musicas por duração e país
export const musicasPorDuracaoEPais = async (duracao, pais) => {
  const res = await fetch(`${API_BASE}/musicas?duracao=${duracao}&pais=${pais}`);
  if (!res.ok) throw new Error("Erro ao buscar músicas por duração e país");
  try {
    return await res.json();
  } catch {
    return [];
  }
};

// 2. Ranking de artistas
export const rankingArtistas = async () => {
  const res = await fetch(`${API_BASE}/ranking-artistas`);
  if (!res.ok) throw new Error("Erro ao buscar ranking de artistas");
  try {
    return await res.json();
  } catch {
    return [];
  }
};

// 3. Contagem de músicas por estado
export const contagemMusicasPorEstado = async (estado) => {
  const res = await fetch(`${API_BASE}/musicas-por-estado?estado=${estado}`);
  if (!res.ok) throw new Error("Erro ao buscar músicas por estado");
  try {
    return await res.json();
  } catch {
    return [];
  }
};

// 4. Ranking de países
export const rankingPaises = async () => {
  const res = await fetch(`${API_BASE}/ranking-paises`);
  if (!res.ok) throw new Error("Erro ao buscar ranking de países");
  try {
    return await res.json();
  } catch {
    return [];
  }
};
