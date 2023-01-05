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

const App = () => {
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  // const handleGetAllMovies = () => {
  //   setLoading(true);
  //   apiMovies
  //     .getMovies()
  //     .then((res) => {
  //       setAllMovies(res);
  //       localStorage.setItem("allMovies", JSON.stringify(res));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

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

  const filterByInput = (movies, searchValue) => {
    return movies.filter((item) => {
      const newNameRU = item.nameRU.toLowerCase();
      const newNameEN = item.nameEN.toLowerCase();
      const newSearchValue = searchValue.toLowerCase();
      return newNameRU.includes(newSearchValue) || newNameEN.includes(newSearchValue);
    });
  };

  const filterByDuration = (movies, isChecked) => {
    if (isChecked) {
      return movies.filter((item) => {
        return item.duration <= 40;
      });
    } else {
      return movies;
    }
  };

  const handleMoviesSubmit = async (searchValue, isChecked) => {
    localStorage.setItem("isChecked", isChecked);
    localStorage.setItem("searchValue", searchValue);

    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    // делаем запрос только если нет данных в localStorage
    if (!moviesFromStorage) {
      const a = await handleGetAllMovies();
      const x = filterByInput(a, searchValue);

      const x2 = filterByDuration(x, isChecked);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      setFilteredMovies(x2);
    } else {
      const x = filterByInput(moviesFromStorage, searchValue);

      const x2 = filterByDuration(x, isChecked);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      setFilteredMovies(x2);
    }
  };

  React.useEffect(() => {
    // при перезагрузке достаем данные из localStorage
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    if (moviesFromStorage) {
      setAllMovies(moviesFromStorage);
    } else {
      setAllMovies([]);
    }

    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (filteredMovies) {
      setFilteredMovies(filteredMovies);
    } else {
      setFilteredMovies([]);
    }
  }, []);

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
                  movies={filteredMovies}
                  handleMoviesSubmit={handleMoviesSubmit}
                  loading={loading}
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
