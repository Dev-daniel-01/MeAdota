import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import PetsDisponiveis from "./PetsDisponiveis.jsx"; 
import Adocao from "./Adocao.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
import Register from "./Register.jsx"
import ModalProfile from "./components/modalProfile.jsx";
import ModalZap from "./components/modalZap.jsx";
import InfoPets from "./infoPets.jsx";
import ModalEditPet from "./components/modalEditPet.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/petsdisponiveis" element={<PetsDisponiveis />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/adocao" element={ <ProtectedRoute><Adocao /></ProtectedRoute>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/modalProfile" element={<ModalProfile/>}/>
        <Route path="/modalZap" element={<ModalZap/>}/>
        <Route path="/infoPets" element={<InfoPets/>}/>
        <Route path="/modalEditPet" element={<ModalEditPet/>}/>
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
