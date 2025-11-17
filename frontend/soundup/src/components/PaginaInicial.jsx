import MusicaArtistaList from "./MusicaArtistaList";
import banner from "../soundup-banner.png";
import { Box } from "@mui/material";

export default function PaginaInicial() {
    return (
        <Box>
            <img src={banner} alt="Logo" style={{
                borderRadius:"20px",
                width: "100%",
                maxHeight: "300px",
                marginBottom: "20px"
            }} />
            <MusicaArtistaList />
        </Box>

    );
}

