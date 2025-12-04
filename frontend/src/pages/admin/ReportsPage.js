import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

const mockStats = {
  users: {
    total: 432,
    thisMonth: 45,
    growth: 12,
  },
  workers: {
    total: 78,
    active: 65,
    pending: 8,
  },
  appointments: {
    total: 1250,
    completed: 980,
    pending: 120,
    cancelled: 150,
  },
  revenue: {
    total: 45600,
    thisMonth: 8200,
    growth: 18,
  },
};

const mockMonthlyData = [
  { month: "Oca", users: 25, appointments: 80 },
  { month: "Şub", users: 32, appointments: 95 },
  { month: "Mar", users: 45, appointments: 120 },
  { month: "Nis", users: 38, appointments: 105 },
  { month: "May", users: 52, appointments: 140 },
  { month: "Haz", users: 48, appointments: 135 },
];

const mockCategoryData = [
  { name: "Tesisatçı", value: 35, color: "#85A98D" },
  { name: "Elektrikçi", value: 25, color: "#517970" },
  { name: "Boyacı", value: 20, color: "#5c8984" },
  { name: "Temizlik", value: 15, color: "#545b77" },
  { name: "Diğer", value: 5, color: "#f2d8d8" },
];

const mockAuditLogs = [
  { id: 1, action: "Kullanıcı kaydı", user: "Mehmet Y.", timestamp: "2024-05-20 14:32", type: "info" },
  { id: 2, action: "Randevu onaylandı", user: "Admin", timestamp: "2024-05-20 14:15", type: "success" },
  { id: 3, action: "Çalışan başvurusu reddedildi", user: "Admin", timestamp: "2024-05-20 13:45", type: "warning" },
  { id: 4, action: "Kategori güncellendi", user: "Admin", timestamp: "2024-05-20 12:30", type: "info" },
  { id: 5, action: "Sistem bakımı tamamlandı", user: "Sistem", timestamp: "2024-05-20 10:00", type: "success" },
  { id: 6, action: "Giriş denemesi başarısız", user: "Bilinmeyen", timestamp: "2024-05-20 09:15", type: "error" },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("month");

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const maxAppointments = Math.max(...mockMonthlyData.map((d) => d.appointments));

  if (loading) {
    return (
      <AdminLayout title="Raporlar">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Raporlar">
      {/* Tabs */}
      <div className="provider-filter-tabs" style={{ marginBottom: 24 }}>
        <button
          className={`provider-filter-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Genel Bakış
        </button>
        <button
          className={`provider-filter-tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Kullanıcılar
        </button>
        <button
          className={`provider-filter-tab ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          📅 Randevular
        </button>
        <button
          className={`provider-filter-tab ${activeTab === "audit" ? "active" : ""}`}
          onClick={() => setActiveTab("audit")}
        >
          📋 İşlem Kayıtları
        </button>
      </div>

      {/* Date Range Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["week", "month", "quarter", "year"].map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: dateRange === range ? "none" : "1px solid #ddd",
              background: dateRange === range ? "#364F53" : "white",
              color: dateRange === range ? "white" : "#374259",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {range === "week" && "Bu Hafta"}
            {range === "month" && "Bu Ay"}
            {range === "quarter" && "Bu Çeyrek"}
            {range === "year" && "Bu Yıl"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Summary Stats */}
          <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon users">👥</div>
                <span className="admin-stat-trend up">+{mockStats.users.growth}%</span>
              </div>
              <div className="admin-stat-value">{mockStats.users.total}</div>
              <div className="admin-stat-label">Toplam Kullanıcı</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon workers">👷</div>
              </div>
              <div className="admin-stat-value">{mockStats.workers.total}</div>
              <div className="admin-stat-label">Toplam Çalışan</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon appointments">📅</div>
              </div>
              <div className="admin-stat-value">{mockStats.appointments.total}</div>
              <div className="admin-stat-label">Toplam Randevu</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon pending">💶</div>
                <span className="admin-stat-trend up">+{mockStats.revenue.growth}%</span>
              </div>
              <div className="admin-stat-value">{mockStats.revenue.total.toLocaleString()}€</div>
              <div className="admin-stat-label">Toplam Gelir</div>
            </div>
          </div>

          {/* Charts */}
          <div className="admin-charts-grid">
            {/* Bar Chart */}
            <div className="admin-chart-card">
              <h3 className="admin-chart-title">📈 Aylık Randevu Trendi</h3>
              <div className="admin-chart-container">
                {mockMonthlyData.map((data, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div
                      className="admin-bar"
                      style={{
                        height: `${(data.appointments / maxAppointments) * 180}px`,
                      }}
                    />
                    <span className="admin-bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="admin-chart-card">
              <h3 className="admin-chart-title">🥧 Kategori Dağılımı</h3>
              <div className="admin-pie-container">
                <div
                  className="admin-pie"
                  style={{
                    background: `conic-gradient(
                      ${mockCategoryData[0].color} 0deg ${mockCategoryData[0].value * 3.6}deg,
                      ${mockCategoryData[1].color} ${mockCategoryData[0].value * 3.6}deg ${(mockCategoryData[0].value + mockCategoryData[1].value) * 3.6}deg,
                      ${mockCategoryData[2].color} ${(mockCategoryData[0].value + mockCategoryData[1].value) * 3.6}deg ${(mockCategoryData[0].value + mockCategoryData[1].value + mockCategoryData[2].value) * 3.6}deg,
                      ${mockCategoryData[3].color} ${(mockCategoryData[0].value + mockCategoryData[1].value + mockCategoryData[2].value) * 3.6}deg ${(mockCategoryData[0].value + mockCategoryData[1].value + mockCategoryData[2].value + mockCategoryData[3].value) * 3.6}deg,
                      ${mockCategoryData[4].color} ${(mockCategoryData[0].value + mockCategoryData[1].value + mockCategoryData[2].value + mockCategoryData[3].value) * 3.6}deg 360deg
                    )`,
                  }}
                />
                <div className="admin-pie-legend">
                  {mockCategoryData.map((item, idx) => (
                    <div key={idx} className="admin-pie-legend-item">
                      <div className="admin-pie-legend-color" style={{ background: item.color }} />
                      <span>{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">👥 Kullanıcı İstatistikleri</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 20 }}>
            <div style={{ textAlign: "center", padding: 24, background: "#F9F1F1", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#364F53" }}>{mockStats.users.total}</div>
              <div style={{ color: "#666", marginTop: 4 }}>Toplam Kullanıcı</div>
            </div>
            <div style={{ textAlign: "center", padding: 24, background: "#F9F1F1", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#85A98D" }}>{mockStats.users.thisMonth}</div>
              <div style={{ color: "#666", marginTop: 4 }}>Bu Ay Kayıt</div>
            </div>
            <div style={{ textAlign: "center", padding: 24, background: "#F9F1F1", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#10b981" }}>+{mockStats.users.growth}%</div>
              <div style={{ color: "#666", marginTop: 4 }}>Büyüme</div>
            </div>
          </div>

          <h4 style={{ marginTop: 32, marginBottom: 16 }}>📊 Aylık Kayıt Trendi</h4>
          <div className="admin-chart-container">
            {mockMonthlyData.map((data, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    width: "100%",
                    height: `${data.users * 3}px`,
                    background: "linear-gradient(180deg, #85A98D, #517970)",
                    borderRadius: "8px 8px 0 0",
                    minHeight: 20,
                  }}
                />
                <span style={{ fontSize: 11, color: "#666", marginTop: 8 }}>{data.month}</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{data.users}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">📅 Randevu İstatistikleri</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
            <div style={{ textAlign: "center", padding: 20, background: "#F9F1F1", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#364F53" }}>{mockStats.appointments.total}</div>
              <div style={{ color: "#666", marginTop: 4, fontSize: 13 }}>Toplam</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(16, 185, 129, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#10b981" }}>{mockStats.appointments.completed}</div>
              <div style={{ color: "#666", marginTop: 4, fontSize: 13 }}>Tamamlanan</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(245, 158, 11, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b" }}>{mockStats.appointments.pending}</div>
              <div style={{ color: "#666", marginTop: 4, fontSize: 13 }}>Bekleyen</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(239, 68, 68, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ef4444" }}>{mockStats.appointments.cancelled}</div>
              <div style={{ color: "#666", marginTop: 4, fontSize: 13 }}>İptal</div>
            </div>
          </div>

          <h4 style={{ marginTop: 32, marginBottom: 16 }}>📊 Aylık Randevu Trendi</h4>
          <div className="admin-chart-container">
            {mockMonthlyData.map((data, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    width: "100%",
                    height: `${(data.appointments / maxAppointments) * 180}px`,
                    background: "linear-gradient(180deg, #517970, #364F53)",
                    borderRadius: "8px 8px 0 0",
                    minHeight: 20,
                  }}
                />
                <span style={{ fontSize: 11, color: "#666", marginTop: 8 }}>{data.month}</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{data.appointments}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === "audit" && (
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">📋 İşlem Kayıtları (Audit Log)</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tarih & Saat</th>
                <th>İşlem</th>
                <th>Kullanıcı</th>
                <th>Tür</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 13 }}>{log.timestamp}</td>
                  <td><strong>{log.action}</strong></td>
                  <td>{log.user}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background:
                          log.type === "success" ? "rgba(16, 185, 129, 0.15)" :
                          log.type === "warning" ? "rgba(245, 158, 11, 0.15)" :
                          log.type === "error" ? "rgba(239, 68, 68, 0.15)" :
                          "rgba(84, 91, 119, 0.15)",
                        color:
                          log.type === "success" ? "#10b981" :
                          log.type === "warning" ? "#f59e0b" :
                          log.type === "error" ? "#ef4444" :
                          "#545b77",
                      }}
                    >
                      {log.type === "success" && "✓ Başarılı"}
                      {log.type === "warning" && "⚠ Uyarı"}
                      {log.type === "error" && "✕ Hata"}
                      {log.type === "info" && "ℹ Bilgi"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
