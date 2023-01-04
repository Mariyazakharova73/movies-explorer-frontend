import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

const Movies = ({ handleGetMovies, movies }) => {
  const [searchValue, setSearchValue] = React.useState(localStorage.getItem("searchValue") || "");

  const [isChecked, setIsChecked] = React.useState(
    JSON.parse(localStorage.getItem("isChecked")) || false
  );

  const [emptyInputMessage, setEmptyInputMessage] = React.useState(false);

  const handleChangleInput = (evt) => {
    setSearchValue(evt.target.value);
  };

  const handleChangleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSumbit = (evt) => {
    evt.preventDefault();
    if (!searchValue) {
      setEmptyInputMessage(true);
    } else {
      console.log("Поиск фильма");
      console.log(searchValue);
      console.log(isChecked);
    }
  };

  React.useEffect(() => {
    handleGetMovies();
  }, []);

  return (
    <main className="movies">
      <SearchForm
        handleGetMovies={handleGetMovies}
        handleChangleInput={handleChangleInput}
        handleSumbit={handleSumbit}
        isChecked={isChecked}
        handleChangleCheckbox={handleChangleCheckbox}
        emptyInputMessage={emptyInputMessage}
      />
      <MoviesCardList movies={movies} />
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
};

export default Movies;
