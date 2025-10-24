import React from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default App;
