import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import NavTab from "../NavTab/NavTab";

const Header = () => {
const { pathname } = useLocation();
const isMainPage = pathname === '/'

  return (
    <header className={`header page__content ${isMainPage ? ' header_type_light' : ''}`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип." />
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__link-container">
              <Link className="page__link" to="/sign-up">Регистрация</Link>
              <Link className="header__button page__link" to="/sign-in">Войти</Link>
            </div>
          }
        />
        <Route path="/movies" element={<NavTab />} />
        <Route path="/saved-movies" element={<NavTab />} />
        <Route path="/profile" element={<NavTab />} />
      </Routes>
    </header>
  );
};

export default Header;
