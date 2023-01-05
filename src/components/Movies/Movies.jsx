import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({ handleMoviesSubmit, movies, loading }) => {
  const [searchValue, setSearchValue] = React.useState(localStorage.getItem("searchValue") || "");

  const [isChecked, setIsChecked] = React.useState(
    JSON.parse(localStorage.getItem("isChecked")) || false
  );

  const [emptyInputMessage, setEmptyInputMessage] = React.useState(false);

  const handleChangleInput = (evt) => {
    setSearchValue(evt.target.value);
    setEmptyInputMessage(false);
  };

  const handleChangleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSumbit = (evt) => {
    evt.preventDefault();
    if (!searchValue) {
      setEmptyInputMessage(true);
    } else {
      handleMoviesSubmit(searchValue, isChecked);
    }
  };

  return (
    <main className="movies">
      <SearchForm
        handleChangleInput={handleChangleInput}
        handleSumbit={handleSumbit}
        isChecked={isChecked}
        handleChangleCheckbox={handleChangleCheckbox}
        emptyInputMessage={emptyInputMessage}
        searchValue={searchValue}
      />
      {loading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList movies={movies} />
          <button className="movies__button" type="button">
            Ещё
          </button>
        </>
      )}
    </main>
  );
};

export default Movies;
