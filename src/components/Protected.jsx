import React, { useState } from "react";

import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {  
  // const url = process.env.REACT_APP_DEV_URL;
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  
  return children;
};

export default Protected;