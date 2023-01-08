import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({
  item,
  isMoviesPage,
  handleSaveMovie,
  handleDeleteMovie,
  movies,
  savedMovies,
}) => {
  const [savedMovie, setSavedMovie] = React.useState(false);

  const movie = {
    country: item.country,
    director: item.director,
    duration: item.duration,
    year: item.year,
    description: item.description,
    image: `https://api.nomoreparties.co${item.image.url}`,
    trailerLink: item.trailerLink,
    thumbnail: `https://api.nomoreparties.co${item.image.url}`,
    movieId: item.id,
    nameRU: item.nameRU,
    nameEN: item.nameEN,
  };

  React.useEffect(() => {
    if (savedMovies) {
      savedMovies.forEach((obj) => {
        if (obj.movieId === item.id) {
          setSavedMovie(true);
        }
      });
    }
  }, [savedMovies]);

  const buttonSaveClick = () => {
    if (savedMovie) {
      // кнопка красная, нажимаем на нее. Запрос на удаление
      const x = savedMovies.find((obj) => {
        // из бэк === из яндекса.
        return obj.movieId === item.id;
      });
      handleDeleteMovie(x._id);
      setSavedMovie(false);
    } else {
      // кнопка серая, нажимаем на нее. Запрос на сохранение
      handleSaveMovie(movie);
      setSavedMovie(true);
    }
  };

  const buttonDeleteClick = () => {
    // на странице "Сохраненные фильмы" передаем _id фильма из своей базы
    handleDeleteMovie(item._id);
  };

  const getDuration = () => {
    const minutes = item?.duration % 60;
    const hours = (item?.duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes} мин`;
  };

  return (
    <li className="movies-list__item">
      <a className="movies-list__link page__link" href={item.trailerLink} target="_black">
        <img
          className="movies-list__image"
          src={isMoviesPage ? `https://api.nomoreparties.co${item.image.url}` : item.image}
          alt={`${item.nameRU}.`}
        />
      </a>
      <div className="movies-list__text-wpapper">
        <p className="movies-list__item-title">{item.nameRU}</p>
        <p className="movies-list__item-duration">{getDuration()}</p>
      </div>
      {isMoviesPage ? (
        savedMovie ? (
          <button className="movies-list__button" type="button" onClick={buttonSaveClick} />
        ) : (
          <button className="movies-list__button-save" type="button" onClick={buttonSaveClick}>
            Сохранить
          </button>
        )
      ) : (
        <button
          className="movies-list__button movies-list__button_type_delete"
          onClick={buttonDeleteClick}
          type="button"
        />
      )}
    </li>
  );
};

export default MoviesCard;
