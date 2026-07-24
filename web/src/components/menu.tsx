import styles from "./menu.module.css"
import Image from "next/image";
import logoNav from "../assets/images/logo.png";
import pataNav from "../assets/images/Pata.png";

export const Menu = () => {
    return (
        <nav className={styles.navBar}>
            <div className={styles.navSide}>
                <a href="/" className={styles.navLink}>
                    <Image src={logoNav} alt="Logo" width={65} height={60} priority />
                </a>
            </div>

            <div className={styles.navCenter}>
                <p>Showroom</p>
            </div>

            <div className={styles.navSide}>
                <a href="/pets" className={styles.navLink}>
                    <Image src={pataNav} alt="Pata" width={30} height={30} priority className={styles.navPata} />
                </a>
            </div>
        </nav>

    );
};
