import { Navigate, Outlet } from "react-router-dom";
import { userDatavar } from "../apollo/store";

// check if user is already loggedin for signup and login
export const ProtectedRoute = () => {
  let isLogged = userDatavar()?.isLoggedInVar;
  userDatavar({
    ...userDatavar,
    isLoggedInVar: isLogged ? isLogged : sessionStorage.getItem("isLoggedIn"),
  });
  if (
    sessionStorage.getItem("isLoggedIn") === "true" &&
    sessionStorage.getItem("refreshToken")
  ) {
    return <Navigate to="/home" />;
  } else {
    return <Outlet />;
  }
};
