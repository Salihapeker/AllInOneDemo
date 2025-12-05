// src/pages/Provider/ProviderDashboard.js
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProviderLayout from "../../components/provider/ProviderLayout";
import { providersAPI, appointmentsAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/ProviderPanel.css";

export default function ProviderDashboard() {
  const { t } = useContext(I18nContext);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch provider profile and appointments
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.id) {
          const [profileRes, appointmentsRes] = await Promise.all([
            providersAPI.getById(user.id).catch(() => ({ data: null })),
            appointmentsAPI.getMyAppointments().catch(() => ({ data: [] })),
          ]);
          
          setProfile(profileRes.data || {
            id: user.id,
            name: user.name || user.full_name || t("profile"),
            category: user.category || "",
            region: user.region || "",
            workingHours: user.workingHours || "",
            rating: 0,
            completedJobs: 0,
          });
          
          const appointments = appointmentsRes.data || [];
          const today = new Date().toISOString().split("T")[0];
          const todayAppts = appointments.filter(a => a.date === today);
          
          setTodayAppointments(todayAppts);
          setStats({
            today: todayAppts.length,
            pending: appointments.filter(a => a.status === "pending").length,
            approved: appointments.filter(a => a.status === "approved").length,
            rejected: appointments.filter(a => a.status === "rejected").length,
          });
        }
      } catch (err) {
        console.error("Dashboard verileri yüklenirken hata:", err);
        setError(err.message || t("error_occurred"));
        // Set empty defaults
        setProfile(null);
        setStats({ today: 0, pending: 0, approved: 0, rejected: 0 });
        setTodayAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  if (loading) {
    return (
      <ProviderLayout title="Dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </ProviderLayout>
    );
  }

  if (error) {
    return (
      <ProviderLayout title="Dashboard">
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Dashboard">
      {/* Welcome Card */}
      <div
        style={{
          background: "var(--gradient-card)",
          borderRadius: 20,
          padding: 32,
          color: "white",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            {t("welcome_back")}, {profile?.name || t("profile")}! 👋
          </h2>
          <p style={{ opacity: 0.8, marginBottom: 16 }}>
            {profile?.category} • {profile?.region}
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>⭐ {profile?.rating || 0}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{t("rating")}</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{profile?.completedJobs || 0}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{t("completed_jobs")}</div>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/provider/profile"
            className="btn"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 12,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("edit_profile")}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="provider-stats-grid">
        <div className="provider-stat-card">
          <div className="provider-stat-icon today">📅</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.today}</div>
            <div className="provider-stat-label">{t("todays_appointments")}</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon pending">⏳</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.pending}</div>
            <div className="provider-stat-label">{t("pending")}</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon approved">✓</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.approved}</div>
            <div className="provider-stat-label">{t("approved")}</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon rejected">✕</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.rejected}</div>
            <div className="provider-stat-label">{t("rejected")}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginTop: 24 }}>
        {/* Today's Appointments */}
        <div className="provider-appointments-card">
          <div className="provider-appointments-header">
            <h3 className="provider-appointments-title">📅 {t("todays_appointments")}</h3>
            <Link to="/provider/appointments" style={{ color: "var(--accent-1)", fontWeight: 600, fontSize: 14 }}>
              {t("view_all")} →
            </Link>
          </div>
          <div className="provider-appointments-list">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((apt) => (
                <div key={apt.id} className="provider-appointment-item">
                  <div className="provider-appointment-date">
                    <div className="provider-appointment-time">{apt.time || apt.time_slot}</div>
                  </div>
                  <div className="provider-appointment-info">
                    <div className="provider-appointment-service">{apt.service || apt.service_name}</div>
                    <div className="provider-appointment-customer">👤 {apt.customer?.name || apt.customer_name}</div>
                  </div>
                  <span className={`provider-appointment-status ${apt.status}`}>
                    {apt.status === "approved" ? `✓ ${t("approved")}` : `⏳ ${t("pending")}`}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState 
                icon="📭"
                title={t("no_appointments")}
                message={t("no_appointments")}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Link
            to="/provider/appointments"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              background: "var(--bg-card)",
              borderRadius: 16,
              textDecoration: "none",
              color: "#374259",
              boxShadow: "0 4px 16px rgba(54, 79, 83, 0.08)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: 32 }}>📅</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Randevuları Yönet</div>
              <div style={{ fontSize: 13, color: "#666" }}>Gelen talepleri görüntüle</div>
            </div>
          </Link>

          <Link
            to="/provider/calendar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              background: "white",
              borderRadius: 16,
              textDecoration: "none",
              color: "#374259",
              boxShadow: "0 4px 16px rgba(54, 79, 83, 0.08)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: 32 }}>🗓️</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Takvim</div>
              <div style={{ fontSize: 13, color: "#666" }}>Uygunluk zamanlarını ayarla</div>
            </div>
          </Link>

          <Link
            to="/provider/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 20,
              background: "white",
              borderRadius: 16,
              textDecoration: "none",
              color: "#374259",
              boxShadow: "0 4px 16px rgba(54, 79, 83, 0.08)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: 32 }}>👤</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Profil</div>
              <div style={{ fontSize: 13, color: "#666" }}>Bilgilerini güncelle</div>
            </div>
          </Link>
        </div>
      </div>
    </ProviderLayout>
  );
}
