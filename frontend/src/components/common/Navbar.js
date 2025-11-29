import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { I18nContext } from "../../contexts/I18nContext";
import "../../styles/globals.css";

/*
  Navbar (updated)
  - Sticky, minimal, modern design
  - Logo (ALL IN ONE) + Menu + Language selector + "Kayıt Ol" button
  - No login/register/logout buttons
  - Theme toggle removed (will be added later)
*/

export default function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { locale, setLocale, t } = useContext(I18nContext);

  return (
    <header
      className="app-header"
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(54, 79, 83, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 1rem",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <div
              className="brand-tile"
              aria-hidden
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6DBF8C, #4A9D6F)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 18,
                boxShadow: "0 8px 24px rgba(109, 191, 140, 0.3)",
              }}
            >
              4
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <span
                className="display-stoewer"
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#364F53",
                }}
              >
                ALL IN ONE
              </span>
              <small
                className="text-muted"
                style={{ fontSize: 12, color: "rgba(47, 61, 70, 0.6)" }}
              >
                {t("for_you")}
              </small>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav
          className="desktop-only"
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {t("services")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {t("about")}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {t("contact")}
          </NavLink>
        </nav>

        {/* Right side - Language selector + Theme indicator + Register button */}
        <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="language"
            className="lang-select"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              background: "white",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <option value="tr">TR</option>
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>

          <div
            className="theme-indicator"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme === "dark" ? "🌙" : "🌞"}
          </div>

          <Link
            to="/provider/dashboard"
            className="btn-register"
            style={{
              background: "linear-gradient(135deg, #6DBF8C, #4A9D6F)",
              color: "white",
              padding: "10px 24px",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 16px rgba(109, 191, 140, 0.3)",
            }}
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </header>
  );
}
