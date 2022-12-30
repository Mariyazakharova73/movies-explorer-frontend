import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ item, isMoviesPage }) => {
  const [savedMovie, setSavedMovie] = React.useState(false);

  const onButtonSaveClick = () => {
    setSavedMovie((prev) => !prev);
  };

  return (
    <li className="movies-list__item">
      <img
        className="movies-list__image"
        src={item.image}
        alt={`${item.nameRU}.`}
      />
      <div className="movies-list__text-wpapper">
        <p className="movies-list__item-title">{item.nameRU}</p>
        <p className="movies-list__item-duration">{item.duration}</p>
      </div>
      {isMoviesPage ? (
        savedMovie ? (
          // галочка
          <button
            className="movies-list__button"
            type="button"
            onClick={onButtonSaveClick}
          />
        ) : (
          <button
            className="movies-list__button-save"
            type="button"
            onClick={onButtonSaveClick}
          >
            Сохранить
          </button>
        )
      ) : (
        // крестик
        <button
          className="movies-list__button movies-list__button_type_delete"
          type="button"
        />
      )}
    </li>
  );
};

export default MoviesCard;
