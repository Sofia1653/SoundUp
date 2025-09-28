// src/services/artistaService.js
const API_URL = "http://localhost:8080/api/artistas";

// GET all artistas
export async function getArtistas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar artistas");
  return res.json();
}

// POST - criar artista
export async function createArtista(artista) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista),
  });

  if (!res.ok) throw new Error("Erro ao criar artista");

  // Evita erro se backend não retorna JSON
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// PUT - atualizar artista
export async function updateArtista(id, artista) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista),
  });
  if (!res.ok) throw new Error("Erro ao atualizar artista");
  return res.json();
}

// DELETE - remover artista
export async function deleteArtista(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar artista");
  return res.text(); // Spring retorna vazio normalmente
}