import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./FormTemplate.css";

const FormTemplate = ({ text }) => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/sign-in";

  return (
    <main className="form-template">
      <Link to="/">
        <img className="form-template__logo" src={logo} alt="Логотип." />
      </Link>
      <h1 className="form-template__title">{text.title}</h1>
      <form className="form-template__form">
        <div className="form-template__container">
          <div
            className={`form-template__wrapper ${
              isLoginPage ? " form-template__wrapper_hidden" : ""
            }`}
          >
            <label className="form-template__label">Имя</label>
            <input
              className="form-template__input"
              defaultValue="Мария"
              type="text"
              required
              placeholder="имя"
            />
            <span className="form-template__error"></span>
          </div>

          <div className="form-template__wrapper">
            <label className="form-template__label">E-mail</label>
            <input
              className="form-template__input"
              type="email"
              defaultValue="pochta@yandex.ru"
              required
              placeholder="email"
            />
            <span className="form-template__error"></span>
          </div>

          <div className="form-template__wrapper">
            <label className="form-template__label">Пароль</label>
            <input
              className="form-template__input"
              type="password"
              defaultValue="123456"
              required
              placeholder="пароль"
            />
            <span className="form-template__error">Что-то пошло не так...</span>
          </div>
        </div>

        <button className="form-template__btn-submit" type="submit">
          {text.bthText}
        </button>
      </form>

      <p className="form-template__text">
        {text.text}{" "}
        <Link to={isLoginPage ? "/sign-up" : "/sign-in"} className="form-template__link page__link">
          {text.linkText}
        </Link>
      </p>
    </main>
  );
};

export default FormTemplate;
