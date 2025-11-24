import React from "react";
import LoginForm from "../components/LoginForm";
import "./PageStyles.css";

const LoginPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-header">Giriş Sayfası</h1>
      <div className="form-wrapper">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
