import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <form className="filter">
      <label class="checkbox-ios">
        <input type="checkbox" />
        <span class="checkbox-ios-switch"></span>
        Короткометражки
      </label>
    </form>
  );
};

export default FilterCheckbox;
