import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ item, isMoviesPage }) => {
  const [savedMovie, setSavedMovie] = React.useState(false);

  const onButtonSaveClick = () => {
    setSavedMovie((prev) => !prev);
  };

  const getDuration = () => {
    const minutes = item?.duration % 60;
    const hours = (item?.duration - minutes) / 60;
    return hours ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
  };

  return (
    <li className="movies-list__item">
      <img
        className="movies-list__image"
        src={` https://api.nomoreparties.co${item.image.url}`}
        alt={`${item.nameRU}.`}
      />
      <div className="movies-list__text-wpapper">
        <p className="movies-list__item-title">{item.nameRU}</p>
        <p className="movies-list__item-duration">{getDuration()}</p>
      </div>
      {isMoviesPage ? (
        savedMovie ? (
          <button className="movies-list__button" type="button" onClick={onButtonSaveClick} />
        ) : (
          <button className="movies-list__button-save" type="button" onClick={onButtonSaveClick}>
            Сохранить
          </button>
        )
      ) : (
        <button className="movies-list__button movies-list__button_type_delete" type="button" />
      )}
    </li>
  );
};

export default MoviesCard;
