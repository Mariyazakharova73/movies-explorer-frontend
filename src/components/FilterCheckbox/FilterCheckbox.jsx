import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
      <label className="filter">
        {/* скрываем */}
        <input className="filter__input" type="checkbox" /> 
        {/* стилизуем */}
        <span className="filter__visible-checkbox"></span>
        Короткометражки
      </label>
  );
};

export default FilterCheckbox;
