import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar o axios para chamadas de API

import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Container,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Grid,
    Card,
    CardContent,
    Box,
    Alert,
    CircularProgress,
    Divider,
} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PRIMARY_PURPLE = "#7E57C2";
const SECONDARY_GREEN = "#1DB954";
const BACKGROUND_DEFAULT = "#121212";
const PAPER_BACKGROUND = "#1E1E1E";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: PRIMARY_PURPLE,
        },
        secondary: {
            main: SECONDARY_GREEN,
        },
        background: {
            default: BACKGROUND_DEFAULT,
            paper: PAPER_BACKGROUND,
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B0B0B0",
        },
    },
    typography: {
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    padding: "12px 24px",
                    fontWeight: 700,
                    "&:hover": {
                        backgroundColor: PRIMARY_PURPLE,
                        boxShadow: "0 0 15px 3px rgba(126, 87, 194, 0.5)",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: PRIMARY_PURPLE,
                    fontWeight: "bold",
                    marginBottom: "8px",
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: PRIMARY_PURPLE,
                    "&.Mui-checked": {
                        color: PRIMARY_PURPLE,
                    },
                },
            },
        },
    },
});