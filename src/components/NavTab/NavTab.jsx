// NavTab — компонент с навигацией по странице «О проекте».

import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";
import icon from "../../images/icon.png";

const NavTab = () => {
  return (
    <nav className="navigation">
      <ul className="page__list navigation__list">
        <li className="navigation__list-item">
          <Link className="page__link" to="/movies">
            Фильмы
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link className="page__link" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <div className="navigation__account-container" >
        <Link className="page__link" to="/profile">
          Аккаунт
        </Link>
        <div className="navigation__image" />
      </div>
    </nav>
  );
};

export default NavTab;
