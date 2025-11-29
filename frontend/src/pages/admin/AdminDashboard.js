import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // In a real app you'd fetch stats from the backend
  const stats = {
    users: 432,
    providers: 78,
    activeAppointments: 12,
    pendingApplications: 5,
  };

  return (
    <div className="container" style={{ padding: 24 }}>
      <h1 className="display-stoewer" style={{ fontSize: 28 }}>
        Admin Paneli
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
          marginTop: 18,
        }}
      >
        <div className="card admin-stat">
          <div className="stat-title">Kullanıcılar</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-muted">Toplam kayıtlı kullanıcı</div>
        </div>

        <div className="card admin-stat">
          <div className="stat-title">Hizmet Veren</div>
          <div className="stat-value">{stats.providers}</div>
          <div className="stat-muted">Onaylanan hizmet verenler</div>
        </div>

        <div className="card admin-stat">
          <div className="stat-title">Aktif Randevular</div>
          <div className="stat-value">{stats.activeAppointments}</div>
          <div className="stat-muted">Bugünkü/gelecek randevular</div>
        </div>

        <div className="card admin-stat">
          <div className="stat-title">Bekleyen Başvurular</div>
          <div className="stat-value">{stats.pendingApplications}</div>
          <div className="stat-muted">İşlem bekleyen uygulamalar</div>
        </div>
      </div>

      <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
        <Link to="/admin/users" className="btn btn-outline">
          Kullanıcı Yönetimi
        </Link>
        <Link to="/admin/workers" className="btn btn-outline">
          Başvurular / Ustalar
        </Link>
        <Link to="/admin/categories" className="btn btn-outline">
          Kategori Yönetimi
        </Link>
      </div>
    </div>
  );
}
