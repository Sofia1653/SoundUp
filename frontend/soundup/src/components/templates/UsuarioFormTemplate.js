import React from "react";
import { Button, TextField, Box } from "@mui/material";

export default function UsuarioFormTemplate({
                                              usuario,
                                              handleChange,
                                              handleSubmit,
                                              editingUsuario,
                                              onCancelEdit,
                                            }) {
  return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* First row - Nome and Email */}
          <Box
              sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
          >
            <TextField
                label="Nome"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={usuario.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
          </Box>

          {/* Second row - Senha and País */}
          <Box
              sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
          >
            <TextField
                label="Senha"
                name="senha"
                type="password"
                value={usuario.senha}
                onChange={handleChange}
                fullWidth
                required={!editingUsuario}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
            <TextField
                label="Pais"
                name="pais"
                value={usuario.pais}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
          </Box>

          {/* Third row - Estado and Cidade */}
          <Box
              sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
          >
            <TextField
                label="Estado"
                name="estado"
                value={usuario.estado}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
            <TextField
                label="Cidade"
                name="cidade"
                value={usuario.cidade}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
          </Box>

          {/* Fourth row - Seguidores and Telefone */}
          <Box
              sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
          >
            <TextField
                label="Quant Seguidores"
                name="quantSeguidores"
                type="number"
                value={usuario.quantSeguidores ?? 0}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
            <TextField
                label="Telefone"
                name="telefone"
                value={usuario.telefone}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#7E57C2",
                    },
                  },
                }}
            />
          </Box>

          {/* Buttons row */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button variant="contained" color="primary" type="submit">
              {editingUsuario ? "Atualizar" : "Adicionar"}
            </Button>
            {editingUsuario && onCancelEdit && (
                <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
                  Cancelar
                </Button>
            )}
          </Box>
        </Box>
      </form>
  );
}