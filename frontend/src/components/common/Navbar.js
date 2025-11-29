import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { I18nContext } from "../../contexts/I18nContext";
import "../../styles/globals.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, setLocale, t } = useContext(I18nContext);
  const navigate = useNavigate();

  const loggedIn = !!(
    localStorage.getItem("token") || localStorage.getItem("access_token")
  );
  const userEmail = localStorage.getItem("userEmail") || null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userEmail");
    navigate("/");
    // reload to ensure protected routes update
    window.location.reload();
  };

  return (
    <header
      className="app-header"
      role="banner"
      style={{ position: "sticky", top: 0, zIndex: 60 }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
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
            style={{ width: 52, height: 52 }}
          >
            4
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
          >
            <span
              className="display-stoewer"
              style={{ fontSize: 16, color: "var(--brand-2)" }}
            >
              ALL IN ONE
            </span>
            <small className="text-muted" style={{ fontSize: 12 }}>
              {t("for_you")}
            </small>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            {t("services")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            {t("about")}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            {t("contact")}
          </NavLink>

          <div
            style={{
              width: 1,
              height: 26,
              background: "rgba(47,61,70,0.06)",
              margin: "0 8px",
            }}
          />

          {/* language select */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="language"
            style={{ padding: 6, borderRadius: 8, border: "1px solid #e6e9ee" }}
          >
            <option value="tr">TR</option>
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>

          {/* theme toggle */}
          <button
            aria-label="Toggle theme"
            className="btn btn-ghost"
            onClick={toggleTheme}
            title={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
            style={{ padding: "6px 10px" }}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="btn btn-ghost"
                style={{ padding: "8px 12px" }}
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{ padding: "8px 14px" }}
              >
                {t("register")}
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Link
                to="/profile"
                className="btn btn-ghost"
                style={{ padding: "6px 10px" }}
              >
                {t("profile")}
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>
                {t("logout")}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
