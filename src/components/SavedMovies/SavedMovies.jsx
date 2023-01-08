import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({
  savedMovies,
  handleDeleteMovie,
  isChecked,
  searchValue,
  onChangleInput,
  onChangleCheckbox,
  handleSavedMoviesSubmit,
  filteredSavedMovies
}) => {
  const [emptyInputMessage, setEmptyInputMessage] = React.useState(false);

  const handleSumbit = (evt) => {
    evt.preventDefault();
    if (!searchValue) {
      setEmptyInputMessage(true);
    } else {
      handleSavedMoviesSubmit();
    }
  };

  const handleChangle = (evt) => {
    onChangleInput(evt);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        handleChangleInput={handleChangle}
        handleSumbit={handleSumbit}
        isChecked={isChecked}
        searchValue={searchValue}
        handleChangleCheckbox={onChangleCheckbox}
        emptyInputMessage={emptyInputMessage}
      />
      {savedMovies.length !== 0 ? (
        <MoviesCardList savedMovies={savedMovies} handleDeleteMovie={handleDeleteMovie} />
      ) : (
        <p>Ничего не найдено</p>
      )}
    </main>
  );
};

export default SavedMovies;
