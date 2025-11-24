import React from "react";
import RegisterForm from "../components/RegisterForm";
import "./PageStyles.css";

const RegisterPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-header">Kayıt Sayfası</h1>
      <div className="form-wrapper">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
