import React from "react";
import Home from "../screens/beforeLogin/Home";
import Login from "../screens/beforeLogin/Login";
import AboutUs from "../screens/beforeLogin/AboutUs";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "../screens/beforeLogin/Register";
import DietList from "../screens/afterLogin/DietList";
import Danisanlarim from "../screens/afterLogin/Danisanlarim";

function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/danisanlarim" element={<Danisanlarim />}></Route>
        <Route path="/dietlist" element={<DietList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
