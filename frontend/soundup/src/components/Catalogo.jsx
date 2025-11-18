// src/components/Catalogo.jsx
import React, { useEffect, useState } from "react";
import { getCatalogo } from "../services/consultaService";
import CatalogoTemplate from "./CatalogoTemplate";
import banner from "../banner/catalogo.png";
import { Box } from "@mui/material";
import MusicasCount from "./MusicasCount";

export default function Catalogo() {
    const [catalogo, setCatalogo] = useState([]);

    const fetchCatalogo = () => {
        getCatalogo()
            .then((data) => {
                if (Array.isArray(data)) setCatalogo(data);
                else if (data?.content) setCatalogo(data.content);
                else setCatalogo([]);
            })
            .catch((err) => {
                console.error("Erro ao buscar catálogo:", err);
                setCatalogo([]);
            });
    };

    useEffect(() => {
        fetchCatalogo();
    }, []);

    return (
        <Box>
            {/* BANNER IDENTICO AO MODELO */}
            <img
                src={banner}
                alt="Logo"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />

            {/* LISTA */}
            <CatalogoTemplate data={catalogo} />
            <MusicasCount/>
        </Box>
    );
}
