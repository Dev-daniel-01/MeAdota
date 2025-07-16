import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import PetsDisponiveis from "./PetsDisponiveis.jsx"; 
import Adocao from "./Adocao.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/petsdisponiveis" element={<PetsDisponiveis />} />
        <Route path="/adocao" element={<Adocao />}/>
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
