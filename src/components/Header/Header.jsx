import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  return (
    <header
      className={`header page__content ${
        isMainPage ? " header_type_light" : ""
      }`}
    >
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип." />
      </Link>
      {true ? (
        <>
          <Navigation />
          <button className="header__button-menu" type="button" />
        </>
      ) : (
        <div className="header__link-container">
          <Link className="page__link" to="/sign-up">
            Регистрация
          </Link>
          <Link className="header__button page__link" to="/sign-in">
            Войти
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
