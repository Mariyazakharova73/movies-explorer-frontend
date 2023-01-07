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
import ProtectedRoute from '../ProtectedRoute';
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../utils/Auth";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [quantity, setQuantity] = React.useState(config.desktop);
  const [shortMovies, setShortMovies] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);


  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  function closePopup() {
    setIsPopupOpen(false);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate("/signin")
  }

  function handleLogin(email, password) {
    return apiAuth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setMessage('Вы успешно авторизировались');
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
        navigate('/movies');
      })
      .catch(() => {
        setLoggedIn(false);
        setMessage('Что то пошло не так! Попробуйте еще раз.');
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
      });
  }

  function handleRegister(name, email, password) {
    return apiAuth
      .register(name, email, password)
      .then(() => {
        setLoggedIn(true);
        setMessage('Вы успешно зарегистрировались');
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
        navigate('/signin');
      })
      .catch(() => {
        setLoggedIn(false);
        setMessage('Что то пошло не так! Попробуйте еще раз.');
        setIsPopupOpen(true);
        setTimeout(closePopup, 3000);
      });
  }

  React.useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) return;
      apiAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            // авторизуем пользователя
            setLoggedIn(true);
            navigate('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    tokenCheck();
  }, [loggedIn]);



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
    // localStorage.setItem("isChecked", isChecked);
    localStorage.setItem("searchValue", searchValue);
    localStorage.setItem("isChecked", isChecked);
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
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      cutArr(x2);
    }
  };

  React.useEffect(() => {
    // при перезагрузке страницы записываем данные в стейт
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    const shortMoviesFromStorage = JSON.parse(localStorage.getItem("shortMovies"));
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

  const cutArr = (arr) => {
    if (arr) {
      const newArr = arr.slice(0, quantity.quantity);
      setShortMovies(newArr);
      localStorage.setItem("shortMovies", JSON.stringify(newArr));
      console.log("длина обрезаемого массива", arr.length);
      console.log(quantity);
    }
  };

  React.useEffect(() => {
    const filteredMoviesFromStorage = JSON.parse(localStorage.getItem("filteredMovies"));
    if (filteredMoviesFromStorage) {
      cutArr(filteredMoviesFromStorage);
    }
  }, [quantity]);

  React.useEffect(() => {
    localStorage.setItem("isChecked", isChecked);
    const moviesFromStorage = JSON.parse(localStorage.getItem("allMovies"));
    if (moviesFromStorage) {
      // фильтруем по инпуту
      const x = filterByInput(moviesFromStorage, searchValue);
      //фильтруем по продолжительности
      const x2 = filterByDuration(x);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      setFilteredMovies(x2);
      localStorage.setItem("filteredMovies", JSON.stringify(x2));
      cutArr(x2);
    }
  }, [isChecked]);

  const addMoreMovies = () => {
    const filteredMoviesFromStorage = JSON.parse(localStorage.getItem("filteredMovies"));
    console.log("addMoreMovies", shortMovies.length);
    // длина отфильтрованного массива
    const endMoviesList = shortMovies.length;
    const newLength = shortMovies.length + quantity.step;
    // часть для добаввления
    const newArr = filteredMoviesFromStorage.slice(endMoviesList, newLength);
    // перезаписываем стейт
    setShortMovies([...shortMovies, ...newArr]);
    // localStorage.setItem("shortMovies", JSON.stringify([...shortMovies, ...newArr]));
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
                  quantity={quantity}
                  filteredMovies={filteredMovies}
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
                <SavedMovies />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header />
                <Profile signOut={signOut}/>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>} />
          <Route path="/signup" element={<Register handleRegister={handleRegister}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <InfoTooltip
            popupText={message}
            isOpen={isPopupOpen}
            onClose={closePopup}
            loggedIn={loggedIn}
          />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
