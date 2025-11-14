import React, { useEffect, useState } from "react";
import { getPlaylists, deletePlaylist } from "../services/playlistService";
import PlaylistForm from "./PlaylistForm";

export default function PlaylistList() {

    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    const fetchPlaylists = () => {
        getPlaylists()
            .then(data => {
                if (Array.isArray(data)) setPlaylists(data);
                else if (data?.content) setPlaylists(data.content);
                else setPlaylists([]);
            })
            .catch(err => {
                console.error("Erro ao carregar playlists:", err);
                setPlaylists([]);
            });
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleDelete = (id) => {
        deletePlaylist(id).then(() => {
            setPlaylists(prev => prev.filter(p => p.id !== id));
        });
    };

    const handleCreatedOrUpdated = () => {
        fetchPlaylists();
        setEditingPlaylist(null);
    };

    const handleEditClick = (playlist) => {
        setEditingPlaylist(playlist);
    };

    const handleCancelEdit = () => {
        setEditingPlaylist(null);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Gerenciar Playlists</h2>

            <PlaylistForm
                onCreated={handleCreatedOrUpdated}
                editingPlaylist={editingPlaylist}
                onCancelEdit={handleCancelEdit}
            />

            <h3 style={{ marginTop: 30 }}>Lista de Playlists</h3>

            <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ouvinte</th>
                    <th>Nome</th>
                    <th>Visibilidade</th>
                    <th>Ações</th>
                </tr>
                </thead>

                <tbody>
                {playlists.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.id_ouvinte}</td>
                        <td>{p.nome}</td>
                        <td>{p.visibilidade}</td>
                        <td>
                            <button onClick={() => handleEditClick(p)}>Editar</button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                style={{ marginLeft: 10, color: "red" }}
                            >
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
