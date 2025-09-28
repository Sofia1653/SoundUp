import React from "react";
import UsuarioList from "./components/UsuarioList";
import ArtistaList from "./components/ArtistaList";
import MusicaList from "./components/MusicaList";

function App() {
  return (
    <div className="App">
      <h1>SoundUp</h1>
      <UsuarioList />
      <br></br>
      <ArtistaList />
        <br></br>
        <MusicaList />
    </div>
  );
}

export default App;
