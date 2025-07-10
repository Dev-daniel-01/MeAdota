import Image from 'next/image';
import styles from './cards.module.css';

import icon1 from '@/assets/images/iconsCards1.png';
import text1 from '@/assets/images/textCards1.png';
import icon2 from '@/assets/images/iconsCards2.png';
import text2 from '@/assets/images/textCards2.png';
import icon3 from '@/assets/images/iconsCards3.png';
import text3 from '@/assets/images/textCards3.png';
import icon4 from '@/assets/images/iconsCards4.png';
import text4 from '@/assets/images/textCards4.png';

export const CardsSection = () => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon1} alt="Ícone 1" />
        <Image className={styles.cardsText} src={text1} alt="Texto 1" />
      </div>
      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon2} alt="Ícone 2" />
        <Image className={styles.cardsText} src={text2} alt="Texto 2" />
      </div>
      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon3} alt="Ícone 3" />
        <Image className={styles.cardsText} src={text3} alt="Texto 3" />
      </div>
      <div className={styles.cardsWrap}>
        <Image className={styles.cardsIcons} src={icon4} alt="Ícone 4" />
        <Image className={styles.cardsText} src={text4} alt="Texto 4" />
      </div>
    </div>
  );
};
