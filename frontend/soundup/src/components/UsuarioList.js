import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import UsuarioForm from "./UsuarioForm";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = () => getUsuarios().then(setUsuarios);

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

  return (
    <div>
      <UsuarioForm onCreated={fetchUsuarios} />

      <h2>Usuarios</h2>
      <ul>
            {(Array.isArray(usuarios) ? usuarios : []).map(u => (
                <li key={u.id}>
                {u.nome} ({u.email})
                <button onClick={() => handleDelete(u.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  );
}
