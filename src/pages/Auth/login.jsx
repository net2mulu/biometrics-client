import React from "react";
import Button from "../../components/shared/Button";
import LabeledInput from "../../components/shared/LabeledInput";
// asset imports
import LogoPrimary from "../../assets/images/logo-primary.svg";
import molsImage from "../../assets/images/mols.png";
//form hook
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const schema = yup.object().shape({
    phone: yup.string().min(9).required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e, data) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center flex-col space-y-12 justify-center bg-gradient-to-b from-transparent to-prime80 relative">
        <ul className="login-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="bg-white w-11/12 sm:w-6/12 lg:w-4/12 h-[75vh] flex flex-col justify-around rounded-xl shadow-custom relative z-0 pt-8">
          <div className="text-center font-semibold mb-4">
            <p className=" mb-2 text-N40">E-LMIS OSSC</p>
            <p className="uppercase text-primary/80 text-sm">Login</p>
          </div>

          <div className="flex flex-col w-4/5 mx-auto pb-8 border-b border-b-N90">
            <div className="mb-4">
              <LabeledInput
                register={{ ...register("phone") }}
                etPhone={true}
                isDisabled={false}
                type="number"
                label="PhoneNumber"
                id="phone"
                className="mb-4"
                isautoComplete={false}
                validationMessage={errors?.phone?.message}
              />
            </div>
            <div className="mb-8">
              <LabeledInput
                register={{ ...register("password") }}
                isDisabled={false}
                type="password"
                label="Password"
                id="password"
                className="mb-4"
                isautoComplete={false}
                validationMessage={errors?.password?.message}
              />
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              custom={"bg-primary text-white font-semibold py-2"}
            >
              Login
            </Button>
          </div>
          <div className="flex justify-between items-center px-[10%]">
            <img src={LogoPrimary} alt="logo" className="w-[35%]" />
            <div className="h-[60%] bg-slate-400 w-[1px]"></div>
            <img src={molsImage} alt="mols" className="w-[35%]" />
          </div>
        </div>
        <p className="text-N20 capitalize">
          &copy; 2022 LMIS All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Login;
