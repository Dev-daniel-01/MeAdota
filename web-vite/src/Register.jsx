import style from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "./api/api";

import petsImage from "../src/assets/images/fundoLogin.png";
import logoLogin from "../src/assets/images/logoLogin.png";
import logoUser from "../src/assets/images/logoUser.png"; 
import logoEmail from "../src/assets/images/logoEmail.png";
import logoSenha from "../src/assets/images/logoSenha.png";
import logoTelefone from "../src/assets/images/logoTelefone.png";
import logoCep from "../src/assets/images/logoCep.png";
import Alert from "./components/alert";
// Ícones do olho
import eyeOpen from "../src/assets/images/view.png";  
import eyeClosed from "../src/assets/images/hide.png";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    telephone: "",
    cep: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // controla visibilidade
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => setAlertMessage("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", user);
      setAlertMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/adocao"), 1500);
    } catch (error) {
      setAlertMessage(
        "Erro ao cadastrar: " +
          (error.response?.data?.message || "Verifique os dados.")
      );
    }
  };

  return (
    <section className={style.container}>
      <div className={style.imageSide}>
        <img src={petsImage} alt="Cachorro e gato felizes" />
      </div>
      <div className={style.formSide}>
        <div className={style.formBox}>
          <div className={style.wrapSideformBox}>
            <img
              src={logoLogin}
              alt="Logo Adota?"
              className={style.logo}
            />
            <h1 className={style.title}>Cadastro</h1>
          </div>

          <form onSubmit={handleRegister}>
            <div className={style.inputGroup}>
              <img src={logoUser} alt="Ícone nome" className={style.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Digite seu nome completo:"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <img src={logoEmail} alt="Ícone email" className={style.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Digite seu email:"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.inputGroup}>
              <img src={logoSenha} alt="Ícone senha" className={style.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Crie uma senha:"
                value={user.password}
                onChange={handleChange}
                required
              />
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt="Mostrar/ocultar senha"
                className={style.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Telefone */}
            <div className={style.inputGroup}>
              <img src={logoTelefone} alt="Ícone telefone" className={style.inputIcon} />
              <input
                type="text"
                name="telephone"
                placeholder="Digite seu número:"
                value={user.telephone}
                onChange={handleChange}
                required
              />
            </div>

            {/* CEP */}
            <div className={style.inputGroup}>
              <img src={logoCep} alt="Ícone cep" className={style.inputIcon} />
              <input
                type="text"
                name="cep"
                placeholder="Digite seu CEP:"
                value={user.cep}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botão cadastrar */}
            <button type="submit" className={style.submitButton}>
              Cadastrar
            </button>
          </form>

          {message && <p className={style.feedback}>{message}</p>}

          {/* Voltar */}
          <button className={style.backButton} onClick={() => navigate("/login")}>
            Voltar
          </button>
        </div>
      </div>
      <Alert
        message={alertMessage}
        onClose={closeAlert}
          />
    </section>
  );
}
