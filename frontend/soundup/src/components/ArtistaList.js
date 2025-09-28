import React, { useEffect, useState } from "react";
import ArtistaListTemplate from "./templates/ArtistaListTemplate";
import { getArtistas, deleteArtista } from "../services/artistaService";
import ArtistaForm from "./ArtistaForm";

export default function ArtistaList() {
  const [artistas, setArtistas] = useState([]);

  const fetchArtistas = async () => {
    try {
      const data = await getArtistas();
      setArtistas(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error("Failed to fetch artistas:", err);
      setArtistas([]);
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const handleDelete = (id) => {
    deleteArtista(id).then(fetchArtistas);
  };

  const handleCreated = (createdArtista) => {
    if (!createdArtista) return;
    setArtistas((prev) => [...prev, createdArtista]);
  };

  return (
    <div>
      
      <ArtistaForm onCreated={handleCreated} />
      <ArtistaListTemplate artistas={artistas} handleDelete={handleDelete} />
    </div>
  );
}