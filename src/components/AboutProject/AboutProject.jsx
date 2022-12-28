import React from "react";
import "./AboutProject.css";
import SelectionTitle from "../SectionTitle/SectionTitle";

const AboutProject = () => {
  return (
    <section className="about-project page__content" id="about-project">
      <SelectionTitle>О проекте</SelectionTitle>
      <ul className="about-project__list page__list">
        <li className="about-project__list-item">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </li>
        <li className="about-project__list-item">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__progress">
        <p className="about-project__info about-project__info_size_s">1 неделя</p>
        <p className="about-project__info about-project__info_size_m">4 недели</p>
        <p className="about-project__info">Back-end</p>
        <p className="about-project__info">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
