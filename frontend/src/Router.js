import React, { Component } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import LoginPage from "./pages/Login/loginPage"
import Register from "./pages//Register/registerPage"
import ProfilePage from "./pages/Porfile/profilePage"


class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/:username" element={<ProfilePage />} />
          
          
        </Routes>
      </BrowserRouter>
    )
  }
}
export default Router
