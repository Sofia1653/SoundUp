const API_URL = "http://localhost:8080/api/usuarios";

export const getUsuarios = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createUsuario = async (usuario) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return response.json();
};

export const updateUsuario = async (id, usuario) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Don't try to parse JSON from empty response
  return { success: true };
};

export const deleteUsuario = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
