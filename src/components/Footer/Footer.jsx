import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer page__content">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright">
        <p className="footer__copyright-text footer__copyright-text_type_dark">
          © {new Date().getFullYear()}
        </p>
        <div className="footer__text-wrapper">
          <p className="footer__copyright-text">Яндекс.Практикум</p>
          <p className="footer__copyright-text">Github</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
