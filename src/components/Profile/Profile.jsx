import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="profile page__content">
        <h1 className="profile__title">Привет, Мария!</h1>

        <form className="profile__form">
          <div className="profile__text-wrapper">
            <label className="profile__text">Имя</label>
            <input className="profile__input" defaultValue="Мария" required />
          </div>
          <div className="profile__border" />
          <div className="profile__text-wrapper">
            <label className="profile__text">E-mail</label>
            <input className="profile__input" defaultValue="pochta@yandex.ru" required />
          </div>
          <button className="profile__bth-submit" type="submit">
            Редактировать
          </button>
        </form>

        <button className="profile__bth-exit" onClick={() => navigate("/")}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
