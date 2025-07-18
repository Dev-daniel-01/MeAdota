import style from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "./api/api";

import petsImage from "../src/assets/images/fundoLogin.png";
import logoLogin from "../src/assets/images/logoLogin.png";
import logoEmail from "../src/assets/images/logoEmail.png";
import logoSenha from "../src/assets/images/logoSenha.png";

import eyeOpen from "../src/assets/images/view.png";
import eyeClosed from "../src/assets/images/hide.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/adocao");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, password });
      const userData = response.data;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/adocao");
    } catch (error) {
      setMessage(
        "Erro ao fazer login: " +
          (error.response?.data?.message || "Verifique seus dados.")
      );
    }
  };

  return (
    <section className={style.container}>
      {/* Lado esquerdo com a imagem dos pets */}
      <div className={style.imageSide}>
        <img src={petsImage} alt="Cachorro e gato felizes" />
      </div>

      {/* Lado direito com o formulário */}
      <div className={style.formSide}>
        <div className={style.formBox}>
          <div className={style.wrapSideformBox}>
            <img src={logoLogin} alt="Logo Adota?" className={style.logo} />
            <h1 className={style.title}>Login</h1>
          </div>

          <form onSubmit={handleLogin}>
            {/* E-mail */}
            <div className={style.inputGroup}>
              <img src={logoEmail} alt="Ícone email" className={style.inputIcon} />
              <input
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Senha */}
            <div className={style.inputGroup}>
              <img src={logoSenha} alt="Ícone senha" className={style.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Ícone de olho com suas imagens */}
              <span
                className={style.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? eyeOpen : eyeClosed}
                  alt={showPassword ? "Mostrar senha" : "Ocultar senha"}
                  style={{ width: "20px", height: "20px" }}
                />
              </span>
            </div>

            <button type="submit" className={style.loginButton}>
              Entrar
            </button>
          </form>

          {message && <p className={style.error}>{message}</p>}

          <p className={style.registerLink}>
            Não tem login? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </div>
    </section>
  );
}
