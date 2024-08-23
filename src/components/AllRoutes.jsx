import React from "react";
import { Route, Routes } from "react-router-dom";
// import SignUp from './SignUp'
import Admin from "./Admin";
import Other from "./Other";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Protected from "./Protected";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      />
      <Route path="*" element={<Other />} />
    </Routes>
  );
};

export default AllRoutes;
