import React, { useEffect, useState } from "react";
import { createMusica, updateMusica, createMusicaComArtista, getAvailableArtistas } from "../services/musicaService";
import MusicaFormTemplate from "./templates/MusicaFormTemplate";
import { getAlbuns } from "../services/albumService";

export default function MusicaForm({ onCreated, editingMusica, onCancelEdit }) {
  const [musica, setMusica] = useState({ id: 0, nome: "", duracao: 0 });
  const [artistas, setArtistas] = useState([]);
  const [selectedArtistaId, setSelectedArtistaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [albuns, setAlbuns] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  useEffect(() => {
    const fetchAlbuns = async () => {
      try {
        const data = await getAlbuns();
        setAlbuns(data || []);
      } catch (err) {
        console.error("Erro ao carregar álbuns:", err);
        setAlbuns([]);
      }
    };
    fetchAlbuns();
  }, []);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const artistasList = await getAvailableArtistas();
        setArtistas(artistasList || []);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        setArtistas([]);
      }
    };
    fetchArtistas();
  }, []);

  useEffect(() => {
    if (editingMusica) {
      setMusica({
        id: Number(editingMusica.id) || 0,
        nome: editingMusica.nome || "",
        duracao: Number(editingMusica.duracao) || 0
      });

      if (editingMusica.artistas && editingMusica.artistas.length > 0) {
        setSelectedArtistaId(editingMusica.artistas[0].id.toString());
      } else {
        setSelectedArtistaId("");
      }
    } else {
      setMusica({ id: 0, nome: "", duracao: 0 });
      setSelectedArtistaId("");
    }
  }, [editingMusica]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setMusica(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleArtistaChange = (e) => {
    setSelectedArtistaId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingMusica) {
        // Atualiza música
        await updateMusica(musica.id, musica);
      } else {
        // Cria nova música
        if (selectedArtistaId) {
          await createMusicaComArtista(musica, selectedArtistaId);
        } else {
          await createMusica(musica);
        }
      }

      if (onCreated) onCreated();
      if (editingMusica && onCancelEdit) onCancelEdit();

      // Reset form para criação futura
      if (!editingMusica) {
        setMusica({ id: 0, nome: "", duracao: 0 });
        setSelectedArtistaId("");
      }

    } catch (error) {
      console.error("Erro ao salvar música:", error);
    } finally {
      setLoading(false);
    }
  };


  return React.createElement(MusicaFormTemplate, {
    musica,
    artistas,
    albuns,
    selectedArtistaId,
    handleChange,
    handleArtistaChange,
    handleSubmit,
    editingMusica,
    onCancelEdit,
    loading
  });
}
