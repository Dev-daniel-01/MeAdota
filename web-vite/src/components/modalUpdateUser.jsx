import { useEffect, useState } from "react";
import { api } from "../api/api";
import style from "./modalUpdateUser.module.css";

import iconUser from "../assets/images/userUpdate.png";
import iconName from "../assets/images/userBlack.png";
import iconEmail from "../assets/images/logoEmail.png";
import iconPassword from "../assets/images/logoSenha.png";
import iconPhone from "../assets/images/telephone.png";
import iconCep from "../assets/images/logoCep.png";

// ✅ Importa os ícones para mostrar/ocultar senha
import eyeOpen from "../assets/images/view.png";
import eyeClosed from "../assets/images/hide.png";

export default function ModalUpdateUser({ onClose }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    telephone: "",
    cep: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/users/${storedUser?.id}`);
        const { name, email, telephone, cep } = response.data;
        setUserData({ name, email, telephone, cep, password: "" });
      } catch (err) {
        console.error(err);
        setMessage("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false);
      }
    }

    if (storedUser?.id) {
      fetchUser();
    } else {
      setMessage("Usuário não encontrado. Faça login novamente.");
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (userData.password && userData.password !== confirmPassword) {
      setMessage("❌ As senhas não coincidem!");
      return;
    }

    try {
      await api.put(`/users/${storedUser.id}`, userData);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, ...userData })
      );

      setMessage("✅ Dados atualizados com sucesso!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error(err);
      setMessage(
        "Erro ao atualizar: " +
          (err.response?.data?.message || "Tente novamente.")
      );
    }
  };

  return (
    <section className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalContainerDivs}>
        <button className={style.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={style.headerIcon}>
          <img src={iconUser} alt="Editar Perfil" />
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={handleUpdate} className={style.form}>
            {/* Nome */}
            <div className={style.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Nome Completo:"
                value={userData.name}
                onChange={handleChange}
                required
              />
              <img src={iconName} alt="Nome" />
            </div>

            {/* Email */}
            <div className={style.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email:"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <img src={iconEmail} alt="Email" className={style.toBlack}/>
            </div>

            {/* Senha */}
            <div className={style.inputGroup} style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Nova Senha (opcional):"
                value={userData.password}
                onChange={handleChange}
              />
              <img src={iconPassword} alt="Senha" />

              {/* ✅ Botão com ícone para mostrar/ocultar */}
              <img
                src={showPassword ? eyeClosed : eyeOpen }
                alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword((prev) => !prev)}
                className={style.toBlackEye}
              />
            </div>

            {/* Confirmar Senha */}
            {userData.password && (
              <div className={style.inputGroup} style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirmar Senha:"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img src={iconPassword} alt="Confirmar Senha" />

                {/* ✅ Mesmo botão para confirmar senha */}
                <img
                  src={showPassword ? eyeClosed : eyeOpen}
                  alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={style.toBlackEye}
                />
              </div>
            )}

            {/* Telefone */}
            <div className={style.inputGroup}>
              <input
                type="text"
                name="telephone"
                placeholder="Número de telefone:"
                value={userData.telephone}
                onChange={handleChange}
                required
              />
              <img src={iconPhone} alt="Telefone" />
            </div>

            {/* CEP */}
            <div className={style.inputGroup}>
              <input
                type="text"
                name="cep"
                placeholder="CEP:"
                value={userData.cep}
                onChange={handleChange}
                
                required
              />
              <img src={iconCep} alt="CEP" className={style.toBlack}/>
            </div>

            {message && <p className={style.message}>{message}</p>}

            <button type="submit" className={style.submitButton}>
              CONCLUIR
            </button>
          </form>
        )}
        </div>

      </div>
    </section>
  );
}
