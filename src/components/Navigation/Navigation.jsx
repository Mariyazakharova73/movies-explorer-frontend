import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isMenuOpen, closeMenu }) => {
  const { pathname } = useLocation();

  const isMoviesPage = pathname === "/movies";
  const isSavedMoviesPage = pathname === "/saved-movies";

  return (
    <nav className={`navigation ${isMenuOpen && "navigation_active"}`}>
      <div className="navigation__content">
        <ul className="page__list navigation__list">
          {isMenuOpen && (
            <li className="navigation__list-item ">
              <Link className="page__link" to="/" onClick={closeMenu}>
                Главная
              </Link>
            </li>
          )}
          <li
            className={`navigation__list-item ${
              isMoviesPage && "navigation__list-item_active"
            }`}
          >
            <Link className="page__link" to="/movies" onClick={closeMenu}>
              Фильмы
            </Link>
          </li>
          <li
            className={`navigation__list-item ${
              isSavedMoviesPage && "navigation__list-item_active"
            }`}
          >
            <Link className="page__link" to="/saved-movies" onClick={closeMenu}>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigation__account-container">
          <Link
            className="navigation__link page__link"
            to="/profile"
            onClick={closeMenu}
          >
            Аккаунт
          </Link>
          <div className="navigation__account-image" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
