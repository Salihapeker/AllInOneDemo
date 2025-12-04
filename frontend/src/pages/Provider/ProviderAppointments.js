import React, { useState, useEffect } from "react";
import ProviderLayout from "../../components/provider/ProviderLayout";
import "../../styles/ProviderPanel.css";

const mockAppointments = [
  {
    id: 1,
    customer: { name: "Mehmet Yılmaz", email: "mehmet@example.com", phone: "+49 123 456 7890" },
    service: "Su Tesisatı Tamiri",
    date: "2024-05-20",
    time: "10:00",
    status: "pending",
    notes: "Mutfak lavabosunda sızıntı var. Acil müdahale gerekiyor.",
    address: "Musterstraße 123, 12345 Berlin",
  },
  {
    id: 2,
    customer: { name: "Ayşe Demir", email: "ayse@example.com", phone: "+49 234 567 8901" },
    service: "Banyo Tesisatı",
    date: "2024-05-20",
    time: "14:00",
    status: "approved",
    notes: "Duş başlığı değişimi yapılacak.",
    address: "Beispielweg 45, 10115 Berlin",
  },
  {
    id: 3,
    customer: { name: "Ali Kaya", email: "ali@example.com", phone: "+49 345 678 9012" },
    service: "Mutfak Tesisatı",
    date: "2024-05-21",
    time: "09:00",
    status: "pending",
    notes: "Bulaşık makinesi bağlantısı yapılacak.",
    address: "Hauptstraße 78, 10827 Berlin",
  },
  {
    id: 4,
    customer: { name: "Fatma Öz", email: "fatma@example.com", phone: "+49 456 789 0123" },
    service: "Kalorifer Tamiri",
    date: "2024-05-19",
    time: "11:00",
    status: "rejected",
    notes: "Kalorifer petekleri ısınmıyor.",
    address: "Nebenstraße 12, 10965 Berlin",
  },
  {
    id: 5,
    customer: { name: "Zeynep Ak", email: "zeynep@example.com", phone: "+49 567 890 1234" },
    service: "Genel Kontrol",
    date: "2024-05-22",
    time: "15:00",
    status: "pending",
    notes: "Tüm su tesisatının kontrolü isteniyor.",
    address: "Ringstraße 99, 10435 Berlin",
  },
];

export default function ProviderAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "approved" } : apt))
    );
    showToast("Randevu onaylandı! Müşteriye bildirim gönderildi.", "success");
    setSelectedAppointment(null);
  };

  const handleReject = (id) => {
    if (!window.confirm("Bu randevuyu reddetmek istediğinize emin misiniz?")) return;
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "rejected" } : apt))
    );
    showToast("Randevu reddedildi.", "error");
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("tr-TR", { month: "short" }),
      weekday: date.toLocaleDateString("tr-TR", { weekday: "short" }),
    };
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: { label: "⏳ Beklemede", className: "pending" },
      approved: { label: "✓ Onaylı", className: "approved" },
      rejected: { label: "✕ Reddedildi", className: "rejected" },
    };
    return map[status] || map.pending;
  };

  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  if (loading) {
    return (
      <ProviderLayout title="Randevular">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Randevular">
      {/* Stats Summary */}
      <div className="provider-stats-grid" style={{ marginBottom: 24 }}>
        <div className="provider-stat-card">
          <div className="provider-stat-icon pending">⏳</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{pendingCount}</div>
            <div className="provider-stat-label">Bekleyen</div>
          </div>
        </div>
        <div className="provider-stat-card">
          <div className="provider-stat-icon approved">✓</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{appointments.filter((a) => a.status === "approved").length}</div>
            <div className="provider-stat-label">Onaylanan</div>
          </div>
        </div>
        <div className="provider-stat-card">
          <div className="provider-stat-icon today">📅</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{appointments.length}</div>
            <div className="provider-stat-label">Toplam</div>
          </div>
        </div>
      </div>

      {/* Appointments Card */}
      <div className="provider-appointments-card">
        <div className="provider-appointments-header">
          <h3 className="provider-appointments-title">📅 Randevu Talepleri</h3>
          <div className="provider-filter-tabs">
            <button
              className={`provider-filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tümü
            </button>
            <button
              className={`provider-filter-tab ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Bekleyen ({pendingCount})
            </button>
            <button
              className={`provider-filter-tab ${filter === "approved" ? "active" : ""}`}
              onClick={() => setFilter("approved")}
            >
              Onaylı
            </button>
            <button
              className={`provider-filter-tab ${filter === "rejected" ? "active" : ""}`}
              onClick={() => setFilter("rejected")}
            >
              Reddedilen
            </button>
          </div>
        </div>

        <div className="provider-appointments-list">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => {
              const dateInfo = formatDate(apt.date);
              const status = getStatusBadge(apt.status);
              return (
                <div key={apt.id} className="provider-appointment-item">
                  <div className="provider-appointment-date">
                    <div className="provider-appointment-day">{dateInfo.day}</div>
                    <div className="provider-appointment-month">{dateInfo.month}</div>
                    <div className="provider-appointment-time">{apt.time}</div>
                  </div>
                  <div className="provider-appointment-info">
                    <div className="provider-appointment-service">{apt.service}</div>
                    <div className="provider-appointment-customer">
                      👤 {apt.customer.name}
                    </div>
                  </div>
                  <span className={`provider-appointment-status ${status.className}`}>
                    {status.label}
                  </span>
                  <div className="provider-appointment-actions">
                    <button
                      className="provider-action-btn view"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      Detay
                    </button>
                    {apt.status === "pending" && (
                      <>
                        <button
                          className="provider-action-btn approve"
                          onClick={() => handleApprove(apt.id)}
                        >
                          Onayla
                        </button>
                        <button
                          className="provider-action-btn reject"
                          onClick={() => handleReject(apt.id)}
                        >
                          Reddet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="provider-empty-state">
              <div className="provider-empty-icon">📭</div>
              <div className="provider-empty-title">Randevu bulunamadı</div>
              <div className="provider-empty-text">Bu filtrede randevu bulunmuyor.</div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550 }}>
            <div className="modal-header">
              <h3>📅 Randevu Detayları</h3>
              <button className="modal-close" onClick={() => setSelectedAppointment(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Service Info */}
              <div
                style={{
                  background: "linear-gradient(135deg, #517970, #364F53)",
                  borderRadius: 16,
                  padding: 20,
                  color: "white",
                  marginBottom: 20,
                }}
              >
                <h4 style={{ marginBottom: 8 }}>{selectedAppointment.service}</h4>
                <div style={{ display: "flex", gap: 16, fontSize: 14, opacity: 0.9 }}>
                  <span>📅 {formatDate(selectedAppointment.date).day} {formatDate(selectedAppointment.date).month}</span>
                  <span>⏰ {selectedAppointment.time}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ marginBottom: 16 }}>
                <h5 style={{ marginBottom: 12, color: "#666", fontSize: 12, textTransform: "uppercase" }}>Müşteri Bilgileri</h5>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F9F1F1", borderRadius: 10 }}>
                    <span>👤</span>
                    <span style={{ fontWeight: 600 }}>{selectedAppointment.customer.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F9F1F1", borderRadius: 10 }}>
                    <span>📧</span>
                    <span>{selectedAppointment.customer.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F9F1F1", borderRadius: 10 }}>
                    <span>📞</span>
                    <span>{selectedAppointment.customer.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F9F1F1", borderRadius: 10 }}>
                    <span>📍</span>
                    <span>{selectedAppointment.address}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedAppointment.notes && (
                <div style={{ padding: 16, background: "#f2d8d8", borderRadius: 12, marginBottom: 16 }}>
                  <h5 style={{ marginBottom: 8 }}>📝 Müşteri Notu</h5>
                  <p style={{ fontSize: 14, color: "#374259" }}>{selectedAppointment.notes}</p>
                </div>
              )}

              {/* Status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#F9F1F1", borderRadius: 10 }}>
                <span style={{ color: "#666" }}>Durum</span>
                <span className={`provider-appointment-status ${getStatusBadge(selectedAppointment.status).className}`}>
                  {getStatusBadge(selectedAppointment.status).label}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    className="provider-action-btn approve"
                    style={{ padding: "12px 24px" }}
                    onClick={() => handleApprove(selectedAppointment.id)}
                  >
                    ✓ Onayla
                  </button>
                  <button
                    className="provider-action-btn reject"
                    style={{ padding: "12px 24px" }}
                    onClick={() => handleReject(selectedAppointment.id)}
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

      {/* Toast Notification */}
      {toast && (
        <div className={`provider-toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}
    </ProviderLayout>
  );
}
