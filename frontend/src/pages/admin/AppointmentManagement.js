import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

const mockAppointments = [
  {
    id: 1,
    customer: { name: "Mehmet Yılmaz", email: "mehmet@example.com" },
    worker: { name: "Ahmet Koç", category: "Tesisatçı" },
    service: "Su Tesisatı Tamiri",
    date: "2024-05-20",
    time: "10:00",
    status: "pending",
    notes: "Mutfak lavabosunda sızıntı var.",
  },
  {
    id: 2,
    customer: { name: "Ayşe Demir", email: "ayse@example.com" },
    worker: { name: "Mustafa Demir", category: "Elektrikçi" },
    service: "Elektrik Arıza",
    date: "2024-05-20",
    time: "14:00",
    status: "approved",
    notes: "Oturma odasında priz çalışmıyor.",
  },
  {
    id: 3,
    customer: { name: "Ali Kaya", email: "ali@example.com" },
    worker: { name: "Kemal Öz", category: "Boyacı" },
    service: "İç Cephe Boyama",
    date: "2024-05-21",
    time: "09:00",
    status: "pending",
    notes: "2 oda boyatılacak.",
  },
  {
    id: 4,
    customer: { name: "Fatma Öz", email: "fatma@example.com" },
    worker: { name: "Hasan Yıldız", category: "Marangoz" },
    service: "Mobilya Montaj",
    date: "2024-05-19",
    time: "11:00",
    status: "rejected",
    notes: "Dolap montajı yapılacak.",
  },
  {
    id: 5,
    customer: { name: "Zeynep Ak", email: "zeynep@example.com" },
    worker: { name: "Ahmet Koç", category: "Tesisatçı" },
    service: "Banyo Tesisatı",
    date: "2024-05-22",
    time: "15:00",
    status: "approved",
    notes: "Duş başlığı değişimi.",
  },
];

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [...new Set(mockAppointments.map((a) => a.worker.category))];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.date === dateFilter;
    const matchesCategory = !categoryFilter || apt.worker.category === categoryFilter;
    return matchesStatus && matchesDate && matchesCategory;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      weekday: "long",
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

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    alert(`Randevu durumu "${newStatus === "approved" ? "Onaylı" : "Reddedildi"}" olarak güncellendi.`);
  };

  if (loading) {
    return (
      <AdminLayout title="Randevu Yönetimi">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const approvedCount = appointments.filter((a) => a.status === "approved").length;

  return (
    <AdminLayout title="Randevu Yönetimi">
      {/* Stats */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon pending">⏳</div>
          </div>
          <div className="admin-stat-value">{pendingCount}</div>
          <div className="admin-stat-label">Bekleyen</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon appointments">✓</div>
          </div>
          <div className="admin-stat-value">{approvedCount}</div>
          <div className="admin-stat-label">Onaylanan</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon workers">📅</div>
          </div>
          <div className="admin-stat-value">{appointments.length}</div>
          <div className="admin-stat-label">Toplam Randevu</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">📅 Tüm Randevular</h3>
          
          <div className="admin-table-actions" style={{ flexWrap: "wrap", gap: 12 }}>
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
                Bekleyen
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

            <input
              type="date"
              className="admin-form-input"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ width: 180 }}
            />

            <select
              className="admin-form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: 150 }}
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {(dateFilter || categoryFilter) && (
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setDateFilter("");
                  setCategoryFilter("");
                }}
              >
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Müşteri</th>
              <th>Hizmet</th>
              <th>Çalışan</th>
              <th>Tarih & Saat</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => {
              const status = getStatusBadge(apt.status);
              return (
                <tr key={apt.id}>
                  <td>
                    <div className="admin-table-user">
                      <div className="admin-table-avatar">
                        {apt.customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="admin-table-name">{apt.customer.name}</div>
                        <div className="admin-table-email">{apt.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{apt.service}</strong>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{apt.worker.name}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>{apt.worker.category}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{formatDate(apt.date)}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>Saat: {apt.time}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status-badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button
                        className="admin-action-btn view"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        Detay
                      </button>
                      {apt.status === "pending" && (
                        <>
                          <button
                            className="admin-action-btn approve"
                            onClick={() => handleStatusChange(apt.id, "approved")}
                          >
                            Onayla
                          </button>
                          <button
                            className="admin-action-btn reject"
                            onClick={() => handleStatusChange(apt.id, "rejected")}
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

        {filteredAppointments.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
            <p>Bu filtrede randevu bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h3>📅 Randevu Detayları</h3>
              <button className="modal-close" onClick={() => setSelectedAppointment(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "grid", gap: 16 }}>
                {/* Service Info */}
                <div style={{ padding: 20, background: "linear-gradient(135deg, #364F53, #2F3D46)", borderRadius: 16, color: "white" }}>
                  <h4 style={{ marginBottom: 8 }}>{selectedAppointment.service}</h4>
                  <div style={{ display: "flex", gap: 16, fontSize: 14, opacity: 0.9 }}>
                    <span>📅 {formatDate(selectedAppointment.date)}</span>
                    <span>⏰ {selectedAppointment.time}</span>
                  </div>
                </div>

                {/* Customer */}
                <div style={{ padding: "16px", background: "#F9F1F1", borderRadius: 12 }}>
                  <h5 style={{ marginBottom: 12, color: "#666", fontSize: 12, textTransform: "uppercase" }}>Müşteri</h5>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#85A98D", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
                      {selectedAppointment.customer.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{selectedAppointment.customer.name}</div>
                      <div style={{ fontSize: 13, color: "#666" }}>{selectedAppointment.customer.email}</div>
                    </div>
                  </div>
                </div>

                {/* Worker */}
                <div style={{ padding: "16px", background: "#F9F1F1", borderRadius: 12 }}>
                  <h5 style={{ marginBottom: 12, color: "#666", fontSize: 12, textTransform: "uppercase" }}>Çalışan</h5>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#517970", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
                      {selectedAppointment.worker.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{selectedAppointment.worker.name}</div>
                      <div style={{ fontSize: 13, color: "#666" }}>{selectedAppointment.worker.category}</div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedAppointment.notes && (
                  <div style={{ padding: "16px", background: "#f2d8d8", borderRadius: 12 }}>
                    <h5 style={{ marginBottom: 8 }}>📝 Notlar</h5>
                    <p style={{ fontSize: 14, color: "#374259" }}>{selectedAppointment.notes}</p>
                  </div>
                )}

                {/* Status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#F9F1F1", borderRadius: 12 }}>
                  <span style={{ color: "#666" }}>Durum</span>
                  <span className={`admin-status-badge ${getStatusBadge(selectedAppointment.status).className}`}>
                    {getStatusBadge(selectedAppointment.status).label}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, "approved");
                      setSelectedAppointment(null);
                    }}
                  >
                    ✓ Onayla
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, "rejected");
                      setSelectedAppointment(null);
                    }}
                  >
                    ✕ Reddet
                  </button>
                </>
              )}
              <button className="btn btn-ghost" onClick={() => setSelectedAppointment(null)}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
