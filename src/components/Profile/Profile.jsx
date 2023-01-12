import React from "react";
import "./Profile.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EMAIL } from "../../utils/variables";

const Profile = ({ signOut, handleEditProfile, buttonRef }) => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation({});
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email } = values;
    handleEditProfile(name, email);
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isValid]);

  return (
    <main>
      <section className="profile page__content">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>

        <form className="form profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__text-wrapper">
            <label className="profile__text">Имя</label>
            <input
              value={values.name || ""}
              onChange={handleChange}
              name="name"
              className="profile__input"
              minLength="2"
              required
            />
          </div>
          <span className="profile__error">{errors.name}</span>
          <div className="profile__border" />
          <div className="profile__text-wrapper">
            <label className="profile__text">E-mail</label>
            <input
              value={values.email || ""}
              onChange={handleChange}
              name="email"
              className="profile__input"
              minLength="2"
              required
              pattern={EMAIL}
            />
          </div>
          <span className="profile__error">{errors.email}</span>
          <button
          ref={buttonRef}
            className="profile__bth-submit"
            type="submit"
            disabled={!isValid}
          >
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
