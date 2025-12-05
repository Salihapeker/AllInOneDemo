import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { reportsAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/AdminPanel.css";

export default function AdminDashboard() {
  const { t } = useContext(I18nContext);
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    activeAppointments: 0,
    pendingApplications: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await reportsAPI.getDashboardStats();
        setStats(response.data.stats || {
          users: 0,
          providers: 0,
          activeAppointments: 0,
          pendingApplications: 0,
        });
        setActivities(response.data.activities || []);
      } catch (err) {
        console.error("Dashboard verileri yüklenirken hata:", err);
        setError(err.message || t("error_occurred"));
        // No mock data - show empty state
        setStats({
          users: 0,
          providers: 0,
          activeAppointments: 0,
          pendingApplications: 0,
        });
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]);

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()}
        />
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
          </div>
          <div className="admin-stat-value">{stats.users}</div>
          <div className="admin-stat-label">{t("total_users")}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon workers">👷</div>
          </div>
          <div className="admin-stat-value">{stats.providers}</div>
          <div className="admin-stat-label">{t("total_providers")}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon appointments">📅</div>
          </div>
          <div className="admin-stat-value">{stats.activeAppointments}</div>
          <div className="admin-stat-label">{t("active_appointments")}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon pending">⏳</div>
          </div>
          <div className="admin-stat-value">{stats.pendingApplications}</div>
          <div className="admin-stat-label">{t("pending_applications")}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Activity Feed */}
        <div className="admin-activity-card">
          <h3 className="admin-activity-title">📋 {t("recent_activities")}</h3>
          <div className="admin-activity-list">
            {activities.length > 0 ? (
              activities.map((activity) => (
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
              ))
            ) : (
              <EmptyState 
                icon="📭"
                title={t("no_data")}
                message={t("no_appointments")}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-activity-card">
          <h3 className="admin-activity-title">⚡ {t("quick_actions")}</h3>
          <div className="admin-quick-actions" style={{ flexDirection: "column" }}>
            <Link to="/admin/users" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">👥</span>
              {t("user_management")}
            </Link>
            <Link to="/admin/workers" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">👷</span>
              {t("worker_management")}
            </Link>
            <Link to="/admin/categories" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📂</span>
              {t("category_management")}
            </Link>
            <Link to="/admin/appointments" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📅</span>
              {t("appointment_management")}
            </Link>
            <Link to="/admin/reports" className="admin-quick-action-btn">
              <span className="admin-quick-action-icon">📈</span>
              {t("reports")}
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
