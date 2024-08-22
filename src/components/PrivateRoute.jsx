import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token")); 
  if (!token) {
    return <Navigate to="/"/>;
  } else {
    return children;
  }
};

export default PrivateRoute;
