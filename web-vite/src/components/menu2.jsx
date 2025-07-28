import { useState } from "react";
import { useNavigate } from "react-router";

import style from "./menu2.module.css";

import logoNav from "../assets/images/logo.png";
import profileNav from "../assets/images/Profile.png";
import search from "../assets/images/search.png";
import Alert from "./alert";
import ModalProfile from "./modalProfile";

export const Menu2 = ({ onSearch, option01 }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [redirectAfterAlert, setRedirectAfterAlert] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const gotoProfile = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setAlertMessage("Você precisa estar logado para acessar o perfil!");
      setRedirectAfterAlert(true);
      return;
    }

    setShowModal(true);
  };

  const closeAlert = () => {
    setAlertMessage("");

    if (redirectAfterAlert) {
      navigate("/login");
      setRedirectAfterAlert(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className={style.navBar}>
        <div className={style.navSide}>
          <a href={`/${option01}`} className={style.navLink}>
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
      </nav>

      {alertMessage && (
        <Alert message={alertMessage} onClose={closeAlert} />
      )}

      {showModal && <ModalProfile onClose={closeModal} />}
    </>
  );
};
