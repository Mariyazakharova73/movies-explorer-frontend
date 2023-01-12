import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import { textLogin } from "../../utils/variables";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";

const Login = ({ handleLogin }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    if (!email || !password) return;
    handleLogin(email, password);
  }

  return (
    <FormTemplate
      handleSubmit={handleSubmit}
      isValid={isValid}
      handleChange={handleChange}
      text={textLogin}
      values={values}
      errors={errors}
    />
  );
};

export default Login;
