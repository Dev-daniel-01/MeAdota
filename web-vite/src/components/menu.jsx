import { useNavigate } from "react-router";

import styles from "./menu.module.css";
import logoNav from "../assets/images/logo.png";
import pataNav from "../assets/images/Pata.png";

export const Menu = () => {
    const navigate = useNavigate();

     const gotoPetsDisponiveis = () => navigate('/petsdisponiveis')

    return (
        <nav className={styles.navBar}>
            <div className={styles.navSide}>
                <a href="/" className={styles.navLink}>
                    <img src={logoNav} alt="Logo" width={65} height={60} />
                </a>
            </div>

            <div className={styles.navCenter}>
                <p>Showroom</p>
            </div>

            <div className={styles.navSide}>
                <a onClick={gotoPetsDisponiveis} className={styles.navLink}>
                    <img
                        src={pataNav}
                        alt="Pata"
                        width={30}
                        height={30}
                        className={styles.navPata}
                    />
                </a>
            </div>
        </nav>
    );
};
