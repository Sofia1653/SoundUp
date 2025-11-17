import { Box } from "@mui/material";

export default function SoundUpContainer({ children }) {
    return (
        <Box
            sx={{
                marginLeft: "240px",
                height: "100vh",
                overflowY: "auto",
                backgroundColor: "#121212",
                color: "white",
                px: 3,
                py: 2,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}
        >
            {children}
        </Box>
    );
}
