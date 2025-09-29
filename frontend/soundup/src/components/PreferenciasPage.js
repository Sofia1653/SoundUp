import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar o axios para chamadas de API

// Importações de Material UI
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

// --- Componentes Placeholder para a rota principal ---
const PlaceholderCard = ({ title, data }) => (
    <Card
        sx={{
          mb: 2,
          p: 2,
          bgcolor: PAPER_BACKGROUND,
          borderLeft: `5px solid ${PRIMARY_PURPLE}`,
        }}
    >
      <CardContent>
        <Typography
            variant="h6"
            color="primary"
            sx={{ mb: 1, fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data}
        </Typography>
      </CardContent>
    </Card>
);

const UsuarioList = () => (
    <PlaceholderCard
        title="Usuários Cadastrados (Simulado)"
        data="Listagem de 100 usuários ativos. Conectado ao backend para CRUD de usuários."
    />
);

const ArtistaList = () => (
    <PlaceholderCard
        title="Artistas Populares (Simulado)"
        data="Artistas mais ouvidos: Drake, Marília Mendonça, The Weeknd. [Dados do BD]"
    />
);

const MusicaList = () => (
    <PlaceholderCard
        title="Músicas em Destaque (Simulado)"
        data="Músicas mais curtidas: Love Tastes, Calma, Flower. [Dados do BD]"
    />
);

const Consultas = () => (
    <PlaceholderCard
        title="Consultas SQL (Simulado)"
        data="Endpoints de consulta ativos: /api/consulta/top-generos, /api/consulta/usuarios-por-regiao."
    />
);

// --- Componente PreferenciasPage (Pesquisa e Gráficos) ---
const CHART_COLORS = [
  "#7E57C2", // PRIMARY_PURPLE
  "#5E35B1", // Tom de roxo mais escuro
  "#9575CD", // Tom intermediário
  "#B39DDB", // Tom claro
  "#D1C4E9", // Tom bem claro
  "#4527A0", // Tom de roxo mais escuro para contraste
];

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

  const [plataformaData, setPlataformaData] = useState({
    labels: [],
    datasets: [],
  });

  const [todosDiasData, setTodosDiasData] = useState({
    labels: [],
    datasets: [],
  });

  const [mediaHorasData, setMediaHorasData] = useState({
    labels: [],
    datasets: [],
  });

  const [humorData, setHumorData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchWithBackoff = async (url, options, maxRetries = 3) => {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const response = await axios.get(url, options); // Usando axios para a requisição GET
        return response;
      } catch (error) {
        console.error(`Tentativa ${attempt + 1} falhou para ${url}:`, error);
        if (attempt === maxRetries - 1) throw error;
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      }
    }
  };

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await fetchWithBackoff(
          "http://localhost:8080/api/preferencias/dados-grafico"
      );

      const data = response.data;

      if (data && Object.keys(data).length > 0) {
        const plataformaLabels = Object.keys(data.plataformas);
        const plataformaValues = Object.values(data.plataformas);
        const defaultBarColors = plataformaValues.map(
            (_, index) => CHART_COLORS[index % CHART_COLORS.length]
        );
        setPlataformaData({
          labels: plataformaLabels,
          datasets: [
            {
              label: "Número de usuários",
              data: plataformaValues,
              backgroundColor: defaultBarColors,
              borderColor: defaultBarColors.map((color) => color),
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        });

        const todosDiasLabels = Object.keys(data.todos_dias);
        const todosDiasValues = Object.values(data.todos_dias);
        setTodosDiasData({
          labels: todosDiasLabels,
          datasets: [
            {
              label: "Frequência",
              data: todosDiasValues,
              backgroundColor: [PRIMARY_PURPLE, "#4A148C"],
              borderColor: PAPER_BACKGROUND,
              borderWidth: 3,
            },
          ],
        });

        const mediaHorasLabels = Object.keys(data.media_horas);
        const mediaHorasValues = Object.values(data.media_horas);
        setMediaHorasData({
          labels: mediaHorasLabels,
          datasets: [
            {
              label: "Número de usuários",
              data: mediaHorasValues,
              backgroundColor: mediaHorasValues.map(
                  (_, index) => CHART_COLORS[index % CHART_COLORS.length]
              ),
              borderColor: mediaHorasValues.map(
                  (_, index) => CHART_COLORS[index % CHART_COLORS.length]
              ),
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        });

        const filteredHumorData = Object.entries(data.humor)
            .filter(([key, value]) => key && key.trim() !== '' && value > 0)
            .sort((a, b) => b[1] - a[1]); // Opcional: ordenar por valor para melhor visualização

        const humorLabels = filteredHumorData.map(([key, value]) => key);
        const humorValues = filteredHumorData.map(([key, value]) => value);

        setHumorData({
          labels: humorLabels,
          datasets: [
            {
              label: "Respostas",
              data: humorValues,
              backgroundColor: [
                PRIMARY_PURPLE,
                "#9575CD",
                "#B39DDB",
                "#D1C4E9",
                "#424242",
              ],
              borderColor: PAPER_BACKGROUND,
              borderWidth: 3,
            },
          ],
        });
      } else {
        setPlataformaData({
          labels: ["Sem Dados"],
          datasets: [{ data: [1], backgroundColor: ["#424242"], label: "Sem dados" }],
        });
        setTodosDiasData({
          labels: ["Sem Dados"],
          datasets: [{ data: [1], backgroundColor: ["#424242"], label: "Sem dados" }],
        });
        setMediaHorasData({
          labels: ["Sem Dados"],
          datasets: [{ data: [1], backgroundColor: ["#424242"], label: "Sem dados" }],
        });
        setHumorData({
          labels: ["Sem Dados"],
          datasets: [{ data: [1], backgroundColor: ["#424242"], label: "Sem dados" }],
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados para os gráficos:", error);
      setMessage({
        type: "error",
        text: "Erro ao carregar dados dos gráficos. Verifique o console.",
      });
    } finally {
      setLoading(false);
    }
  };

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
    if (!formData.todos_dias || !formData.plataforma) {
      setMessage({
        type: "error",
        text: "Por favor, preencha pelo menos as duas primeiras perguntas (1 e 2)!",
      });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post("http://localhost:8080/api/preferencias", formData); // Usando axios para o POST
      setMessage({
        type: "success",
        text: "Respostas enviadas com sucesso! Atualizando gráficos...",
      });
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
      await fetchChartData();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setMessage({
        type: "error",
        text: "Erro ao enviar respostas. O serviço pode estar indisponível.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkTheme.palette.text.primary,
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        titleColor: PRIMARY_PURPLE,
        bodyColor: darkTheme.palette.text.primary,
      },
    },
  };

  const barOptions = {
    ...chartOptionsBase,
    plugins: { ...chartOptionsBase.plugins, legend: { display: false } },
    scales: {
      x: {
        grid: { color: "#333" },
        ticks: { color: darkTheme.palette.text.secondary },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#333" },
        ticks: { color: darkTheme.palette.text.secondary, stepSize: 1 },
      },
    },
  };

  const pieOptions = {
    ...chartOptionsBase,
    plugins: { ...chartOptionsBase.plugins, legend: { position: "bottom" } },
  };

  return (
      <Box sx={{ py: 4, minHeight: "100vh", bgcolor: BACKGROUND_DEFAULT }}>
        <Container maxWidth="lg">
          <Typography
              variant="h4"
              component="h2"
              gutterBottom
              align="center"
              sx={{ mb: 4, color: PRIMARY_PURPLE, fontWeight: "bold" }}
          >
            Pesquisa de Preferências Musicais
          </Typography>
          {message.text && (
              <Alert
                  severity={message.type}
                  sx={{ mb: 3, borderRadius: 2 }}
                  onClose={() => setMessage({ type: "", text: "" })}
              >
                {message.text}
              </Alert>
          )}

          <Card sx={{
            mb: 6,
            bgcolor: PAPER_BACKGROUND,
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
          }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth required>
                      <FormLabel>
                        1. Você costuma ouvir música todos os dias?
                      </FormLabel>
                      <RadioGroup
                          row
                          name="todos_dias"
                          value={formData.todos_dias}
                          onChange={handleChange}
                      >
                        <FormControlLabel
                            value="Sim"
                            control={<Radio />}
                            label="Sim"
                        />
                        <FormControlLabel
                            value="Não"
                            control={<Radio />}
                            label="Não"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ bgcolor: "#333" }} />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth required>
                      <FormLabel>2. Qual plataforma você mais utiliza?</FormLabel>
                      <RadioGroup
                          name="plataforma"
                          value={formData.plataforma}
                          onChange={handleChange}
                      >
                        <Grid container spacing={1}>
                          {[
                            "Spotify",
                            "Youtube Music",
                            "Deezer",
                            "Apple Music",
                            "Amazon Music",
                            "Youtube (vídeos)",
                            "Rádio",
                          ].map((label) => (
                              <Grid item xs={12} sm={6} md={4} key={label}>
                                <FormControlLabel
                                    value={label}
                                    control={<Radio />}
                                    label={label}
                                />
                              </Grid>
                          ))}
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ bgcolor: "#333" }} />
                  </Grid>

                  {[
                    {
                      name: "tipo_playlist",
                      label: "3. Que tipo de playlist você prefere?",
                      options: ["Playlists pessoais (Minhas favoritas)", "Playlists prontas"],
                    },
                    {
                      name: "media_horas",
                      label: "4. Em média, quantas horas por dia você ouve música?",
                      options: ["Menos de 1 hora", "De 1 a 2 horas", "De 2 a 3 horas", "Mais de 4 horas"],
                    },
                    {
                      name: "humor",
                      label: "5. A música influencia seu humor?",
                      options: ["Com certeza sim", "Provavelmente sim", "Talvez", "Provavelmente não", "Com certeza não"],
                    },
                    {
                      name: "horario_dia",
                      label: "6. Em qual horário do dia você mais ouve música?",
                      options: ["Manhã", "Tarde", "Noite", "Madrugada"],
                    },
                    {
                      name: "concentracao",
                      label: "7. Você acha que música ajuda a melhorar a concentração?",
                      options: ["Sim", "Não"],
                    },
                    {
                      name: "locomocao",
                      label: "8. Você ouve músicas durante a locomoção diária?",
                      options: ["Sim", "Não"],
                    },
                    {
                      name: "tipo_musica",
                      label: "9. Qual tipo de música você mais ouve?",
                      options: ["Internacional", "Nacional"],
                    },
                    {
                      name: "musica_dormir",
                      label: "10. Você ouve música para dormir?",
                      options: ["Sim, uso todo dia", "Sim, algumas vezes", "Nunca usei"],
                    },
                    {
                      name: "momentos_vida",
                      label: "11. Você associa músicas a momentos da sua vida?",
                      options: ["Sim, muitas vezes", "Sim, algumas vezes", "Não"],
                    },
                    {
                      name: "motivacao",
                      label: "12. Você costuma ouvir música para aumentar a motivação?",
                      options: ["Sim", "Não"],
                    },
                    {
                      name: "polemicas",
                      label: "13. Você já parou de ouvir um artista por alguma polêmica?",
                      options: ["Sim", "Não"],
                    },
                  ].map((item, index) => (
                      <React.Fragment key={item.name}>
                        <Grid item xs={12}>
                          <FormControl component="fieldset" fullWidth>
                            <FormLabel>{item.label}</FormLabel>
                            <RadioGroup
                                row
                                name={item.name}
                                value={formData[item.name]}
                                onChange={handleChange}
                            >
                              {item.options.map((option) => (
                                  <FormControlLabel
                                      key={option}
                                      value={option.replace(/ \(.*\)/, "")}
                                      control={<Radio />}
                                      label={option}
                                  />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {index < 10 && (
                            <Grid item xs={12}>
                              <Divider sx={{ bgcolor: "#333" }} />
                            </Grid>
                        )}
                      </React.Fragment>
                  ))}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                    >
                      {submitting ? (
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress size={20} sx={{ mr: 1, color: "#fff" }} />
                            Enviando...
                          </Box>
                      ) : (
                          "Enviar Respostas"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          <Box sx={{ p: 3, borderRadius: 3, bgcolor: PAPER_BACKGROUND, mb: 4 }}>
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                align="center"
                sx={{ mb: 4, color: PRIMARY_PURPLE, fontWeight: "bold" }}
            >
              📊 Análise dos Dados da Pesquisa
            </Typography>
            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="300px"
                    color="text.secondary"
                >
                  <CircularProgress color="primary" />
                  <Typography sx={{ ml: 2 }}>
                    Carregando dados dos gráficos...
                  </Typography>
                </Box>
            ) : (
                <Grid container spacing={4} alignItems="stretch">
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{ height: "100%", bgcolor: BACKGROUND_DEFAULT }}>
                      <CardContent>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom
                            color="primary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                          🎵 Plataformas Mais Utilizadas
                        </Typography>
                        <Box
                            sx={{
                              height: "250px",
                              width: "100%",
                            }}
                        >
                          <Bar data={plataformaData} options={barOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{ height: "100%", bgcolor: BACKGROUND_DEFAULT }}>
                      <CardContent>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom
                            color="primary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                          📅 Frequência Diária de Música
                        </Typography>
                        <Box
                            sx={{
                              height: "250px",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                        >
                          <Pie data={todosDiasData} options={pieOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{ height: "100%", bgcolor: BACKGROUND_DEFAULT }}>
                      <CardContent>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom
                            color="primary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                          ⏲️ Média de Horas de Música por Dia
                        </Typography>
                        <Box
                            sx={{
                              height: "250px",
                              width: "100%",
                            }}
                        >
                          <Bar data={mediaHorasData} options={barOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card sx={{ height: "100%", bgcolor: BACKGROUND_DEFAULT }}>
                      <CardContent>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom
                            color="primary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                          🧘 Influência da Música no Humor
                        </Typography>
                        <Box
                            sx={{
                              height: "250px",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                        >
                          <Pie data={humorData} options={pieOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
            )}
          </Box>
        </Container>
      </Box>
  );
}

export default PreferenciasPage;