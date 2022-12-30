import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

const Movies = () => {
  return (
    <>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
      <div className="movies">
        <button className="movies__button" type="button">
          Ещё
        </button>
      </div>
    </>
  );
};

export default Movies;
