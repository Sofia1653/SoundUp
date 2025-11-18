import { Box, Typography, CircularProgress } from "@mui/material";

export default function PlaylistCountTemplate({ quantidade, subject = "Música" }) {
    // Determina se deve ser plural ou singular
    const label = quantidade === 1 ? subject : `${subject}s`;

    return (
        <Box sx={{ mt: 2, color: "#fff", textAlign: "center" }}>
            {quantidade === null ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        color: "#7E57C2",
                        mt: 1
                    }}
                >
                    {quantidade}
                </Typography>
            )}

            <Typography size={14} sx={{ mb: 1 }}>
                {label} na playlist
            </Typography>
        </Box>
    );
}