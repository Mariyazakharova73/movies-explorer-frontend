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
  const [loading, setLoading] = React.useState(true);
  const [movies, setMovies] = React.useState([]);

  const handleGetMovies = () => {
    setLoading(true);
    apiMovies
      .getMovies()
      .then((res) => {
        setMovies(res);
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
                <Movies movies={movies} handleGetMovies={handleGetMovies} />
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
