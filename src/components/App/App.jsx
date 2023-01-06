import React from "react";
import "./App.css";
import Main from "../Main/Main";
import { Route, Routes } from "react-router";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMovies } from "../../utils/MoviesApi";
import { config } from "../../utils/variables";

const App = () => {
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [quantity, setQuantity] = React.useState(config.desktop);
  const [shortMovies, setShortMovies] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChangleInput = (evt) => {
    setSearchValue(evt.target.value);
  };

  const handleChangleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleGetAllMovies = async () => {
    setLoading(true);
    try {
      const res = await apiMovies.getMovies();
      localStorage.setItem("allMovies", JSON.stringify(res));
      setAllMovies(res);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByInput = (movies) => {
    return movies.filter((item) => {
      const newNameRU = item.nameRU.toLowerCase();
      const newNameEN = item.nameEN.toLowerCase();
      const newSearchValue = searchValue.toLowerCase();
      return newNameRU.includes(newSearchValue) || newNameEN.includes(newSearchValue);
    });
  };

  const filterByDuration = (movies) => {
    if (isChecked) {
      return movies.filter((item) => {
        return item.duration <= 40;
      });
    } else {
      return movies;
    }
  };

  const handleMoviesSubmit = async () => {
    localStorage.setItem("isChecked", isChecked);
    localStorage.setItem("searchValue", searchValue);

    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    // делаем запрос только если нет данных в localStorage
    if (!moviesFromStorage) {
      const res = await handleGetAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(res));
      // фильтруем по инпуту
      const x = filterByInput(res);
      // фильтруем по продолжительности
      const x2 = filterByDuration(x);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      setFilteredMovies(x2);
      cutArr(x2);
    } else {
      // фильтруем по инпуту
      const x = filterByInput(moviesFromStorage, searchValue);
      //фильтруем по продолжительности
      const x2 = filterByDuration(x);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      setFilteredMovies(x2);
      cutArr(x2);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
    }
  };

  React.useEffect(() => {
    // при перезагрузке страницы записываем данные в стейт
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    const searchValueFromStorage = localStorage.getItem("searchValue");
    const isCheckedFromStorage = JSON.parse(localStorage.getItem("isChecked"));
    if (moviesFromStorage) {
      setAllMovies(moviesFromStorage);
    } else {
      setAllMovies([]);
    }
    if (searchValueFromStorage) {
      setSearchValue(searchValueFromStorage);
    } else {
      setSearchValue("");
    }
    if (isCheckedFromStorage) {
      setIsChecked(isCheckedFromStorage);
    } else {
      setIsChecked(false);
    }
  }, []);

  //измеряем ширину экрна и записываем количество карточек и стейт
  const handleChangeResize = () => {
    if (window.innerWidth >= 1280) {
      setQuantity(config.desktop);
    } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
      setQuantity(config.tablet);
    } else if (window.innerWidth < 768) {
      setQuantity(config.mobile);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleChangeResize);

    return () => {
      window.removeEventListener("resize", handleChangeResize);
    };
  }, []);

  const cutArr = async(arr) => {
    const newArr = arr.slice(0, quantity.quantity);
    setShortMovies(newArr);
    console.log(arr.length);
    console.log(shortMovies.length);
  };

  const addMoreMovies = () => {
    console.log('addMoreMovies', shortMovies.length);
    // длина отфильтрованного массива
    const endMoviesList = shortMovies.length;
    const newLength = shortMovies.length + quantity.step;
    // часть для добаввления
    const newArr = filteredMovies.slice(endMoviesList, newLength);
    // перезаписываем стейт
    setShortMovies([...shortMovies, ...newArr]);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header />
                <Movies
                  movies={shortMovies}
                  isChecked={isChecked}
                  searchValue={searchValue}
                  onChangleInput={handleChangleInput}
                  onChangleCheckbox={handleChangleCheckbox}
                  handleMoviesSubmit={handleMoviesSubmit}
                  loading={loading}
                  addMoreMovies={addMoreMovies}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
              </>
            }
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
