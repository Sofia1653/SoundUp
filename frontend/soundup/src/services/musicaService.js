const API_BASE = 'http://localhost:8080/api';

// GET - buscar todas as músicas
export const getMusicas = async () => {
  try {
    const response = await fetch(`${API_BASE}/musicas`);
    if (!response.ok) throw new Error('Failed to fetch musicas');
    return await response.json();
  } catch (error) {
    console.error('Error fetching musicas:', error);
    throw error;
  }
};

// POST - criar música
export const createMusica = async (musica) => {
  try {
    const response = await fetch(`${API_BASE}/musicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musica),
    });

    if (!response.ok) throw new Error('Failed to create musica');

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error('Error creating musica:', error);
    throw error;
  }
};

// POST - criar música com artista
export const createMusicaComArtista = async (musica, artistaId) => {
  try {
    const response = await fetch(`${API_BASE}/musicas/com-artista?artistaId=${artistaId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musica),
    });

    if (!response.ok) throw new Error('Failed to create musica with artist');

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error('Error creating musica with artist:', error);
    throw error;
  }
};

// GET - buscar artistas disponíveis
export const getAvailableArtistas = async () => {
  try {
    const response = await fetch(`${API_BASE}/musicas/artistas/select`);
    if (!response.ok) throw new Error('Failed to fetch artists');
    return await response.json();
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

// PUT - atualizar música
export const updateMusica = async (id, musica) => {
  if (!id || isNaN(Number(id))) {
    throw new Error(`ID inválido para updateMusica: ${id}`);
  }

  const response = await fetch(`${API_BASE}/musicas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(musica)
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar música: ${response.status}`);
  }

  // Evita erro se backend não retornar JSON
  try {
    return await response.json();
  } catch {
    return { success: true };
  }
};

// DELETE - remover música
export const deleteMusica = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/musicas/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete musica');
    return true; // backend retorna vazio
  } catch (error) {
    console.error('Error deleting musica:', error);
    throw error;
  }
};

// POST - associar música a artista existente
export const associarMusicaComArtista = async (musicaId, artistaId) => {
  try {
    const response = await fetch(`${API_BASE}/musicas/${musicaId}/artistas/${artistaId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to associate music with artist');

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error('Error associating music with artist:', error);
    throw error;
  }
};

// DELETE - remover associação música-artista
export const removerAssociacaoMusicaArtista = async (musicaId, artistaId) => {
  try {
    const response = await fetch(`${API_BASE}/musicas/${musicaId}/artistas/${artistaId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to remove association');

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error('Error removing association:', error);
    throw error;
  }
};
