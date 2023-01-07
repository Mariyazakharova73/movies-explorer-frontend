import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { dataArr } from "../../utils/variables";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = ({ movies }) => {
  const { pathname } = useLocation();
  const isMoviesPage = pathname === "/movies";



// if (movies.length===0) {
//   return <p>Ничего не найдено</p>
// }


  return (
    <section className="movies-list page__content">
        <ul className="movies-list__wrapper page__list">
          {movies.map((item) => {
            return <MoviesCard key={item.id} item={item} isMoviesPage={isMoviesPage} />;
          })}
        </ul>  
    </section>
  );
};

export default MoviesCardList;
