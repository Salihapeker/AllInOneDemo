import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">AllInOne Demo</div>
        <div className="nav-links">
          <Link
            to="/login"
            className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
          >
            <span className="nav-icon">🔐</span>
            Giriş
          </Link>
          <Link
            to="/register"
            className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
          >
            <span className="nav-icon">📝</span>
            Kayıt Ol
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
