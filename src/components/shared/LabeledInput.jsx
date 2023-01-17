import React, { useState } from "react";

const LabeledInput = ({
  id,
  register,
  etPhone,
  type,
  label,
  fieldValue,
  inputWidth,
  validationMessage,
  isautoComplete,
  inputFieldError,
  required,
  maxDate,
}) => {
  const [labelTrue, setLabelTrue] = useState(false);

  const validateInput = (e) => {
    if (e.target.value !== "") {
      setLabelTrue(true);
    } else {
      setLabelTrue(false);
    }
  };
  return (
    <div className={" " + (inputWidth ? inputWidth : "w-full")}>
      <div className="relative">
        <input
          {...register}
          onBlur={validateInput}
          type={type}
          id={id}
          aria-describedby="FormInput"
          className={`${
            inputFieldError ? " border-1 border-red" : " border-none"
          } ${
            etPhone ? "pl-16" : "pl-1"
          } input w-full block px-2 py-3 text-sm bg-inputGrey focus:bg-white rounded focus:border-none border appearance-none peer outline-none focus:outline`}
          placeholder=""
          value={fieldValue}
          autoComplete={isautoComplete === false ? "off" : ""}
          max={maxDate ? maxDate : null}
        />

        <label
          htmlFor={id}
          className={`${etPhone ? "left-14" : "left-2"} ${
            labelTrue ? "-translate-y-4 top-2 text-sm" : ""
          } input-label capitalize absolute peer-focus:text-sm text-md text-N60 rounded duration-300 transform  scale-75 top-2 z-10 origin-[0]  bg-inputGrey px-2 peer-focus:px-2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4  cursor-text`}
        >
          {label}
          {/* if the field is required add the star */}
          {required === true && <small className="text-sm text-red">*</small>}
        </label>

        {etPhone && (
          <span className=" rounded-l absolute top-0 h-full text-sm text-N40 bg-transparent peer-focus:bg-transparent px-4 flex justify-center items-center">
            +251
          </span>
        )}
      </div>
      {validationMessage && (
        <p id="InputMessage" className="mt-1 text-xs text-red">
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default LabeledInput;
