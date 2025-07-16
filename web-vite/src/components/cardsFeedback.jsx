import { useState, useEffect } from "react";
import style from "./cardsFeedback.module.css";
import user from '../assets/images/user.png';

export default function FeedbackSlider() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:5555/feedbacks");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Erro ao buscar feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Avança o slider a cada 5s
  useEffect(() => {
    if (!loading && feedbacks.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % feedbacks.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading, feedbacks]);

  if (loading) return <p>🔄 Carregando feedbacks...</p>;
  if (feedbacks.length === 0) return <p>😢 Nenhum feedback encontrado</p>;

  return (
    <div className={style.sliderContainer}>
      {feedbacks.map((fb, index) => (
        <div
          key={fb.id}
          className={`${style.slide} ${index === current ? style.active : ""}`}
        >
          {index === current && (
            <div className={style.card}>
              
              {/* DIV PAI que divide 60% / 40% */}
              <div className={style.parentDiv}>

                {/* Lado esquerdo 60% */}
                <div className={style.leftDiv}>
                  <div className={style.wrapUser}>
                    <img src={user} alt="user" width={60} height={60} />
                    <h5>{fb.user.name}</h5>
                  </div>

                  <div className={style.wrapImage}>
                    <p className={style.petName}>{fb.pet.name}</p>
                    <img
                      src={fb.image}
                      alt={fb.pet.name}
                      className={style.petImage}
                    />
                  </div>
                </div>

                {/* Lado direito 40% */}
                <div className={style.rightDiv}>
                  <div className={style.wrapTexts}>
                    <p className={style.text}>{fb.comment}</p>
                    <p className={style.adopted}>Adotado</p>
                  </div>
                </div>

              </div>

              {/* Opcional: terceira div como rodapé */}
              {/* <div className={style.footerDiv}>
                Rodapé ou outro conteúdo aqui
              </div> */}

            </div>
          )}
        </div>
      ))}
    </div>
  );
}
