import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import { textRegister } from "../../utils/variables";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Register = ({ handleRegister }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    const { user, email, password } = values;

    handleRegister(user, email, password);
  }
  return (
    <FormTemplate
      handleSubmit={handleSubmit}
      isValid={isValid}
      handleChange={handleChange}
      values={values}
      errors={errors}
      text={textRegister}
    />
  );
};

export default Register;
