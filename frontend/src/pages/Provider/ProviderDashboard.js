// src/pages/Provider/ProviderDashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProviderLayout from "../../components/provider/ProviderLayout";
import "../../styles/ProviderPanel.css";

export default function ProviderDashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile({
        id: 101,
        name: "Usta Ahmet",
        category: "Tesisatçı",
        region: "Berlin",
        workingHours: "09:00 - 18:00",
        rating: 4.8,
        completedJobs: 127,
      });
      setStats({
        today: 3,
        pending: 5,
        approved: 45,
        rejected: 3,
      });
      setTodayAppointments([
        {
          id: 1,
          customer: "Mehmet Y.",
          service: "Su Tesisatı",
          time: "10:00",
          status: "approved",
        },
        {
          id: 2,
          customer: "Ayşe D.",
          service: "Banyo Tamiri",
          time: "14:00",
          status: "pending",
        },
        {
          id: 3,
          customer: "Ali K.",
          service: "Mutfak Tesisatı",
          time: "16:30",
          status: "approved",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <ProviderLayout title="Dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Dashboard">
      {/* Welcome Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #364F53, #2F3D46)",
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
            Hoş geldin, {profile?.name}! 👋
          </h2>
          <p style={{ opacity: 0.8, marginBottom: 16 }}>
            {profile?.category} • {profile?.region}
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>⭐ {profile?.rating}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Puan</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{profile?.completedJobs}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Tamamlanan İş</div>
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
            Profili Düzenle
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="provider-stats-grid">
        <div className="provider-stat-card">
          <div className="provider-stat-icon today">📅</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.today}</div>
            <div className="provider-stat-label">Bugünkü Randevu</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon pending">⏳</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.pending}</div>
            <div className="provider-stat-label">Bekleyen Talep</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon approved">✓</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.approved}</div>
            <div className="provider-stat-label">Onaylanan</div>
          </div>
        </div>

        <div className="provider-stat-card">
          <div className="provider-stat-icon rejected">✕</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{stats.rejected}</div>
            <div className="provider-stat-label">Reddedilen</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginTop: 24 }}>
        {/* Today's Appointments */}
        <div className="provider-appointments-card">
          <div className="provider-appointments-header">
            <h3 className="provider-appointments-title">📅 Bugünkü Randevular</h3>
            <Link to="/provider/appointments" style={{ color: "#85A98D", fontWeight: 600, fontSize: 14 }}>
              Tümünü Gör →
            </Link>
          </div>
          <div className="provider-appointments-list">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((apt) => (
                <div key={apt.id} className="provider-appointment-item">
                  <div className="provider-appointment-date">
                    <div className="provider-appointment-time">{apt.time}</div>
                  </div>
                  <div className="provider-appointment-info">
                    <div className="provider-appointment-service">{apt.service}</div>
                    <div className="provider-appointment-customer">👤 {apt.customer}</div>
                  </div>
                  <span className={`provider-appointment-status ${apt.status}`}>
                    {apt.status === "approved" ? "✓ Onaylı" : "⏳ Beklemede"}
                  </span>
                </div>
              ))
            ) : (
              <div className="provider-empty-state">
                <div className="provider-empty-icon">📭</div>
                <div className="provider-empty-title">Bugün randevu yok</div>
                <div className="provider-empty-text">Yeni randevu talepleri için bildirimleri kontrol edin.</div>
              </div>
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
              background: "white",
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
