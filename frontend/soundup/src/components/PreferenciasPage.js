import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
    Bar,
    Pie
} from "react-chartjs-2";
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

// Registre os componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function PreferenciasPage() {
    const [formData, setFormData] = useState({
        todos_dias: "",
        plataforma: "",
        tipo_playlist: "",
        media_horas: "",
        humor: "",
        horario_dia: "",
        concentracao: "",
        locomocao: "",
        tipo_musica: "",
        musica_dormir: "",
        momentos_vida: "",
        motivacao: "",
        polemicas: "",
    });

    const [plataformaData, setPlataformaData] = useState({ labels: [], datasets: [] });
    const [todosDiasData, setTodosDiasData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Função para buscar dados dos gráficos
    const fetchChartData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8080/api/preferencias/dados-grafico"
            );
            const data = response.data;

            if (data && data.plataformas && data.todos_dias) {
                // Dados do gráfico de plataformas
                const plataformaLabels = Object.keys(data.plataformas);
                const plataformaValues = Object.values(data.plataformas);

                setPlataformaData({
                    labels: plataformaLabels,
                    datasets: [{
                        label: "Número de usuários",
                        data: plataformaValues,
                        backgroundColor: [
                            "#1DB954", // Spotify verde
                            "#FF0000", // YouTube vermelho
                            "#00C4CC", // Deezer azul
                            "#FFC107", // Apple amarelo
                            "#FF9800", // Amazon laranja
                            "#6200EE", // YouTube roxo
                            "#F44336", // Rádio vermelho escuro
                        ],
                        borderColor: [
                            "#1DB954",
                            "#FF0000",
                            "#00C4CC",
                            "#FFC107",
                            "#FF9800",
                            "#6200EE",
                            "#F44336",
                        ],
                        borderWidth: 2,
                    }],
                });

                // Dados do gráfico de frequência diária
                const todosDiasLabels = Object.keys(data.todos_dias);
                const todosDiasValues = Object.values(data.todos_dias);

                setTodosDiasData({
                    labels: todosDiasLabels,
                    datasets: [{
                        label: "Frequência",
                        data: todosDiasValues,
                        backgroundColor: ["#1DB954", "#F44336"],
                        borderColor: ["#1DB954", "#F44336"],
                        borderWidth: 2,
                    }],
                });
            } else {
                // Dados vazios se não houver respostas
                setPlataformaData({
                    labels: ["Nenhum dado"],
                    datasets: [{
                        data: [1],
                        backgroundColor: ["#e0e0e0"],
                        label: "Sem dados"
                    }]
                });
                setTodosDiasData({
                    labels: ["Nenhum dado"],
                    datasets: [{
                        data: [1],
                        backgroundColor: ["#e0e0e0"],
                        label: "Sem dados"
                    }]
                });
            }
        } catch (error) {
            console.error("Erro ao buscar dados para os gráficos:", error);
            setMessage({
                type: 'error',
                text: 'Erro ao carregar dados dos gráficos'
            });
        } finally {
            setLoading(false);
        }
    };

    // Carregar dados iniciais
    useEffect(() => {
        fetchChartData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!formData.todos_dias || !formData.plataforma) {
            setMessage({
                type: 'error',
                text: 'Por favor, preencha pelo menos as duas primeiras perguntas!'
            });
            return;
        }

        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.post("http://localhost:8080/api/preferencias", formData);

            setMessage({
                type: 'success',
                text: 'Respostas enviadas com sucesso!'
            });

            // Limpar formulário
            setFormData({
                todos_dias: "",
                plataforma: "",
                tipo_playlist: "",
                media_horas: "",
                humor: "",
                horario_dia: "",
                concentracao: "",
                locomocao: "",
                tipo_musica: "",
                musica_dormir: "",
                momentos_vida: "",
                motivacao: "",
                polemicas: "",
            });

            // Atualizar gráficos com novos dados
            await fetchChartData();

        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            setMessage({
                type: 'error',
                text: 'Erro ao enviar respostas. Tente novamente.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                Pesquisa de Preferências Musicais
            </Typography>

            {/* Mensagens de feedback */}
            {message.text && (
                <Alert
                    severity={message.type}
                    sx={{ mb: 3 }}
                    onClose={() => setMessage({ type: '', text: '' })}
                >
                    {message.text}
                </Alert>
            )}

            {/* Formulário Completo */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Pergunta 1 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth required>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        1. Você costuma ouvir música todos os dias?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="todos_dias"
                                        value={formData.todos_dias}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                                        <FormControlLabel value="Não" control={<Radio />} label="Não" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 2 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth required>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        2. Qual plataforma você mais utiliza?
                                    </FormLabel>
                                    <RadioGroup
                                        name="plataforma"
                                        value={formData.plataforma}
                                        onChange={handleChange}
                                    >
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Spotify" control={<Radio />} label="Spotify" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Youtube Music" control={<Radio />} label="Youtube Music" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Deezer" control={<Radio />} label="Deezer" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Apple Music" control={<Radio />} label="Apple Music" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Amazon Music" control={<Radio />} label="Amazon Music" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Youtube" control={<Radio />} label="Youtube (vídeos)" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControlLabel value="Rádio" control={<Radio />} label="Rádio" />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 3 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        3. Que tipo de playlist você prefere?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="tipo_playlist"
                                        value={formData.tipo_playlist}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Minhas favoritas" control={<Radio />} label="Minhas favoritas" />
                                        <FormControlLabel value="Playlists prontas" control={<Radio />} label="Playlists prontas" />
                                        <FormControlLabel value="Álbuns completos" control={<Radio />} label="Álbuns completos" />
                                        <FormControlLabel value="Mix aleatório" control={<Radio />} label="Mix aleatório" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 4 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        4. Em média, quantas horas por dia você ouve música?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="media_horas"
                                        value={formData.media_horas}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Menos de 1 hora" control={<Radio />} label="Menos de 1 hora" />
                                        <FormControlLabel value="1-2 horas" control={<Radio />} label="1-2 horas" />
                                        <FormControlLabel value="2-4 horas" control={<Radio />} label="2-4 horas" />
                                        <FormControlLabel value="Mais de 4 horas" control={<Radio />} label="Mais de 4 horas" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 5 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        5. A música influencia seu humor?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="humor"
                                        value={formData.humor}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Muito" control={<Radio />} label="Muito" />
                                        <FormControlLabel value="Pouco" control={<Radio />} label="Pouco" />
                                        <FormControlLabel value="Nada" control={<Radio />} label="Nada" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 6 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        6. Em qual horário do dia você mais ouve música?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="horario_dia"
                                        value={formData.horario_dia}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Manhã" control={<Radio />} label="Manhã" />
                                        <FormControlLabel value="Tarde" control={<Radio />} label="Tarde" />
                                        <FormControlLabel value="Noite" control={<Radio />} label="Noite" />
                                        <FormControlLabel value="Madrugada" control={<Radio />} label="Madrugada" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 7 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        7. Música ajuda na sua concentração?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="concentracao"
                                        value={formData.concentracao}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Sim, muito" control={<Radio />} label="Sim, muito" />
                                        <FormControlLabel value="Às vezes" control={<Radio />} label="Às vezes" />
                                        <FormControlLabel value="Não, me distrai" control={<Radio />} label="Não, me distrai" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 8 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        8. Quando você mais ouve música durante locomoção?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="locomocao"
                                        value={formData.locomocao}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="No carro" control={<Radio />} label="No carro" />
                                        <FormControlLabel value="Transporte público" control={<Radio />} label="Transporte público" />
                                        <FormControlLabel value="Caminhando" control={<Radio />} label="Caminhando" />
                                        <FormControlLabel value="Não ouço durante locomoção" control={<Radio />} label="Não ouço" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 9 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        9. Qual tipo de música você mais ouve?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="tipo_musica"
                                        value={formData.tipo_musica}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Pop" control={<Radio />} label="Pop" />
                                        <FormControlLabel value="Rock" control={<Radio />} label="Rock" />
                                        <FormControlLabel value="Sertanejo" control={<Radio />} label="Sertanejo" />
                                        <FormControlLabel value="Funk" control={<Radio />} label="Funk" />
                                        <FormControlLabel value="Eletrônica" control={<Radio />} label="Eletrônica" />
                                        <FormControlLabel value="MPB" control={<Radio />} label="MPB" />
                                        <FormControlLabel value="Internacional" control={<Radio />} label="Internacional" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 10 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        10. Você ouve música para dormir?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="musica_dormir"
                                        value={formData.musica_dormir}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Sempre" control={<Radio />} label="Sempre" />
                                        <FormControlLabel value="Às vezes" control={<Radio />} label="Às vezes" />
                                        <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 11 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        11. Em quais momentos da vida a música é mais importante?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="momentos_vida"
                                        value={formData.momentos_vida}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Trabalho/Estudo" control={<Radio />} label="Trabalho/Estudo" />
                                        <FormControlLabel value="Exercícios" control={<Radio />} label="Exercícios" />
                                        <FormControlLabel value="Relaxamento" control={<Radio />} label="Relaxamento" />
                                        <FormControlLabel value="Festas/Social" control={<Radio />} label="Festas/Social" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 12 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        12. Música serve como motivação para você?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="motivacao"
                                        value={formData.motivacao}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Sim, muito motivadora" control={<Radio />} label="Sim, muito motivadora" />
                                        <FormControlLabel value="Às vezes motiva" control={<Radio />} label="Às vezes motiva" />
                                        <FormControlLabel value="Não influencia" control={<Radio />} label="Não influencia" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Pergunta 13 */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                        13. Você evita músicas com conteúdo polêmico?
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="polemicas"
                                        value={formData.polemicas}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Sempre evito" control={<Radio />} label="Sempre evito" />
                                        <FormControlLabel value="Às vezes evito" control={<Radio />} label="Às vezes evito" />
                                        <FormControlLabel value="Não me importo" control={<Radio />} label="Não me importo" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Botão de envio */}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    disabled={submitting}
                                    sx={{ mt: 2, py: 1.5 }}
                                >
                                    {submitting ? (
                                        <>
                                            <CircularProgress size={20} sx={{ mr: 1 }} />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Respostas'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            <Divider sx={{ my: 4 }} />

            {/* Gráficos Dinâmicos */}
            <Box>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ mb: 3 }}>
                    📊 Análise dos Dados da Pesquisa
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                        <CircularProgress />
                        <Typography sx={{ ml: 2 }}>Carregando dados dos gráficos...</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        🎵 Plataformas Mais Utilizadas
                                    </Typography>
                                    <div style={{ height: "350px", width: "100%" }}>
                                        <Bar
                                            data={plataformaData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },
                                                    title: {
                                                        display: false,
                                                    },
                                                },
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        ticks: {
                                                            stepSize: 1,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        📅 Frequência Diária de Música
                                    </Typography>
                                    <div style={{ height: "350px", width: "100%" }}>
                                        <Pie
                                            data={todosDiasData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        position: "bottom",
                                                    },
                                                    title: {
                                                        display: false,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
}

export default PreferenciasPage;