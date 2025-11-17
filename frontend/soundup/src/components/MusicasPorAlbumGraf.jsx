import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box
} from "@mui/material";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.font.family = 'Inter, "Helvetica Neue", Arial, sans-serif';

export default function MusicasPorAlbumChart() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/musicas/estatisticas/musicas-por-album")
            .then(res => {
                const labels = res.data.map(item => item.album);
                const values = res.data.map(item => item.quantidade);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Quantidade de Músicas",
                            data: values,
                            backgroundColor: "#7E57C2",  // seu roxo
                            borderRadius: 8,
                        }
                    ]
                });

                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao carregar gráfico:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Card sx={{ backgroundColor: "#1E1E1E", padding: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    🎵 Músicas por Álbum
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: { color: "white" },
                                },
                                title: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    ticks: { color: "white" },
                                },
                                y: {
                                    ticks: { color: "white" },
                                }
                            }
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
}
