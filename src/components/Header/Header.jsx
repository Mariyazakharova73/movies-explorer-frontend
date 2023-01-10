import React from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const isOtherPage =
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`header page__content ${
        isMainPage ? " header_type_light" : ""
      }`}
    >
      <Link to="/movies">
        <img className="header__logo" src={logo} alt="Логотип." />
      </Link>
      {isMainPage && (
        <div className="header__link-container">
          <Link className="page__link" to="/signup">
            Регистрация
          </Link>
          <Link className="header__button page__link" to="/signin">
            Войти
          </Link>
        </div>
      )}
      {isOtherPage && (
        <>
          <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
          <button
            className={`header__button-menu ${
              isMenuOpen && "header__button-menu_opened"
            }`}
            type="button"
            onClick={toggleMenu}
          />
        </>
      )}
    </header>
  );
};

export default Header;
