import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import style from "./modalProfile.module.css";

import manPet from "../assets/images/manPet.png";
import man from "../assets/images/man.png";

import ModalUpdateUser from "./modalUpdateUser"; // Importamos o modal do usuário

export default function ModalProfile({ onClose }) {
  const navigate = useNavigate()
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const handleOpenUpdateUser = () => {
    setShowUpdateUser(true);
  };
  if (showUpdateUser) {
    return <ModalUpdateUser onClose={onClose} />;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalContainerDivs}>
          <h1 className={style.sectionTitle}s>Alterar  ou adicionar </h1>

          <div className={style.modalWrap}>
            {/* Seção PET */}
            <div className={style.section}>
              <img src={manPet} alt="manPet" className={style.sectionImg1} />
              <button className={style.sectionButton} onClick={() => navigate("/infoPets")}>PET</button>
            </div>

            {/* Seção USUÁRIO */}
            <div className={style.section}>
              <img src={man} alt="man" className={style.sectionImg2} />
              <button
                className={style.sectionButton}
                onClick={handleOpenUpdateUser}
              >
               USUÁRIO
              </button>
            </div>
          </div>

          <button className={style.closeButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
