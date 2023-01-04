import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ handleGetMovies, handleChangleInput, handleSumbit, isChecked, handleChangleCheckbox, emptyInputMessage }) => {
  return (
    <section className="search page__content">
      <form className="search__form">
        <div className="search__wrapper">
          <input
            className="search__input"
            placeholder="Фильм"
            required
            onChange={handleChangleInput}
          />
          <button className="search__btn" type="submit" onSubmit={handleSumbit}>
            Найти
          </button>
        </div>
        {emptyInputMessage && <span className="search__err-message">Нужно ввести ключевое слово</span>}
        <FilterCheckbox isChecked={isChecked} handleChangleCheckbox={handleChangleCheckbox}/>
      </form>
    </section>
  );
};

export default SearchForm;
