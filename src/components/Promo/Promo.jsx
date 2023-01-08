import React from "react";
import landinglogo from "../../images/landing-logo.svg";
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo page__content">
      <div className="promo__wrapper">
        <div>
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className="promo__image" src={landinglogo} alt="Логотип-планета." />
      </div>
      <a className="promo__link page__link" href="#about-project">
        Узнать больше
      </a>
    </section>
  );
};

export default Promo;
