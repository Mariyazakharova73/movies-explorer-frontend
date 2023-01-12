import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = ({
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) => {
  const { pathname } = useLocation();
  const isMoviesPage = pathname === "/movies";
  const moviesList = isMoviesPage ? movies : savedMovies;
  return (
    <section className="movies-list page__content">
      <ul className="movies-list__wrapper page__list">
        {moviesList.map((item) => {
          return (
            <MoviesCard
              handleSaveMovie={handleSaveMovie}
              key={isMoviesPage ? item.id : item.movieId}
              item={item}
              isMoviesPage={isMoviesPage}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              movies={movies}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
