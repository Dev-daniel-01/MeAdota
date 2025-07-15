// Menu2.jsx
import style from "./menu2.module.css";
import logoNav from "../assets/images/logo.png";
import profileNav from "../assets/images/Profile.png";
import search from "../assets/images/search.png";

export const Menu2 = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value); 
  };

  return (
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
        <a className={style.navLink} href="/">
          <img
            src={profileNav}
            alt="voltar"
            className={style.profileNav}
            width={35}
            height={35}
          />
        </a>
      </div>
    </nav>
  );
};
