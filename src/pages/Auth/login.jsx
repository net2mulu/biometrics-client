import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Button from "../../components/shared/Button";
import LabeledInput from "../../components/shared/LabeledInput";
// asset imports
import LogoPrimary from "../../assets/images/logo-primary.svg";
import molsImage from "../../assets/images/mols.png";
//apollo related imports
import { SIGN_IN } from "../../apollo/mutation";
import { OSSC_LABOUR_DATA_RID } from "../../apollo/query";
import { osscDataVar, userDatavar } from "../../apollo/store";
//handlers
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-hot-toast";
import { handleErrorMessage } from "../../components/utills/Helpers";

const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    phone: yup.string().min(9).required(),
    password: yup.string().required(),
  });

  // mutation
  const [signIn] = useMutation(SIGN_IN);
  //query
  const [getOSSCLabourData] = useLazyQuery(OSSC_LABOUR_DATA_RID);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    trackPromise(
      signIn({
        variables: {
          phoneNumber: "+251" + data.phone,
          password: data.password,
        },
        onCompleted(res) {
          console.log(res)
          let signInResponse = res?.signIn;

          // set access token, refresh token and user data
          userDatavar({
            id: signInResponse?.data.id,
            email: signInResponse?.data?.email,
            phoneNumber: signInResponse?.data?.phoneNumber,
            password: signInResponse?.data?.password,
            role: signInResponse?.data?.role,
            accessTokenVar: signInResponse?.tokens?.access_token,
            refreshTokenVar: signInResponse?.tokens?.refresh_token,
            isLoggedInVar: true,
          });

          // store the refresh token and access token on the storage
          sessionStorage.setItem(
            "refreshToken",
            signInResponse?.tokens?.refresh_token
          );
          sessionStorage.setItem("isLoggedIn", true);
          // fetch ossc labour data
          getOSSCLabourData({
            variables: {
              _eq: signInResponse?.data.id,
            },
            onError(error) {
              toast.error(
                handleErrorMessage(error, "Failed to fetch ossc info")
              );
            },
            onCompleted(data) {
              let osscData = data.registration_namespace?.labors[0];
              osscDataVar(osscData);
              navigate("/home");
            },
          });
        },
        onError(data) {
          console.log(data);
        },
      })
    );
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
