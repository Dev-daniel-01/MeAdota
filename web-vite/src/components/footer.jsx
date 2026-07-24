import style from "./footer.module.css";
import logoNav from "../assets/images/logo.png";
import instagram from "../assets/images/instagram.png";
import whatsapp from "../assets/images/whatsapp.png";

export const Footer = () => {
  
  const acessarInsta = () => {
    const URLinsta = `https://www.instagram.com/me_adota2025/?next=%2F`
    window.open(URLinsta, "_blank")
  }
  
  const whatsappNumber = "5541999999901";
  
  return (
    <footer className={style.Footer}>
      
      <div className={style.footerSide}>
        <img 
          src={logoNav} 
          alt="Logo" 
          className={style.logoNav} 
          width={65} 
          height={60} 
        />
      </div>

      <div className={style.footerCenter}>
        <p>@2025 direitos reservados</p>
      </div>

  
      <div className={style.footerSide}>
        <div className={style.footerLinkContainer}>
          <a target="_blank" className={style.footerLink} style={{ cursor: "pointer" }} onClick={acessarInsta}><img src={instagram} alt="Instagram" className={style.iconsFooter} /></a>
          <a target="_blank" className={style.footerLink} style={{ cursor: "pointer" }} href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, desejo tirar algumas dúvidas!")}`}><img src={whatsapp} alt="Whatsapp" className={style.iconsFooter}/></a>
        </div>
      </div>
    </footer>
  );
};
