import React from "react";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <section className="search-form page__content">
      <form className="search-form__form">
        <input className="search-form__input" placeholder="Фильм"/>
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
