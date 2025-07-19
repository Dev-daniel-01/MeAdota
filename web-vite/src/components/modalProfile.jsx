import { useState } from "react";
import style from "./modalProfile.module.css";

import manPet from "../assets/images/manPet.png";
import man from "../assets/images/man.png";

import ModalUpdateUser from "./modalUpdateUser"; // Importamos o modal do usuário

export default function ModalProfile({ onClose }) {
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const handleOpenUpdateUser = () => {
    // Fecha o conteúdo do ModalProfile e abre o UpdateUser
    setShowUpdateUser(true);
  };

  // Se clicou em DO USUÁRIO, só renderiza o ModalUpdateUser
  if (showUpdateUser) {
    return <ModalUpdateUser onClose={onClose} />;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalContainerDivs}>
          <h1>Alterar informações</h1>

          <div className={style.modalWrap}>
            {/* Seção PET */}
            <div className={style.section}>
              <img src={manPet} alt="manPet" className={style.sectionImg1} />
              <button className={style.sectionButton}>DO PET</button>
            </div>

            {/* Seção USUÁRIO */}
            <div className={style.section}>
              <img src={man} alt="man" className={style.sectionImg2} />
              <button
                className={style.sectionButton}
                onClick={handleOpenUpdateUser}
              >
                DO USUÁRIO
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
