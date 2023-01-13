import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedInVar } from "../apollo/store";

// check if user is already loggedin for signup and login
export const ProtectedRoute = () => {
  let isLogged = isLoggedInVar();
  isLoggedInVar(isLogged ? isLogged : sessionStorage.getItem("isLoggedIn"));
  if (
    sessionStorage.getItem("isLoggedIn") === "true" &&
    sessionStorage.getItem("refreshToken")
  ) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};
