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

const App = () => {
  return (
    <div className="page">
      {true ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/movies" element={<Movies></Movies>} />
        <Route path="/saved-movies" element={<SavedMovies></SavedMovies>} />
        <Route path="/profile" element={<Profile></Profile>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/signup" element={<Register></Register>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
