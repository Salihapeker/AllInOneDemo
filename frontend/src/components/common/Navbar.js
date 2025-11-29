import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { I18nContext } from "../../contexts/I18nContext";
import "../../styles/globals.css";

/*
  Navbar (updated)
  - Sticky, minimal, no heavy blue strip
  - Login button removed, only green "Kayıt Ol" button when not logged in
  - Language select & theme toggle included
*/

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, setLocale, t } = useContext(I18nContext);
  const navigate = useNavigate();

  const loggedIn = !!(
    localStorage.getItem("token") || localStorage.getItem("access_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="app-header" role="banner">
      <div className="container header-inner">
        {/* Sol: Logo */}
        <Link to="/" className="brand">
          <div className="brand-tile">4</div>
          <div>
            <span className="brand-text">ALL IN ONE</span>
            <small className="brand-sub">{t("for_you")}</small>
          </div>
        </Link>

        {/* Orta: Menü */}
        <nav className="nav desktop-only" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
          >
            {t("services")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
          >
            {t("about")}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
          >
            {t("contact")}
          </NavLink>
        </nav>

        {/* Sağ: Dil + Tema + Kayıt Ol */}
        <div className="header-actions">
          <select
            className="lang-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="language"
          >
            <option value="tr">TR</option>
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>

          <button
            className="theme-indicator"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          {!loggedIn ? (
            <Link to="/register" className="btn-register">
              {t("register")}
            </Link>
          ) : (
            <div className="user-actions">
              <Link to="/profile" className="btn btn-ghost">
                {t("profile")}
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
