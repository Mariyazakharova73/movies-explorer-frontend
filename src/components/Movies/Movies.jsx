import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({
  movies,
  isChecked,
  searchValue,
  onChangleInput,
  onChangleCheckbox,
  handleMoviesSubmit,
  loading,
  addMoreMovies,
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
    onChangleInput(evt)
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
      ) : movies && movies.length !== 0 ? (
        <>
          <MoviesCardList movies={movies} />
          <button className="movies__button" type="button" onClick={() => addMoreMovies()}>
            Ещё
          </button>
        </>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </main>
  );
};

export default Movies;
