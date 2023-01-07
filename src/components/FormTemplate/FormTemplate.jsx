import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./FormTemplate.css";
import { EMAIL } from "../../utils/variables";

const FormTemplate = ({ text, handleSubmit, handleChange, values, errors, isValid }) => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/signin";

  return (
    <main className="form-template">
      <Link to="/">
        <img className="form-template__logo" src={logo} alt="Логотип." />
      </Link>
      <h1 className="form-template__title">{text.title}</h1>
      <form className="form-template__form" onSubmit={handleSubmit} noValidate>
        <div className="form-template__container">
          {!isLoginPage ? (
            <div className="form-template__wrapper">
              <label className="form-template__label">Имя</label>
              <input
                minLength="2"
                name="user"
                className="form-template__input"
                // defaultValue="Мария"
                type="text"
                required
                placeholder="имя"
                onChange={handleChange}
                value={values.user || ""}
              />
              <span className="form-template__error">{errors.user}</span>
            </div>
          ) : null}

          <div className="form-template__wrapper">
            <label className="form-template__label">E-mail</label>
            <input
              minLength="2"
              name="email"
              className="form-template__input"
              type="email"
              pattern={EMAIL}
              // defaultValue="pochta@yandex.ru"
              required
              placeholder="email"
              onChange={handleChange}
              value={values.email || ""}
            />
            <span className="form-template__error">{errors.email}</span>
          </div>

          <div className="form-template__wrapper">
            <label className="form-template__label">Пароль</label>
            <input
              minLength="2"
              name="password"
              className="form-template__input"
              type="password"
              // defaultValue="123456"
              required
              placeholder="пароль"
              onChange={handleChange}
              value={values.password || ""}
            />
            <span className="form-template__error">{errors.password}</span>
          </div>
        </div>

        <button className="form-template__btn-submit" type="submit" disabled={!isValid}>
          {text.bthText}
        </button>
      </form>

      <p className="form-template__text">
        {text.text}{" "}
        <Link to={isLoginPage ? "/signup" : "/signin"} className="form-template__link page__link">
          {text.linkText}
        </Link>
      </p>
    </main>
  );
};

export default FormTemplate;
