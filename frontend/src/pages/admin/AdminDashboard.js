import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    activeAppointments: 0,
    pendingApplications: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        users: 432,
        providers: 78,
        activeAppointments: 12,
        pendingApplications: 5,
      });
      setActivities([
        {
          id: 1,
          type: "user",
          text: "Yeni kullanıcı kaydı: Mehmet Y.",
          time: "5 dakika önce",
        },
        {
          id: 2,
          type: "appointment",
          text: "Randevu onaylandı: Tesisatçı hizmeti",
          time: "15 dakika önce",
        },
        {
          id: 3,
          type: "worker",
          text: "Yeni çalışan başvurusu: Ahmet K.",
          time: "1 saat önce",
        },
        {
          id: 4,
          type: "appointment",
          text: "Randevu iptal edildi: Elektrik hizmeti",
          time: "2 saat önce",
        },
        {
          id: 5,
          type: "user",
          text: "Profil güncellendi: Ayşe T.",
          time: "3 saat önce",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon users">👥</div>
            <span className="admin-stat-trend up">+12%</span>
          </div>
          <div className="admin-stat-value">{stats.users}</div>
          <div className="admin-stat-label">Toplam Kullanıcı</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon workers">👷</div>
            <span className="admin-stat-trend up">+8%</span>
          </div>
          <div className="admin-stat-value">{stats.providers}</div>
          <div className="admin-stat-label">Hizmet Veren</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon appointments">📅</div>
            <span className="admin-stat-trend up">+23%</span>
          </div>
          <div className="admin-stat-value">{stats.activeAppointments}</div>
          <div className="admin-stat-label">Aktif Randevu</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon pending">⏳</div>
          </div>
          <div className="admin-stat-value">{stats.pendingApplications}</div>
          <div className="admin-stat-label">Bekleyen Başvuru</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Activity Feed */}
        <div className="admin-activity-card">
          <h3 className="admin-activity-title">📋 Son Aktiviteler</h3>
          <div className="admin-activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="admin-activity-item">
                <div className={`admin-activity-icon ${activity.type}`}>
                  {activity.type === "user" && "👤"}
                  {activity.type === "appointment" && "📅"}
                  {activity.type === "worker" && "👷"}
                </div>
                <div className="admin-activity-content">
                  <div className="admin-activity-text">{activity.text}</div>
                  <div className="admin-activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-activity-card">
          <h3 className="admin-activity-title">⚡ Hızlı İşlemler</h3>
          <div className="admin-quick-actions" style={{ flexDirection: "column" }}>
            <Link to="/admin/users" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">👥</span>
              Kullanıcı Yönetimi
            </Link>
            <Link to="/admin/workers" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">👷</span>
              Başvuruları İncele
            </Link>
            <Link to="/admin/categories" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📂</span>
              Kategori Yönetimi
            </Link>
            <Link to="/admin/appointments" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📅</span>
              Randevuları Görüntüle
            </Link>
            <Link to="/admin/reports" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📈</span>
              Raporlar
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
