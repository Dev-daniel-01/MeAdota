import style from "./menu2.module.css"
import Image from "next/image";
import logoNav from "../assets/images/logo.png";
import voltarNav from "../assets/images/Voltar.png";


export const Menu2 = () => {
    return (
        <nav className={style.navBar}>
                <div className={style.navSide} >
                    <a href="/"  className={style.navLink}>
                        <Image src={logoNav} alt="Logo" className={style.logoNav} width={65} height={60} priority />
                    </a>
                </div>
                <div className={style.navCenter}>
                    <p>
                         Animais disponiveis
                    </p>
                </div>
                <div className={style.navSide}>
                    <a className={style.navLink} href="/">
                        <Image src={voltarNav} alt='voltar' className={style.voltarNav} width={40} height={40} priority/>
                    </a>
                </div>
        </nav>
    );
};
