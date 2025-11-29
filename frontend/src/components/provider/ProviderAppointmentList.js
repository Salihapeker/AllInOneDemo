// src/components/provider/ProviderAppointmentList.js
import React, { useEffect, useState } from "react";
import {
  getProviderAppointments,
  providerRespondAppointment,
} from "../../services/api";
import "../../styles/admin.css";

export default function ProviderAppointmentList({ providerId = 101 }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProviderAppointments(providerId).then((list) => {
      if (!mounted) return;
      setAppointments(list);
      setLoading(false);
    });
    return () => (mounted = false);
  }, [providerId]);

  const respond = async (id, action) => {
    const res = await providerRespondAppointment(id, action);
    if (res.ok) {
      setAppointments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: res.newStatus } : p))
      );
    } else {
      alert("İşlem başarısız");
    }
  };

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>;

  return (
    <div>
      {appointments.length === 0 && (
        <div className="card">Gelen randevu yok.</div>
      )}
      {appointments.map((a) => (
        <div
          key={a.id}
          className="card"
          style={{
            padding: 12,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 800 }}>
              {a.customerName} — {a.service}
            </div>
            <div className="muted">
              {a.date} • {a.time}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: 8 }}>
              <span
                className={`badge ${
                  a.status === "onaylandı"
                    ? "approved"
                    : a.status === "reddedildi"
                    ? "rejected"
                    : "pending"
                }`}
              >
                {a.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-primary"
                onClick={() => respond(a.id, "approve")}
              >
                Onayla
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => respond(a.id, "reject")}
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
