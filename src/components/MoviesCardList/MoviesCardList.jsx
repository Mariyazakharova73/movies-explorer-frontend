import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { dataArr } from "../../utils/variables";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = ({ movies }) => {
  const { pathname } = useLocation();
  const isMoviesPage = pathname === "/movies";

  return (
    <section className="movies-list page__content">
      {movies && movies.length !== 0 ? (
        <ul className="movies-list__wrapper page__list">
          {movies.map((item) => {
            return <MoviesCard key={item.id} item={item} isMoviesPage={isMoviesPage} />;
          })}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </section>
  );
};

export default MoviesCardList;
