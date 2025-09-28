import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import UsuarioForm from "./UsuarioForm";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = () => getUsuarios().then(data => setUsuarios(data));

  useEffect(() => {
    getUsuarios()
        .then(data => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
            setUsuarios(data);
        } else if (data && data.content) {
            setUsuarios(data.content);
        } else {
            setUsuarios([]); // fallback
        }
        })
        .catch(err => {
        console.error("Failed to fetch usuarios:", err);
        setUsuarios([]);
        });
    }, []);

  const handleDelete = (id) => {
    deleteUsuario(id).then(fetchUsuarios);
  };

  const handleCreated = (createdUsuario) => {
    setUsuarios(prev => [...prev, createdUsuario]);
  };

  return (
    <div>
      <UsuarioForm onCreated={handleCreated} />
      <h2>Usuários</h2>
      <ul>
          {(Array.isArray(usuarios) ? usuarios : []).map(u => (
              <li key={u.id}>
              {u.nome} ({u.estado})
              <button onClick={() => handleDelete(u.id)}>Delete</button>
              </li>
          ))}
        </ul>
    </div>
  );
}