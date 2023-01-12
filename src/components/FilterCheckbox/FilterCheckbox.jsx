import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ isChecked, handleChangleCheckbox }) => {
  return (
    <label className="filter">
      <input
        className="filter__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChangleCheckbox}
      />
      <span className="filter__visible-checkbox" />
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
