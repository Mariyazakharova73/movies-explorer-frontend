import React from "react";
import SelectionTitle from "../SectionTitle/SectionTitle";
import photo from "../../images/photo.jpg";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <section className="about-me page__content">
      <SelectionTitle>Студент</SelectionTitle>
      <div className="about-me__wrapper">
        <div>
          <h3 className="about-me__title">Test</h3>
          <p className="about-me__job">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__description">
            Я живу в Ульяновске, закончила факультет "Электроснабжние" УлГТУ. В марте 2022 года
            уволилась с должности инженера-конструктора и начала проходить курс по веб-разработке. В
            ноябре 2022 года устроилась на работу. hhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhh. gggggggggggj hhhhhhhhhh hjhhhhh hhhhhh
          </p>
          <a
            className="about-me__github-link page__link"
            href="https://github.com/Mariyazakharova73"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <p className="about-me__portfolio">Портфолио</p>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студента." />
      </div>
      <ul className="about-me__list page__list">
        <li className="about-me__list-item">
          <a
            className="about-me__project-link page__link"
            href="https://github.com/Mariyazakharova73/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="about-me__list-item">
          <a
            className="about-me__project-link page__link"
            href="https://github.com/Mariyazakharova73/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="about-me__list-item">
          <a
            className="about-me__project-link page__link"
            href="https://github.com/Mariyazakharova73/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AboutMe;
