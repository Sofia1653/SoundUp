// src/services/albumService.js
const API_URL = "http://localhost:8080/api/albuns";

// GET todos os álbuns
export async function getAlbuns() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar álbuns");
    return res.json();
}

// POST - criar álbum
export async function createAlbum(album) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
    });

    if (!res.ok) throw new Error("Erro ao criar álbum");

    try {
        return await res.json(); // caso backend retorne o álbum salvo
    } catch {
        return null; // caso backend retorne vazio
    }
}

// PUT - atualizar álbum
export async function updateAlbum(id, album) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return { success: true }; // sem JSON
}

// DELETE - remover álbum
export async function deleteAlbum(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar álbum");

    return res.text(); // backend normalmente retorna vazio
}

// GET - obter músicas de um álbum
export async function getMusicasDoAlbum(id_album) {
    const res = await fetch(`${API_URL}/${id_album}/musicas`);

    if (!res.ok) throw new Error("Erro ao buscar músicas do álbum");

    return res.json();
}
