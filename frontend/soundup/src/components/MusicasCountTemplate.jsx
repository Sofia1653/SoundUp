import { Box, Typography, CircularProgress } from "@mui/material";

export default function MusicasCountTemplate({ quantidade }) {
    return (
        <Box sx={{ padding: "10px 0", color: "#fff" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Quantidade de músicas lançadas
            </Typography>

            {quantidade === null ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0fbcf9" }}>
                    {quantidade}
                </Typography>
            )}
        </Box>
    );
}