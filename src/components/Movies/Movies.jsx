import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({
  movies,
  savedMovies,
  isChecked,
  searchValue,
  onChangleInput,
  onChangleCheckbox,
  handleMoviesSubmit,
  loading,
  addMoreMovies,
  filteredMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) => {
  const [emptyInputMessage, setEmptyInputMessage] = React.useState(false);

  const handleSumbit = (evt) => {
    evt.preventDefault();
    if (!searchValue) {
      setEmptyInputMessage(true);
    } else {
      handleMoviesSubmit();
    }
  };

  const handleChangle = (evt) => {
    onChangleInput(evt);
    setEmptyInputMessage("");
  };

  return (
    <main className="movies">
      <SearchForm
        handleChangleInput={handleChangle}
        handleSumbit={handleSumbit}
        isChecked={isChecked}
        searchValue={searchValue}
        handleChangleCheckbox={onChangleCheckbox}
        emptyInputMessage={emptyInputMessage}
      />
      {loading ? (
        <Preloader />
      ) : movies.length !== 0 ? (
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
        />
      ) : searchValue ? (
        <p>Ничего не найдено</p>
      ) : null}
      {filteredMovies && filteredMovies.length > movies.length && (
        <button className="movies__button" type="button" onClick={() => addMoreMovies()}>
          Ещё
        </button>
      )}
    </main>
  );
};

export default Movies;
