const API_BASE = 'http://localhost:8080/api';

// GET - buscar todas as playlists
export const getPlaylists = async () => {
    const response = await fetch(`${API_BASE}/playlist`);
    if (!response.ok) throw new Error('Failed to fetch playlist');
    return response.json();
};

// POST - criar playlist
export const createPlaylist = async (playlist) => {
    const response = await fetch(`${API_BASE}/playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist),
    });

    if (!response.ok) throw new Error('Failed to create playlist');
    try { return await response.json(); } catch { return { success: true }; }
};

// PUT - atualizar playlist
export const updatePlaylist = async (id, playlist) => {
    const response = await fetch(`${API_BASE}/playlist/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playlist)
    });

    if (!response.ok) throw new Error("Erro ao atualizar playlist");
    try { return await response.json(); } catch { return { success: true }; }
};

// DELETE - remover playlist
export const deletePlaylist = async (id) => {
    const response = await fetch(`${API_BASE}/playlist/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Failed to delete playlist");
};

// Músicas
export const getAllMusicas = async () => {
    const response = await fetch(`${API_BASE}/musicas`);
    if (!response.ok) throw new Error("Falha ao buscar músicas");
    const data = await response.json();
    return data.content || data;
};

// Músicas dentro da playlist
export const getPossui = async (playlistId) => {
    const response = await fetch(`${API_BASE}/playlist/${playlistId}/musicas`);
    if (!response.ok) throw new Error("Falha ao buscar músicas da playlist");
    const data = await response.json();
    return data.content || data;
};
