import { useState } from 'react'
import styles from './App.module.css'
import { Menu } from './components/menu'
import { Slider } from './components/slider'

function App() {

  return (
    <>
    <Menu></Menu>
    
      <section className={styles.container}>
        <section className={styles.s1}>
            <Slider></Slider>
        </section>
        <section className={styles.s2}>

        </section>
      </section>
    </>
  )
}

export default App
