import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
};

export default Movies;
