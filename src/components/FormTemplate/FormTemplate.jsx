import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./FormTemplate.css";

const FormTemplate = ({ text }) => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/sign-in";

  return (
    <div className="form-template">
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
            <input className="form-template__input" defaultValue="Мария" type="text" />
            <span className="form-template__error"></span>
          </div>

          <div className="form-template__wrapper">
            <label className="form-template__label">E-mail</label>
            <input className="form-template__input" type="email" defaultValue="pochta@yandex.ru" />
            <span className="form-template__error"></span>
          </div>

          <div className="form-template__wrapper">
            <label className="form-template__label">Пароль</label>
            <input className="form-template__input" type="password" defaultValue="123456" />
            <span className="form-template__error">Что-то пошло не так...</span>
          </div>
        </div>

        <button className="form-template__btn-submit" type="submit">
          {text.bthText}
        </button>
      </form>

      <p className="form-template__text">
        {text.text} <span className="form-template__link">{text.linkText}</span>
      </p>
    </div>
  );
};

export default FormTemplate;
