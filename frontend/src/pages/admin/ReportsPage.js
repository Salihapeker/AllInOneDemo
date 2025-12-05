import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { reportsAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/AdminPanel.css";

export default function ReportsPage() {
  const { t } = useContext(I18nContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("month");
  const [stats, setStats] = useState({
    users: { total: 0, thisMonth: 0, growth: 0 },
    workers: { total: 0, active: 0, pending: 0 },
    appointments: { total: 0, completed: 0, pending: 0, cancelled: 0 },
    revenue: { total: 0, thisMonth: 0, growth: 0 },
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportsAPI.getDashboardStats();
      const data = response.data || {};
      setStats(data.stats || {
        users: { total: 0, thisMonth: 0, growth: 0 },
        workers: { total: 0, active: 0, pending: 0 },
        appointments: { total: 0, completed: 0, pending: 0, cancelled: 0 },
        revenue: { total: 0, thisMonth: 0, growth: 0 },
      });
      setMonthlyData(data.monthlyData || []);
      setCategoryData(data.categoryData || []);
      setAuditLogs(data.auditLogs || []);
    } catch (err) {
      console.error("Rapor verileri yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxAppointments = monthlyData.length > 0 
    ? Math.max(...monthlyData.map((d) => d.appointments || 0), 1)
    : 1;

  if (loading) {
    return (
      <AdminLayout title={t("reports")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title={t("reports")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchReportData}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={t("reports")}>
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
                {stats.users.growth > 0 && <span className="admin-stat-trend up">+{stats.users.growth}%</span>}
              </div>
              <div className="admin-stat-value">{stats.users.total}</div>
              <div className="admin-stat-label">{t("total_users")}</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon workers">👷</div>
              </div>
              <div className="admin-stat-value">{stats.workers.total}</div>
              <div className="admin-stat-label">{t("workers")}</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon appointments">📅</div>
              </div>
              <div className="admin-stat-value">{stats.appointments.total}</div>
              <div className="admin-stat-label">{t("appointments")}</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon pending">💶</div>
                {stats.revenue.growth > 0 && <span className="admin-stat-trend up">+{stats.revenue.growth}%</span>}
              </div>
              <div className="admin-stat-value">{stats.revenue.total.toLocaleString()}€</div>
              <div className="admin-stat-label">Gelir</div>
            </div>
          </div>

          {/* Charts */}
          {monthlyData.length > 0 ? (
            <div className="admin-charts-grid">
              {/* Bar Chart */}
              <div className="admin-chart-card">
                <h3 className="admin-chart-title">📈 Aylık Randevu Trendi</h3>
                <div className="admin-chart-container">
                  {monthlyData.map((data, idx) => (
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
              {categoryData.length > 0 && (
                <div className="admin-chart-card">
                  <h3 className="admin-chart-title">🥧 Kategori Dağılımı</h3>
                  <div className="admin-pie-container">
                    <div className="admin-pie-legend">
                      {categoryData.map((item, idx) => (
                        <div key={idx} className="admin-pie-legend-item">
                          <div className="admin-pie-legend-color" style={{ background: item.color || "#85A98D" }} />
                          <span>{item.name} ({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState 
              icon="📊"
              title={t("no_data")}
              message={t("no_data")}
            />
          )}
        </>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">👥 {t("users")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 20 }}>
            <div style={{ textAlign: "center", padding: 24, background: "var(--bg-secondary)", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--text-primary)" }}>{stats.users.total}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4 }}>{t("total_users")}</div>
            </div>
            <div style={{ textAlign: "center", padding: 24, background: "var(--bg-secondary)", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--accent-1)" }}>{stats.users.thisMonth}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4 }}>Bu Ay</div>
            </div>
            <div style={{ textAlign: "center", padding: 24, background: "var(--bg-secondary)", borderRadius: 12 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--success)" }}>+{stats.users.growth}%</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4 }}>Büyüme</div>
            </div>
          </div>

          {monthlyData.length > 0 ? (
            <>
              <h4 style={{ marginTop: 32, marginBottom: 16 }}>📊 Aylık Kayıt Trendi</h4>
              <div className="admin-chart-container">
                {monthlyData.map((data, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${(data.users || 0) * 3}px`,
                        background: "linear-gradient(180deg, #85A98D, #517970)",
                        borderRadius: "8px 8px 0 0",
                        minHeight: 20,
                      }}
                    />
                    <span style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8 }}>{data.month}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{data.users || 0}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState 
              icon="📊"
              title={t("no_data")}
              message={t("no_data")}
            />
          )}
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">📅 {t("appointments")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
            <div style={{ textAlign: "center", padding: 20, background: "var(--bg-secondary)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)" }}>{stats.appointments.total}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4, fontSize: 13 }}>{t("all")}</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(16, 185, 129, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--success)" }}>{stats.appointments.completed}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4, fontSize: 13 }}>{t("approved")}</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(245, 158, 11, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--warning)" }}>{stats.appointments.pending}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4, fontSize: 13 }}>{t("pending")}</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "rgba(239, 68, 68, 0.1)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--error)" }}>{stats.appointments.cancelled}</div>
              <div style={{ color: "var(--text-secondary)", marginTop: 4, fontSize: 13 }}>{t("cancelled")}</div>
            </div>
          </div>

          {monthlyData.length > 0 ? (
            <>
              <h4 style={{ marginTop: 32, marginBottom: 16 }}>📊 Aylık Randevu Trendi</h4>
              <div className="admin-chart-container">
                {monthlyData.map((data, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${((data.appointments || 0) / maxAppointments) * 180}px`,
                        background: "linear-gradient(180deg, #517970, #364F53)",
                        borderRadius: "8px 8px 0 0",
                        minHeight: 20,
                      }}
                    />
                    <span style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8 }}>{data.month}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{data.appointments || 0}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState 
              icon="📊"
              title={t("no_data")}
              message={t("no_data")}
            />
          )}
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === "audit" && (
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">📋 İşlem Kayıtları</h3>
          </div>
          {auditLogs.length > 0 ? (
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
                {auditLogs.map((log) => (
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
          ) : (
            <EmptyState 
              icon="📋"
              title={t("no_data")}
              message={t("no_data")}
            />
          )}
        </div>
      )}
    </AdminLayout>
  );
}
