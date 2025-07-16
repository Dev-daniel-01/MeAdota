import style from "./footer.module.css";
import logoNav from "../assets/images/logo.png";
import instagram from "../assets/images/instagram.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";

export const Footer = () => {
  return (
    <footer className={style.Footer}>
      
      {/* Logo lado esquerdo */}
      <div className={style.footerSide}>
        <img 
          src={logoNav} 
          alt="Logo" 
          className={style.logoNav} 
          width={65} 
          height={60} 
        />
      </div>

      {/* Texto central */}
      <div className={style.footerCenter}>
        <p>@2025 direitos reservados</p>
      </div>

      {/* Ícones lado direito */}
      <div className={style.footerSide}>
        <div className={style.footerLinkContainer}>
          <a className={style.footerLink} href="/">
            <img 
              src={instagram} 
              alt="Instagram" 
              className={style.iconsFooter} 
            />
          </a>
          <a className={style.footerLink} href="/">
            <img 
              src={whatsapp} 
              alt="Whatsapp" 
              className={style.iconsFooter} 
            />
          </a>
          <a className={style.footerLink} href="/">
            <img 
              src={facebook} 
              alt="Facebook" 
              className={style.iconsFooter} 
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
