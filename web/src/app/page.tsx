'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";
import { CardsSection } from "@/components/cards";
import { Slider } from "@/components/slider";
import { Footer } from "@/components/footer";

import dogAdocao from "../assets/images/cachorroAdocao.png";
import catAdocao from "../assets/images/gatoAdocao.png";


export default function Home() {
  const router = useRouter();

  return (
    <>
    <Menu/>
    <section className={styles.container}>
        <section className={styles.s1}>
        
        <Slider></Slider>
      </section>
      <section className={styles.s2}>
                <CardsSection></CardsSection>
      </section>
      <section className={styles.s3}>
        <div className={styles.containerAdocao}>
           <h1 className={styles.adocaoTitle}>Pronto para mudar uma vida?</h1>
                <p className={styles.adocaoP}>Explore nossa galeria de pets e encontre o companheiro perfeito para sua família</p>
                <div className={styles.wrapAdocao}>
                  <Image src={dogAdocao} alt='cachorro' className={styles.adocaoImg}></Image>
                  <Image src={catAdocao} alt='gato' className={styles.adocaoImg}></Image>
                </div>
                <button className={styles.adocaoButton} onClick={() => router.push('/pets')}>Ver Pets para Adoção</button>
        </div>
          
      </section>
    </section>
    <Footer></Footer>  
    </>

  );
}
