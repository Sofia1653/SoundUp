import React, { useEffect, useState } from "react";
import { getArtistas, deleteArtista } from "../services/artistaService";
import ArtistaForm from "./ArtistaForm";

export default function ArtistaList() {
  const [artistas, setArtistas] = useState([]);

  const fetchArtistas = () => getArtistas().then(setArtistas);

  useEffect(() => {
    getArtistas()
        .then(data => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
            setArtistas(data);
        } else if (data && data.content) {
            setArtistas(data.content);
        } else {
            setArtistas([]); // fallback
        }
        })
        .catch(err => {
        console.error("Failed to fetch Artistas:", err);
        setArtistas([]);
        });
    }, []);

  const handleDelete = (id) => {
    deleteArtista(id).then(fetchArtistas);
  };

  return (
    <div>
      <ArtistaForm onCreated={fetchArtistas} />
      <h2>Artistas</h2>
      <ul>
        {artistas.map(a => (
          <li key={a.id}>
            {a.nome} ({a.email}) - Ouvintes: {a.quant_ouvintes}
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
