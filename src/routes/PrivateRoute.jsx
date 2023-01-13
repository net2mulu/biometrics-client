import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// checks if the user is loggedin, if not will redirect login
export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (
    sessionStorage.getItem("isLoggedIn") === "true" &&
    sessionStorage.getItem("refreshToken")
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};
