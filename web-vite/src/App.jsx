import styles from './App.module.css'
import { Navigate } from 'react-router'
import { useState } from 'react'
import { useNavigate } from "react-router";

import { Footer } from './components/footer'
import { Menu } from './components/menu'
import { Slider } from './components/slider'
import { CardsSection } from './components/cards'
import FeedbackSlider from './components/cardsFeedback'


function App() {
    const navigate = useNavigate();
  return (
    <>
      <Menu></Menu>

      <section className={styles.container}>
        <section className={styles.s1}>
          <Slider></Slider>
        </section>
        <section className={styles.s2}>
          <CardsSection></CardsSection>
        </section>
        <section className={styles.s3}>
          <div className={styles.wrapS3}>
            <div className={styles.containerTextosFeedback}>
              <h1 className={styles.TitleFeedback}>O que dizem nossos adotantes?</h1>
              <p className={styles.paragrafoFeedback}>As avaliações dos nossos adotantes mostram como a adoção de um cachorro vai muito além de um simples gesto de carinho — é uma experiência transformadora. Cada relato revela histórias de superação, companheirismo e afeto incondicional.
                <br /><br />Nossos cãezinhos, antes resgatados de situações difíceis, hoje enchem lares de alegria, amor e gratidão.
                <br /><br />A conexão entre adotante e pet é única, e nos inspira todos os dias a continuar facilitando encontros que mudam vidas.</p>
            </div>
            <div className={styles.containerFeedbacks}>
              <FeedbackSlider></FeedbackSlider>
              <button onClick={() => navigate("/petsdisponiveis")} className={styles.buttonFeedbacks}>Ver pets para adoção</button>
            </div>

          </div>
        </section>
      </section>
      <Footer></Footer>
    </>
  )
}

export default App
