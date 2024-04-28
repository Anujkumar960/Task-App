import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import Signup from "../pages/signup";
import AdminPage from "../pages/admin";
import UserPage from "../pages/userPage";





const Allroute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
    // <AdminPage/>
  );
};


export default Allroute;
