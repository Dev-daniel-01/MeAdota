// Menu2.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

import style from "./menu2.module.css";

import logoNav from "../assets/images/logo.png";
import profileNav from "../assets/images/Profile.png";
import search from "../assets/images/search.png";
import Alert from "./alert";
import ModalProfile from "./modalProfile";

export const Menu2 = ({ onSearch }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => setAlertMessage("");
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const gotoProfile = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setAlertMessage("Você precisa estar logado para acessar o perfil!");
      navigate("/login");
      return; 
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className={style.navBar}>
        <div className={style.navSide}>
          <a href="/" className={style.navLink}>
            <img
              src={logoNav}
              alt="Logo"
              className={style.logoNav}
              width={65}
              height={60}
            />
          </a>
        </div>

        <div className={style.navCenter}>
          <div className={style.searchBox}>
            <img src={search} alt="search" className={style.searchIcon} />
            <input
              type="text"
              placeholder="Procure pelo Animal..."
              className={style.searchInput}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className={style.navSide}>
          <div className={style.navLink}>
            <img
              src={profileNav}
              alt="perfil"
              className={style.profileNav}
              onClick={gotoProfile}
              width={35}
              height={35}
            />
          </div>
        </div>


        <Alert
        message={alertMessage}
        onClose={closeAlert}
          />
      </nav>

      {showModal && <ModalProfile onClose={closeModal} />}
    </>
  );
};
