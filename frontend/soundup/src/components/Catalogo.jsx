// src/components/Catalogo.jsx
import React, { useEffect, useState } from "react";
import { getCatalogo } from "../services/consultaService";
import CatalogoTemplate from "./CatalogoTemplate";

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

    return <CatalogoTemplate data={catalogo} />;
}
