import { useState } from "react";

export const useForm = (callback, initialState = {}, validationMessage = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(null);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const validateInput = () => {
    const keys = Object.keys(initialState);
    let errorObject = {};

    keys.forEach((item) => {
      //   console.log(values[item]);
      if (!values[item]) {
        errorObject[item] = `${item} is required!`;
      }
    });
    console.log(errorObject)
    setErrors({ ...errorObject });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateInput();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    errors,
  };
};
