import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <label className="filter">
      <input className="filter__input" type="checkbox" />
      <span className="filter__visible-checkbox"/>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
