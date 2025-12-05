import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { I18nContext } from "../../contexts/I18nContext";
import brandLogo from "../../assets/brand-logo.png";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, setLocale, t } = useContext(I18nContext);

  return (
    <header className="app-header" data-theme={theme}>
      <div className="container header-content">
        {/* Logo */}
        <Link to="/" className="brand">
          <img src={brandLogo} alt="All In One Logo" className="brand-logo" />
          <div className="brand-info">
            <span className="brand-name">ALL IN ONE</span>
            <small className="brand-tagline">{t("for_you") || "for you"}</small>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <NavLink to="/" className="nav-link">
            {t("home") || "Ana Sayfa"}
          </NavLink>
          <NavLink to="/hizmetler" className="nav-link">
            {t("services") || "Hizmetler"}
          </NavLink>
          <NavLink to="/hakkimizda" className="nav-link">
            {t("about") || "Hakkımızda"}
          </NavLink>
          <NavLink to="/iletisim" className="nav-link">
            {t("contact") || "İletişim"}
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Language Selector */}
          <select
            className="lang-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="Dil seçimi"
          >
            <option value="tr">🇹🇷 TR</option>
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Tema değiştir"
            title={theme === "light" ? "Karanlık mod" : "Aydınlık mod"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Login Button */}
          <Link to="/login" className="btn-outline btn-nav">
            {t("login") || "Giriş"}
          </Link>

          {/* Register Button */}
          <Link to="/register" className="btn-primary btn-nav">
            {t("register") || "Kayıt Ol"}
          </Link>
        </div>
      </div>
    </header>
  );
}
