import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { workersAPI, categoriesAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/AdminPanel.css";

export default function WorkerManagement() {
  const { t } = useContext(I18nContext);
  const [workers, setWorkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [assignCategory, setAssignCategory] = useState("");

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const [workersRes, categoriesRes] = await Promise.all([
        workersAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setWorkers(workersRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error("Çalışanlar yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
      setWorkers([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (workerId) => {
    try {
      await workersAPI.approve(workerId);
      alert(t("save_success"));
      fetchWorkers();
    } catch (err) {
      alert(t("save_error"));
    }
  };

  const handleReject = async (workerId) => {
    if (!window.confirm(t("confirm"))) return;
    try {
      await workersAPI.reject(workerId);
      alert(t("save_success"));
      fetchWorkers();
    } catch (err) {
      alert(t("save_error"));
    }
  };

  const handleAssignCategory = (workerId) => {
    if (!assignCategory) {
      alert(t("error_occurred"));
      return;
    }
    // This would call an API to assign category
    alert(t("save_success"));
    setAssignCategory("");
  };

  const filteredWorkers = workers.filter(
    (w) => statusFilter === "all" || w.status === statusFilter
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "⏳ Beklemede", className: "pending" },
      approved: { label: "✓ Onaylı", className: "approved" },
      rejected: { label: "✕ Reddedildi", className: "rejected" },
    };
    return statusMap[status] || statusMap.pending;
  };

  if (loading) {
    return (
      <AdminLayout title={t("worker_management")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title={t("worker_management")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchWorkers}
        />
      </AdminLayout>
    );
  }

  const pendingCount = workers.filter((w) => w.status === "pending").length;

  return (
    <AdminLayout title={t("worker_management")}>
      {/* Stats */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon pending">⏳</div>
          </div>
          <div className="admin-stat-value">{pendingCount}</div>
          <div className="admin-stat-label">Bekleyen Başvuru</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon workers">👷</div>
          </div>
          <div className="admin-stat-value">
            {workers.filter((w) => w.status === "approved").length}
          </div>
          <div className="admin-stat-label">Aktif Çalışan</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon appointments">📅</div>
          </div>
          <div className="admin-stat-value">
            {workers.reduce((acc, w) => acc + w.approvedAppointments, 0)}
          </div>
          <div className="admin-stat-label">Toplam Randevu</div>
        </div>
      </div>

      {/* Worker List */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">👷 Çalışan Başvuruları</h3>
          
          <div className="admin-table-actions">
            <div className="provider-filter-tabs">
              <button
                className={`provider-filter-tab ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                Tümü
              </button>
              <button
                className={`provider-filter-tab ${statusFilter === "pending" ? "active" : ""}`}
                onClick={() => setStatusFilter("pending")}
              >
                Bekleyen ({pendingCount})
              </button>
              <button
                className={`provider-filter-tab ${statusFilter === "approved" ? "active" : ""}`}
                onClick={() => setStatusFilter("approved")}
              >
                Onaylı
              </button>
              <button
                className={`provider-filter-tab ${statusFilter === "rejected" ? "active" : ""}`}
                onClick={() => setStatusFilter("rejected")}
              >
                Reddedilen
              </button>
            </div>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Çalışan</th>
              <th>Kategori</th>
              <th>Deneyim</th>
              <th>Durum</th>
              <th>Başvuru Tarihi</th>
              <th>Performans</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker) => {
              const status = getStatusBadge(worker.status);
              return (
                <tr key={worker.id}>
                  <td>
                    <div className="admin-table-user">
                      <div className="admin-table-avatar">
                        {worker.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="admin-table-name">{worker.name}</div>
                        <div className="admin-table-email">{worker.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{worker.category}</strong>
                  </td>
                  <td>{worker.experience} yıl</td>
                  <td>
                    <span className={`admin-status-badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>{formatDate(worker.applyDate)}</td>
                  <td>
                    {worker.status === "approved" ? (
                      <div style={{ fontSize: 13 }}>
                        <span style={{ color: "#10b981" }}>✓ {worker.approvedAppointments}</span>
                        {" / "}
                        <span style={{ color: "#ef4444" }}>✕ {worker.rejectedAppointments}</span>
                      </div>
                    ) : (
                      <span style={{ color: "#666", fontSize: 13 }}>-</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button
                        className="admin-action-btn view"
                        onClick={() => setSelectedWorker(worker)}
                      >
                        Detay
                      </button>
                      {worker.status === "pending" && (
                        <>
                          <button
                            className="admin-action-btn approve"
                            onClick={() => handleApprove(worker.id)}
                          >
                            Onayla
                          </button>
                          <button
                            className="admin-action-btn reject"
                            onClick={() => handleReject(worker.id)}
                          >
                            Reddet
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredWorkers.length === 0 && (
          <EmptyState 
            icon="👷"
            title={t("no_data")}
            message={t("no_data")}
          />
        )}
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="modal-overlay" onClick={() => setSelectedWorker(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h3>👷 Çalışan Detayları</h3>
              <button className="modal-close" onClick={() => setSelectedWorker(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #517970, #364F53)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {selectedWorker.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ marginBottom: 4 }}>{selectedWorker.name}</h4>
                  <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{selectedWorker.email}</p>
                  <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{selectedWorker.phone}</p>
                  <span className={`admin-status-badge ${getStatusBadge(selectedWorker.status).className}`}>
                    {getStatusBadge(selectedWorker.status).label}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Kategori</span>
                  <strong>{selectedWorker.category}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Deneyim</span>
                  <strong>{selectedWorker.experience} yıl</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Başvuru Tarihi</span>
                  <strong>{formatDate(selectedWorker.applyDate)}</strong>
                </div>
                {selectedWorker.status === "approved" && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                      <span style={{ color: "#666" }}>Onaylanan Randevular</span>
                      <strong style={{ color: "#10b981" }}>{selectedWorker.approvedAppointments}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                      <span style={{ color: "#666" }}>Reddedilen Randevular</span>
                      <strong style={{ color: "#ef4444" }}>{selectedWorker.rejectedAppointments}</strong>
                    </div>
                  </>
                )}
              </div>

              {/* Category Assignment */}
              {selectedWorker.status === "approved" && (
                <div style={{ padding: 16, background: "#f2d8d8", borderRadius: 12 }}>
                  <h5 style={{ marginBottom: 12 }}>Kategori Ataması</h5>
                  <div style={{ display: "flex", gap: 12 }}>
                    <select
                      className="admin-form-select"
                      value={assignCategory}
                      onChange={(e) => setAssignCategory(e.target.value)}
                      style={{ flex: 1 }}
                    >
                      <option value="">{t("all")}</option>
                      {categories.map((cat) => (
                        <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => handleAssignCategory(selectedWorker.id)}
                    >
                      {t("save")}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedWorker.status === "pending" && (
                <>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => {
                      handleApprove(selectedWorker.id);
                      setSelectedWorker(null);
                    }}
                  >
                    ✓ Onayla
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => {
                      handleReject(selectedWorker.id);
                      setSelectedWorker(null);
                    }}
                  >
                    ✕ Reddet
                  </button>
                </>
              )}
              <button className="btn btn-ghost" onClick={() => setSelectedWorker(null)}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
