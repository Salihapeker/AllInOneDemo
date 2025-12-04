import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/ProviderPanel.css";

export default function ProviderLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/provider/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/provider/appointments", icon: "📅", label: "Randevular", badge: "3" },
    { path: "/provider/calendar", icon: "🗓️", label: "Takvim" },
    { path: "/provider/profile", icon: "👤", label: "Profil" },
  ];

  return (
    <div className="provider-layout">
      {/* Sidebar */}
      <aside className={`provider-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="provider-sidebar-header">
          <div className="provider-sidebar-profile">
            <div className="provider-sidebar-avatar">👷</div>
            <div className="provider-sidebar-info">
              <div className="provider-sidebar-name">
                {user?.name || "Hizmet Veren"}
              </div>
              <div className="provider-sidebar-role">
                {user?.category || "Tesisatçı"}
              </div>
              <div className="provider-sidebar-status">
                <span className="provider-status-dot"></span>
                <span>Aktif</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="provider-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `provider-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="provider-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="provider-nav-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div style={{ marginTop: "auto", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <NavLink
            to="/"
            className="provider-nav-link"
            style={{ opacity: 0.7 }}
          >
            <span className="provider-nav-icon">🏠</span>
            <span>Ana Sayfa</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="provider-nav-link"
            style={{ 
              width: "100%", 
              background: "none", 
              border: "none", 
              cursor: "pointer",
              opacity: 0.7 
            }}
          >
            <span className="provider-nav-icon">🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="provider-main">
        {/* Header */}
        <header className="provider-header">
          <div className="provider-header-left">
            <button
              className="provider-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Menüyü Aç/Kapat"
            >
              ☰
            </button>
            <h1 className="provider-page-title">{title || "Hizmet Veren Paneli"}</h1>
          </div>

          <div className="provider-header-right">
            <button className="provider-notification-btn" title="Bildirimler">
              🔔
              <span className="provider-notification-badge">2</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="provider-content">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="provider-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "block",
          }}
        />
      )}
    </div>
  );
}
