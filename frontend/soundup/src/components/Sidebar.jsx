import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
    HiOutlineSearch,
    HiOutlineMusicNote,
    HiOutlineLibrary,
    HiOutlineUserGroup,
    HiOutlineUser
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import logo from "../soundup-logo.png";

export default function Sidebar() {
    return (
        <Box
            sx={{
                width: 240,
                height: "100vh",
                backgroundColor: "#1A1A1A",
                color: "white",
                display: "flex",
                flexDirection: "column",
                p: 2,
                borderRight: "1px solid #2A2A2A",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            {/* LOGO */}
            <img src={logo} alt="Logo" style={{ width: "120px", marginBottom: "20px" }} />

            {/* MAIN MENU */}
            <List>

                <ListItemButton component={Link} to="/">
                    <ListItemIcon><HiOutlineLibrary color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Página inicial" />
                </ListItemButton>

                <ListItemButton component={Link} to="/catalogo">
                    <ListItemIcon><HiOutlineLibrary color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Catálogo" />
                </ListItemButton>

                <ListItemButton component={Link} to="/preferencias">
                    <ListItemIcon><HiOutlineSearch color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Preferências" />
                </ListItemButton>

                <ListItemButton component={Link} to="/consultas">
                    <ListItemIcon><HiOutlineMusicNote color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Consultas" />
                </ListItemButton>

            </List>

            {/* SECTION TITLE */}
            <Typography
                variant="subtitle2"
                sx={{ color: "#8F8F8F", mt: 3, mb: 1, ml: 1, fontWeight: "bold" }}
            >
                Sessões
            </Typography>

            <List>

                <ListItemButton component={Link} to="/musicas">
                    <ListItemIcon><HiOutlineMusicNote color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Músicas" />
                </ListItemButton>

                <ListItemButton component={Link} to="/albuns">
                    <ListItemIcon><HiOutlineLibrary color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Álbuns" />
                </ListItemButton>

                <ListItemButton component={Link} to="/artistas">
                    <ListItemIcon><HiOutlineUserGroup color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Artistas" />
                </ListItemButton>

                <ListItemButton component={Link} to="/usuarios">
                    <ListItemIcon><HiOutlineUser color="white" size={20} /></ListItemIcon>
                    <ListItemText primary="Usuários" />
                </ListItemButton>
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ borderColor: "#333" }} />

            <ListItemButton href="https://github.com/Sofia1653/SoundUp" sx={{ mt: 1 }}>
                <ListItemIcon><FaGithub color="white" size={20} /></ListItemIcon>
                <ListItemText primary="GitHub" />
            </ListItemButton>
        </Box>
    );
}
