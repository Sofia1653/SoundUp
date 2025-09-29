import React from "react";
import UsuarioList from "./components/UsuarioList";
import ArtistaList from "./components/ArtistaList";
import MusicaList from "./components/MusicaList";
import Consultas from "./components/Consultas";

function App() {
  return (
    <div className="App">
      <h1>SoundUp</h1>
      <UsuarioList />
      <br />
      <ArtistaList />
      <br />
      <MusicaList />
      <br />
      <Consultas />
    </div>
  );
}

export default App;
