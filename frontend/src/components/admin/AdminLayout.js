import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/AdminPanel.css";

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { 
      section: "Genel", 
      items: [
        { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
      ]
    },
    { 
      section: "Yönetim", 
      items: [
        { path: "/admin/users", icon: "👥", label: "Kullanıcılar" },
        { path: "/admin/workers", icon: "👷", label: "Çalışanlar", badge: "5" },
        { path: "/admin/categories", icon: "📂", label: "Kategoriler" },
        { path: "/admin/appointments", icon: "📅", label: "Randevular" },
      ]
    },
    { 
      section: "İçerik", 
      items: [
        { path: "/admin/legal-texts", icon: "📜", label: "Hukuki Metinler" },
        { path: "/admin/reports", icon: "📈", label: "Raporlar" },
      ]
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-icon">4</div>
            <div>
              <div className="admin-sidebar-logo-text">ALL IN ONE</div>
              <div className="admin-sidebar-logo-subtitle">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((section, idx) => (
            <div key={idx} className="admin-nav-section">
              <div className="admin-nav-section-title">{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `admin-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="admin-nav-link-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="admin-nav-link-badge">{item.badge}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Menüyü Aç/Kapat"
            >
              ☰
            </button>
            <h1 className="admin-page-title">{title || "Admin Panel"}</h1>
          </div>

          <div className="admin-header-right">
            <button className="admin-header-btn" title="Bildirimler">
              🔔
            </button>
            <button className="admin-header-btn" title="Ayarlar">
              ⚙️
            </button>

            <div className="admin-user-info">
              <div className="admin-user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <span className="admin-user-name">
                {user?.name || "Admin"}
              </span>
            </div>

            <button className="admin-logout-btn" onClick={handleLogout}>
              Çıkış
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
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
