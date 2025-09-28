import React from "react";
import UsuarioList from "./components/UsuarioList";
import ArtistaList from "./components/ArtistaList";

function App() {
  return (
    <div className="App">
      <h1>SoundUp</h1>
      <UsuarioList />

      <ArtistaList />
    </div>
  );
}

export default App;
