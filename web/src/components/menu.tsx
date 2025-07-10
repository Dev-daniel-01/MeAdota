import style from "./menu.module.css"
import Image from "next/image";
import logoNav from "../assets/images/logo.png";

type MenuProps = {
    option01: string;
    option02: string;
}

export const Menu = (props: MenuProps) => {
    return (
        <nav className={style.navBar}>
            <ul className={style.navMenu}>
                <li className={style.navLi} >
                    <a href="/"  className={style.navLink}>
                        <Image src={logoNav} alt="Logo" className={style.logoNav} width={65} height={60} priority />
                    </a>
                </li>
                <li className={style.navLi}>
                    <p>
                         {props.option01} 
                    </p>
                </li>
                <li className={style.navLi}>
                    <a className={style.navLink} href="/pets">
                        {props.option02}
                    </a>
                </li>
            </ul>
        </nav>
    );
};
