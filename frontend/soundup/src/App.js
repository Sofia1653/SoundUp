import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsuarioList from "./components/UsuarioList";
import ArtistaList from "./components/ArtistaList";
import MusicaList from "./components/MusicaList";
import PreferenciasPage from "./components/PreferenciasPage";

function App() {
    return (
        <Router>
            <div className="App">
                <h1>SoundUp</h1>
                <nav>
                    <Link to="/">Página Inicial</Link> |{" "}
                    <Link to="/preferencias">Preferências Musicais</Link>
                </nav>
                <hr />
                <Routes>
                    <Route path="/" element={
                        <>
                            <UsuarioList />
                            <br />
                            <ArtistaList />
                            <br />
                            <MusicaList />
                        </>
                    } />
                    <Route path="/preferencias" element={<PreferenciasPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;