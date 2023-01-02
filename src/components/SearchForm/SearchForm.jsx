import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <section className="search page__content">
      <form className="search__form">
        <div className="search__wrapper">
          <input className="search__input" placeholder="Фильм" />
          <button className="search__btn" type="submit">
            Найти
          </button>
        </div>
        <FilterCheckbox/>
      </form>
    </section>
  );
};

export default SearchForm;
