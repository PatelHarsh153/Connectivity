import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import DynamicRoute from "./DynamicRoute";
import EditProfile from "./EditProfile/EditProfile";
import EditLinks from "./EditLinks/EditLinks";
import Themes from "./Themes/Themes";
import { useSelector } from "react-redux";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
const Main = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit/profile" element={<EditProfile />} />
          <Route path="/edit/links" element={<EditLinks />} />
          <Route path="/themes/get" element={<Themes />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/get/:linktree" element={<DynamicRoute />} />
      </Routes>
    </>
  );
};

export default Main;
