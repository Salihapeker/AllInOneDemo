import React, { useState, useEffect, useContext } from "react";
import ProviderLayout from "../../components/provider/ProviderLayout";
import { appointmentsAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/ProviderPanel.css";

export default function ProviderAppointments() {
  const { t } = useContext(I18nContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsAPI.getMyAppointments();
      setAppointments(response.data || []);
    } catch (err) {
      console.error("Randevular yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id) => {
    try {
      await appointmentsAPI.approve(id);
      showToast(t("save_success"), "success");
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      showToast(t("save_error"), "error");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm(t("confirm"))) return;
    try {
      await appointmentsAPI.reject(id);
      showToast(t("save_success"), "success");
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      showToast(t("save_error"), "error");
    }
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
      pending: { label: `⏳ ${t("pending")}`, className: "pending" },
      approved: { label: `✓ ${t("approved")}`, className: "approved" },
      rejected: { label: `✕ ${t("rejected")}`, className: "rejected" },
    };
    return map[status] || map.pending;
  };

  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  if (loading) {
    return (
      <ProviderLayout title={t("appointments")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </ProviderLayout>
    );
  }

  if (error) {
    return (
      <ProviderLayout title={t("appointments")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchAppointments}
        />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title={t("appointments")}>
      {/* Stats Summary */}
      <div className="provider-stats-grid" style={{ marginBottom: 24 }}>
        <div className="provider-stat-card">
          <div className="provider-stat-icon pending">⏳</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{pendingCount}</div>
            <div className="provider-stat-label">{t("pending")}</div>
          </div>
        </div>
        <div className="provider-stat-card">
          <div className="provider-stat-icon approved">✓</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{appointments.filter((a) => a.status === "approved").length}</div>
            <div className="provider-stat-label">{t("approved")}</div>
          </div>
        </div>
        <div className="provider-stat-card">
          <div className="provider-stat-icon today">📅</div>
          <div className="provider-stat-info">
            <div className="provider-stat-value">{appointments.length}</div>
            <div className="provider-stat-label">{t("all")}</div>
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
                    <div className="provider-appointment-time">{apt.time || apt.time_slot}</div>
                  </div>
                  <div className="provider-appointment-info">
                    <div className="provider-appointment-service">{apt.service || apt.service_name}</div>
                    <div className="provider-appointment-customer">
                      👤 {apt.customer?.name || apt.customer_name}
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
                      {t("details")}
                    </button>
                    {apt.status === "pending" && (
                      <>
                        <button
                          className="provider-action-btn approve"
                          onClick={() => handleApprove(apt.id)}
                        >
                          {t("approve")}
                        </button>
                        <button
                          className="provider-action-btn reject"
                          onClick={() => handleReject(apt.id)}
                        >
                          {t("reject")}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState 
              icon="📭"
              title={t("no_appointments")}
              message={t("no_data")}
            />
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
