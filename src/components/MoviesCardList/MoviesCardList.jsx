import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { dataArr } from "../../utils/variables";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = () => {
  const { pathname } = useLocation();
  const isMoviesPage = pathname === "/movies";

  return (
    <section className="movies-list page__content">
      <ul className="movies-list__wrapper page__list">
        {dataArr.map((item) => {
          return <MoviesCard key={item.movieId} item={item} isMoviesPage={isMoviesPage} />;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
