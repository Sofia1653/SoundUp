import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import UsuarioForm from "./UsuarioForm";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

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
    <div>
      <UsuarioForm 
        onCreated={handleCreatedOrUpdated} 
        editingUsuario={editingUsuario} 
        onCancelEdit={handleCancelEdit} 
      />
      <h2>Usuarios</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Quant Seguidores</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.nome}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.estado}</TableCell>
                <TableCell>{u.cidade}</TableCell>
                <TableCell>{u.quantSeguidores}</TableCell>
                <TableCell>{u.telefone}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditClick(u)}>Editar</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(u.id)} style={{ marginLeft: 8 }}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}