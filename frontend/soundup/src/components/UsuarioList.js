// UsuarioList.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import UsuarioForm from "./UsuarioForm";
import UsuarioListTemplate from "./templates/UsuarioListTemplate";
// Importação simulada do banner (ajuste o caminho se necessário)
import banner from "../banner/usuarios.png";

export default function UsuarioList() {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUsuario, setEditingUsuario] = useState(null);

    const fetchUsuarios = () => {
        getUsuarios()
            .then(data => {
                if (Array.isArray(data)) {
                    setUsuarios(data);
                } else if (data && data.content) {
                    setUsuarios(data.content);
                } else {
                    setUsuarios([]);
                }
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err);
                setUsuarios([]);
            });
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleDelete = (id) => {
        deleteUsuario(id).then(fetchUsuarios);
    };

    const handleCreatedOrUpdated = () => {
        fetchUsuarios();
        setEditingUsuario(null);
    };

    const handleEditClick = (usuario) => {
        setEditingUsuario(usuario);
    };

    const handleCancelEdit = () => {
        setEditingUsuario(null);
    };

    return (
        <Box>
            {/* BANNER */}
            <img
                src={banner}
                alt="Banner Usuário"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />

            {/* TÍTULO DINÂMICO */}
            <Typography variant="h5" component="h2" gutterBottom>
                {editingUsuario ? "Editar Usuário" : "Criar Usuário"}
            </Typography>

            {/* FORMULÁRIO DE USUÁRIO */}
            <Box sx={{ mb: 4 }}>
                <UsuarioForm
                    onCreated={handleCreatedOrUpdated}
                    editingUsuario={editingUsuario}
                    onCancelEdit={handleCancelEdit}
                />
            </Box>

            {/* LISTA DE USUÁRIOS */}
            <UsuarioListTemplate
                usuarios={usuarios}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}