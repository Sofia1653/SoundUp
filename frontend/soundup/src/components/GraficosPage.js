import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia
} from '@mui/material';
// Importando o banner para consistência de layout
import banner from "../banner/graficos.png";

// Array com os nomes dos arquivos das imagens
const relatoriosImagens = [
    'grafico1.jpeg',
    'grafico2.jpeg',
    'grafico3.jpeg',
    'grafico4.jpeg',
    'grafico5.jpeg',
    'grafico6.jpeg',
    'grafico7.jpeg',
    'grafico8.jpeg',
    'grafico9.jpeg',
    'grafico10.jpeg',
    'grafico11.jpeg',
    'grafico12.jpeg',
    'grafico13.jpeg',
    'grafico14.jpeg',
];

const GraficosPage = () => {
    return (
        <Box>
            {/* BANNER ADICIONADO AQUI */}
            <img
                src={banner}
                alt="Banner de Gráficos"
                style={{
                    borderRadius: "20px",
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "20px"
                }}
            />
            {/* O conteúdo da página será envolto em um Box/Container para o restante do layout */}

            <Container maxWidth="lg" sx={{ py: 2 }}>

                {/* GRID DE GRÁFICOS */}
                <Grid container spacing={4} justifyContent="center">
                    {relatoriosImagens.map((imagem, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                // Mantendo o estilo de sombra/card
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                                backgroundColor: '#1E1E1E', // Dando um fundo mais escuro para o card, similar ao padrão da lista
                                borderRadius: '8px'
                            }}>
                                <CardMedia
                                    component="img"
                                    image={`/${imagem}`}
                                    alt={`grafico ${index + 1}`}
                                    sx={{
                                        objectFit: 'contain',
                                        p: 2
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default GraficosPage;