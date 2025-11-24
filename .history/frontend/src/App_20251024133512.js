import React from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default App;
