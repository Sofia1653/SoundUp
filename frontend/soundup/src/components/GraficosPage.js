import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia
} from '@mui/material';

// Array com os nomes dos arquivos das imagens
const relatoriosImagens = [ // Nome do array alterado
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
        <Box sx={{ bgcolor: '#121212', minHeight: 'calc(100vh - 89px)', py: 4 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    color="white"
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Nossos Gráficos
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {relatoriosImagens.map((imagem, index) => ( // Usando o novo nome do array
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
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