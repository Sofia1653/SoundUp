const API_BASE = 'http://localhost:8080/api';

// GET - buscar todas as playlists
export const getPlaylists = async () => {
    try {
        const response = await fetch(`${API_BASE}/playlist`);
        if (!response.ok) throw new Error('Failed to fetch playlist');
        return await response.json();
    } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
    }
}

// POST - criar playlist
export const createPlaylist = async (playlist) => {
    try {
        const response = await fetch(`${API_BASE}/playlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlist),
        });

        if (!response.ok) throw new Error('Failed to create playlist');

        try {
            return await response.json();
        } catch {
            return { success: true };
        }
    } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
    }
};

// PUT - atualizar playlist
export const updatePlaylist = async (id, playlist) => {
    if (!id || isNaN(Number(id))) {
        throw new Error(`ID inválido para updatePlaylist: ${id}`);
    }

    const response = await fetch(`${API_BASE}/playlist/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playlist)
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar playlist: ${response.status}`);
    }

    // Evita erro se backend não retornar JSON
    try {
        return await response.json();
    } catch {
        return { success: true };
    }
};

// DELETE - remover playlist
export const deletePlaylist = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/playlist/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete playlist');
        return true; // backend retorna vazio
    } catch (error) {
        console.error('Error deleting playlist:', error);
        throw error;
    }
};
