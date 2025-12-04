import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

const mockWorkers = [
  { 
    id: 1, 
    name: "Ahmet Koç", 
    email: "ahmet@example.com", 
    phone: "+49 123 456 7890",
    category: "Tesisatçı", 
    experience: 5,
    status: "pending", 
    applyDate: "2024-05-01",
    approvedAppointments: 0,
    rejectedAppointments: 0,
    cv: "ahmet-cv.pdf"
  },
  { 
    id: 2, 
    name: "Mustafa Demir", 
    email: "mustafa@example.com", 
    phone: "+49 234 567 8901",
    category: "Elektrikçi", 
    experience: 8,
    status: "approved", 
    applyDate: "2024-03-15",
    approvedAppointments: 45,
    rejectedAppointments: 3,
    cv: "mustafa-cv.pdf"
  },
  { 
    id: 3, 
    name: "Kemal Öz", 
    email: "kemal@example.com", 
    phone: "+49 345 678 9012",
    category: "Boyacı", 
    experience: 3,
    status: "pending", 
    applyDate: "2024-05-10",
    approvedAppointments: 0,
    rejectedAppointments: 0,
    cv: "kemal-cv.pdf"
  },
  { 
    id: 4, 
    name: "Hasan Yıldız", 
    email: "hasan@example.com", 
    phone: "+49 456 789 0123",
    category: "Marangoz", 
    experience: 10,
    status: "approved", 
    applyDate: "2024-02-01",
    approvedAppointments: 78,
    rejectedAppointments: 5,
    cv: "hasan-cv.pdf"
  },
  { 
    id: 5, 
    name: "Veli Can", 
    email: "veli@example.com", 
    phone: "+49 567 890 1234",
    category: "Temizlik", 
    experience: 2,
    status: "rejected", 
    applyDate: "2024-04-20",
    approvedAppointments: 0,
    rejectedAppointments: 0,
    cv: "veli-cv.pdf"
  },
];

const categories = [
  "Tesisatçı",
  "Elektrikçi",
  "Boyacı",
  "Marangoz",
  "Temizlik",
  "Bahçe Bakımı",
  "Klima Servis",
  "Çilingir",
];

export default function WorkerManagement() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [assignCategory, setAssignCategory] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWorkers(mockWorkers);
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (workerId) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, status: "approved" } : w))
    );
    alert("Başvuru onaylandı! Çalışana bildirim gönderildi.");
  };

  const handleReject = (workerId) => {
    if (!window.confirm("Bu başvuruyu reddetmek istediğinize emin misiniz?")) return;
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, status: "rejected" } : w))
    );
    alert("Başvuru reddedildi.");
  };

  const handleAssignCategory = (workerId) => {
    if (!assignCategory) {
      alert("Lütfen bir kategori seçin.");
      return;
    }
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, category: assignCategory } : w))
    );
    alert(`Kategori "${assignCategory}" olarak güncellendi.`);
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
      <AdminLayout title="Çalışan Yönetimi">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  const pendingCount = workers.filter((w) => w.status === "pending").length;

  return (
    <AdminLayout title="Çalışan Yönetimi">
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
          <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
            <p>Bu filtrede çalışan bulunamadı.</p>
          </div>
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
                      <option value="">Kategori seçin...</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => handleAssignCategory(selectedWorker.id)}
                    >
                      Ata
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
