import Image from "next/image";
import styles from "./page.module.css";
import { Menu2 } from "@/components/menu2";

import voltarNav from "../../assets/images/Voltar.png";

export default function Pets() {
  return (
    <section className={styles.Page}>
      <Menu2 option01='Animais diponiveis' option02={<Image src={voltarNav} alt='pata' className={styles.voltarNav} priority/>}></Menu2> 
{/* aa */}
    </section>
  );
}
