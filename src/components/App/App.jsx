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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMovies } from "../../utils/MoviesApi";
import { config } from "../../utils/variables";
import ProtectedRoute from "../ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../utils/Auth";
import { apiMain } from "../../utils/MainApi";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registration, setRegistration] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [quantity, setQuantity] = React.useState(config.desktop);
  const [shortMovies, setShortMovies] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const handleGetSavedMovies = async () => {
    try {
      const res = await apiMain.getSavedMovies();
      setSavedMovies(res);
      localStorage.setItem("savedMovies", JSON.stringify(res));
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  function handleSaveMovie(movie) {
    apiMain
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(id) {
    apiMain
      .deleteMovie(id)
      .then((res) => {
        setSavedMovies((state) => state.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("isChecked");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("shortMovies");
    setFilteredMovies([]);
    setIsChecked(false);
    setSavedMovies([]);
    setShortMovies([]);
    setSearchValue("");
    setLoggedIn(false);
    navigate("/");
  }

  function handleLogin(email, password) {
    return apiAuth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setMessage("Вы успешно авторизировались");
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
        navigate("/movies");
      })
      .catch(() => {
        setLoggedIn(false);
        setMessage("Что то пошло не так! Попробуйте еще раз.");
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
      });
  }

  function handleRegister(name, email, password) {
    return apiAuth
      .register(name, email, password)
      .then(() => {
        setMessage("Вы успешно зарегистрировались");
        setRegistration(true);
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
        navigate("/signin");
      })
      .catch(() => {
        setRegistration(false);
        setMessage("Что то пошло не так! Попробуйте еще раз.");
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
      });
  }

  React.useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;
      apiAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setСurrentUser({
              name: res.name,
              email: res.email,
            });
            // авторизуем пользователя
            setLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    tokenCheck();
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      handleGetSavedMovies();
    }
  }, [loggedIn]);

  function handleEditProfile(name, email) {
    apiAuth
      .editProfile(name, email)
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      setMessage(
        "Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз"
      );
      setIsPopupOpen(true);
      setTimeout(closePopup, 3000);
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
      return (
        newNameRU.includes(newSearchValue) || newNameEN.includes(newSearchValue)
      );
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

  const getFilteredMovies = (movie) => {
    // фильтруем по инпуту
    const filteredByInputMovies = filterByInput(movie);
    // фильтруем по продолжительности
    const filteredByDurationMovies = filterByDuration(filteredByInputMovies);
    localStorage.setItem(
      "filteredMovies",
      JSON.stringify(filteredByDurationMovies)
    );
    setFilteredMovies(filteredByDurationMovies);
    cutArr(filteredByDurationMovies);
  };

  const handleMoviesSubmit = async () => {
    localStorage.setItem("searchValue", searchValue);
    localStorage.setItem("isChecked", isChecked);
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    // делаем запрос только если нет данных в localStorage
    if (!moviesFromStorage) {
      const res = await handleGetAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(res));
      getFilteredMovies(res);
    } else {
      getFilteredMovies(moviesFromStorage);
    }
  };

  const handleSavedMoviesSubmit = () => {
    localStorage.setItem("searchValue", searchValue);
    localStorage.setItem("isChecked", isChecked);
    const x = filterByInput(savedMovies);
    // фильтруем по продолжительности
    const x2 = filterByDuration(x);
    setSavedMovies(x2);
  };

  React.useEffect(() => {
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    const shortMoviesFromStorage = JSON.parse(
      localStorage.getItem("shortMovies")
    );
    const searchValueFromStorage = localStorage.getItem("searchValue");
    const isCheckedFromStorage = JSON.parse(localStorage.getItem("isChecked"));
    if (moviesFromStorage) {
      setAllMovies(moviesFromStorage);
    } else {
      setAllMovies([]);
    }
    if (searchValueFromStorage) {
      setSearchValue(searchValueFromStorage);
    }
    if (isCheckedFromStorage) {
      setIsChecked(isCheckedFromStorage);
    }
    if (shortMoviesFromStorage) {
      setShortMovies(shortMoviesFromStorage);
    }
  }, []);

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

  const cutArr = (arr) => {
    if (arr) {
      const newArr = arr.slice(0, quantity.quantity);
      setShortMovies(newArr);
      localStorage.setItem("shortMovies", JSON.stringify(newArr));
    }
  };

  React.useEffect(() => {
    const filteredMoviesFromStorage = JSON.parse(
      localStorage.getItem("filteredMovies")
    );
    if (filteredMoviesFromStorage) {
      cutArr(filteredMoviesFromStorage);
    }
  }, [quantity]);

  React.useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("isChecked", isChecked);
    }
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    if (moviesFromStorage) {
      getFilteredMovies(moviesFromStorage);
    }

    const savedMoviesFromStorage = JSON.parse(
      localStorage.getItem("savedMovies")
    );

    if (savedMoviesFromStorage) {
      const filteredByInputMovies = filterByInput(savedMoviesFromStorage);
      const filteredByDurationMovies = filterByDuration(filteredByInputMovies);
      setSavedMovies(filteredByDurationMovies);
    }
  }, [isChecked]);

  const addMoreMovies = () => {
    const filteredMoviesFromStorage = JSON.parse(
      localStorage.getItem("filteredMovies")
    );
    // длина отфильтрованного массива
    const endMoviesList = shortMovies.length;
    const newLength = shortMovies.length + quantity.step;
    // часть для добаввления
    const newArr = filteredMoviesFromStorage.slice(endMoviesList, newLength);
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
              <ProtectedRoute loggedIn={loggedIn}>
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
                  filteredMovies={filteredMovies}
                  handleSaveMovie={handleSaveMovie}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header />
                <SavedMovies
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  isChecked={isChecked}
                  searchValue={searchValue}
                  onChangleInput={handleChangleInput}
                  onChangleCheckbox={handleChangleCheckbox}
                  handleSavedMoviesSubmit={handleSavedMoviesSubmit}
                  loading={loading}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header />
                <Profile
                  signOut={signOut}
                  handleEditProfile={handleEditProfile}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <InfoTooltip
          popupText={message}
          isOpen={isPopupOpen}
          onClose={closePopup}
          loggedIn={loggedIn}
          registration={registration}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
