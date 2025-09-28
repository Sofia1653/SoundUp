const API_BASE = 'http://localhost:8080/api';

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

export const createMusica = async (musica) => {
    try {
        const response = await fetch(`${API_BASE}/musicas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(musica),
        });
        if (!response.ok) throw new Error('Failed to create musica');
        return await response.json();
    } catch (error) {
        console.error('Error creating musica:', error);
        throw error;
    }
};

// NEW: Create music with artist
export const createMusicaComArtista = async (musica, artistaId) => {
    try {
        const response = await fetch(`${API_BASE}/musicas/com-artista?artistaId=${artistaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(musica),
        });
        if (!response.ok) throw new Error('Failed to create musica with artist');
        return await response.json();
    } catch (error) {
        console.error('Error creating musica with artist:', error);
        throw error;
    }
};

// NEW: Get available artists for selection
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

// NEW: Associate existing music with artist
export const associarMusicaComArtista = async (musicaId, artistaId) => {
    try {
        const response = await fetch(`${API_BASE}/musicas/${musicaId}/artistas/${artistaId}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to associate music with artist');
        return await response.text();
    } catch (error) {
        console.error('Error associating music with artist:', error);
        throw error;
    }
};

// NEW: Remove association between music and artist
export const removerAssociacaoMusicaArtista = async (musicaId, artistaId) => {
    try {
        const response = await fetch(`${API_BASE}/musicas/${musicaId}/artistas/${artistaId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to remove association');
        return await response.text();
    } catch (error) {
        console.error('Error removing association:', error);
        throw error;
    }
};

export const updateMusica = async (id, musica) => {
    try {
        const response = await fetch(`${API_BASE}/musicas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(musica),
        });
        if (!response.ok) throw new Error('Failed to update musica');
        return await response.json();
    } catch (error) {
        console.error('Error updating musica:', error);
        throw error;
    }
};

export const deleteMusica = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/musicas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete musica');
        return true;
    } catch (error) {
        console.error('Error deleting musica:', error);
        throw error;
    }
};
