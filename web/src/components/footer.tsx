import style from "./footer.module.css"
import Image from "next/image";
import logoNav from "../assets/images/logo.png";
import instragram from "../assets/images/instagram.png"
import whatssap from "../assets/images/whatsapp.png"
import Facebook from "../assets/images/facebook.png"


export const Footer = () => {
    return (
        <footer className={style.Footer}>
                <div className={style.footerSide} >
                        <Image src={logoNav} alt="Logo" className={style.logoNav} width={65} height={60} priority />
                </div>
                <div className={style.footerCenter}>
                    <p>
                         @2025 direitos reservados  
                    </p>
                </div>
                <div className={style.footerSide}>
                 <div className={style.footerLinkContainer}>
                         <a className={style.footerLink} href="/">
                        <Image src={instragram} alt='instragram' className={style.iconsFooter} priority/>
                        </a>
                        <a className={style.footerLink} href="/">
                        <Image src={whatssap} alt='whatssap' className={style.iconsFooter} priority/>
                        </a>
                        <a className={style.footerLink} href="/">
                        <Image src={Facebook} alt='Facebook' className={style.iconsFooter} priority/>
                        </a>
                 </div>
                </div>
        </footer>
    );
};
