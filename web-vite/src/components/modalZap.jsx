import style from "./modalZap.module.css";

import manPet from "../assets/images/manPet.png"
import man from "../assets/images/man.png"

export default function ModalZap({ onClose }) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
     
        <div className={style.modalContainerDivs}>
          <div className={style.modalWrap}>
          <div className={style.section}>
          <img src={manPet} alt="" className={style.sectionImg}/>
          <button className={style.sectionButton}>ALTERAR INFORMAÇÕES DO PET</button>
        </div>

        <div className={style.section}>
          <img src={man} alt="" className={style.sectionImg}/>
          <button className={style.sectionButton}>ALTERAR INFORMAÇÕES DO USUÁRIO</button>
        </div>
          </div>
<button className={style.closeButton} onClick={onClose}>Fechar</button>
                           
        </div>  
           
      </div>
    </div>
  );
}