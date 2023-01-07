import React from "react";
import "./Profile.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";
import { CurrentUserContext } from "../../context/CurrenUser";
import { EMAIL } from "../../utils/variables";

const Profile = ({ signOut, onUpdateUser }) => {
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation({});
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { user, email } = values;
    onUpdateUser(user, email);
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  return (
    <main>
      <section className="profile page__content">
        <h1 className="profile__title">Привет, Мария!</h1>

        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__text-wrapper">
            <label className="profile__text">Имя</label>
            <input name="user" className="profile__input" minLength="2" required />
          </div>
          <div className="profile__border" />
          <div className="profile__text-wrapper">
            <label className="profile__text">E-mail</label>
            <input name="email" className="profile__input" minLength="2" required pattern={EMAIL} />
          </div>
          <button className="profile__bth-submit" type="submit">
            Редактировать
          </button>
        </form>

        <button className="profile__bth-exit" onClick={() => signOut()}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
