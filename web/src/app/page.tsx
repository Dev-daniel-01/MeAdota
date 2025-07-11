'use client'; // necessário porque o Bootstrap usa JS

import Image from "next/image";
import styles from "./page.module.css";
import { Menu } from "@/components/menu";
import { CardsSection } from "@/components/cards";
import { Slider } from "@/components/slider";
import pataNav from "../assets/images/Pata.png";

export default function Home() {
  return (
    <>
    <section className={styles.container}>
        <section className={styles.s1}>
        <Menu
          option01="Showroom"
          option02={
            <Image
              src={pataNav}
              alt="pata"
              className={styles.pataNav}
              width={30}
              height={30}
              priority
            />
          }
        />
        {/* aa */}
        <Slider></Slider>
  
      </section>
      <section className={styles.s2}>
                <CardsSection></CardsSection>
      </section>
      <section className={styles.s3}>
           <h1 className={styles.adocaoTitle}>Pronto para mudar uma vida?</h1>
                <p className={styles.adocaoP}>Explore nossa galeria de pets e encontre o companheiro perfeito para sua família</p>
                <div className={styles.wrapAdocao}>
                  <Image className={styles.adocaoImg}></Image>
                  <button className={styles.adocaoButton}></button>
                  <Image className={styles.adocaoImg}></Image>
                </div>
      </section>
    </section>  
    </>

  );
}
