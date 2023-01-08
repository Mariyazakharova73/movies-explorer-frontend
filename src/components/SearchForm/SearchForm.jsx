import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({
  handleChangleInput,
  handleSumbit,
  isChecked,
  handleChangleCheckbox,
  emptyInputMessage,
  searchValue,
}) => {
  return (
    <section className="search page__content">
      <form onSubmit={handleSumbit} className="search__form">
        <div className="search__wrapper">
          <input
            className="search__input"
            placeholder="Фильм"
            onChange={handleChangleInput}
            value={searchValue || ""}
          />
          <button className="search__btn" type="submit">
            Найти
          </button>
        </div>
        {emptyInputMessage && (
          <span className="search__err-message">Нужно ввести ключевое слово</span>
        )}
        <FilterCheckbox isChecked={isChecked} handleChangleCheckbox={handleChangleCheckbox} />
      </form>
    </section>
  );
};

export default SearchForm;
