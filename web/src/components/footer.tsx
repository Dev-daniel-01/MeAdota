import style from "./footer.module.css"
import Image from "next/image";
import logoNav from "../assets/images/logo.png";
import instragram from "../assets/images/instagram.png"
import whatssap from "../assets/images/whatsapp.png"


export const Footer = () => {

    const acessarInsta = () => {
        const URLinsta = `https://www.instagram.com/me_adota2025/?next=%2F`
        window.open(URLinsta, "_blank")
    }

    const whatsappNumber = "5541999999901";

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
                    <a target="_blank" className={style.footerLink} onClick={acessarInsta} style={{ cursor: "pointer" }}>
                        <Image src={instragram} alt='instragram' className={style.iconsFooter} priority />
                    </a>
                    <a
                        target="_blank"
                        className={style.footerLink}
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, desejo tirar algumas dúvidas!")}`}
                        style={{ cursor: "pointer" }}
                    >
                        <Image src={whatssap} alt="whatsapp" className={style.iconsFooter} priority />
                    </a>

                </div>
            </div>
        </footer>
    );
};
