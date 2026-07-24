import Image from 'next/image';
import styles from './cards.module.css';
import React from 'react';

import icon1 from '@/assets/images/iconsCards1.png';
import icon2 from '@/assets/images/iconsCards2.png';
import icon3 from '@/assets/images/iconsCards3.png';
import icon4 from '@/assets/images/iconsCards4.png';




export const CardsSection = () => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon1} alt="Ícone 1" />
          <div className={styles.cardBox}>
          <div className={styles.cardText}>
            Aqui começa o lar que todo pet merece - acolhe, ame e adote!
          </div>
        </div>
      </div>

      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon2} alt="Ícone 2" />
         <div className={styles.cardBox}>
          <div className={styles.cardText}>
            Avaliação rápida e segura para garantir o melhor lar para cada pet.
          </div>
        </div>
      </div>

      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon3} alt="Ícone 3" />    
        <div className={styles.cardBox}>
          <div className={styles.cardText}>
            Adote e viva momentos de alegria e companheirismo todos os dias!
          </div>
        </div>
       </div>


      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon4} alt="Ícone 4" />
        <div className={styles.cardBox}>
          <div className={styles.cardText}>
            Aqui os doadores são confiáveis e um site seguro para adotar com tranquilidade.
          </div>
        </div>
        </div>
      </div>
  );
};
