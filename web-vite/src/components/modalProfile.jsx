import style from "./modalProfile.module.css";

import manPet from "../assets/images/manPet.png"
import man from "../assets/images/man.png"

export default function ModalProfile({ onClose }) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button className={style.closeButton} onClick={onClose}>❌</button>
        <div className={style.modalContainerDivs}>
                    <div className={style.section}>
          <img src={manPet} alt="" className={style.sectionImg}/>
          <button className={style.sectionButton}>ALTERAR INFORMAÇÕES DO PET</button>
        </div>
        <div className={style.riscoMeio}></div>
        <div className={style.section}>
          <img src={man} alt="" className={style.sectionImg}/>
          <button className={style.sectionButton}>ALTERAR INFORMAÇÕES DO USUÁRIO</button>
        </div>
        </div>
      </div>
    </div>
  );
}