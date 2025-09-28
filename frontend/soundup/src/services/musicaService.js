const API_URL = "http://localhost:8080/api/musicas"

export async function getMusicas(){
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Erro ao buscar músicas");
    return res.json();
}
export async function createMusica(musica){
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(musica)
    });
    if(!res.ok) throw new Error("Erro ao criar música");
    try{
       return await res.json();
    } catch{
        return null;
    }
}
export const updateMusica = async (id, musica) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musica),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
};

export async function deleteMusica(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao deletar musica");
    return res.text(); // Spring retorna vazio normalmente
}