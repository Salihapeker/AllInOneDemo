// src/pages/UserAppointmentsPage.js
import React, { useEffect, useState } from "react";
import { getUserAppointments, cancelAppointment } from "../services/api";

export default function UserAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    getUserAppointments()
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setAppointments(Array.isArray(data) ? data : data.results ?? []);
      })
      .catch(() => {
        if (!mounted) return;
        setAppointments([
          {
            id: 9001,
            serviceName: "Tesisatçı",
            date: "2025-12-01",
            time: "10:00",
            status: "onaylandı",
            provider: "Ahmet Usta",
          },
          {
            id: 9002,
            serviceName: "Ev Temizliği",
            date: "2025-12-10",
            time: "09:30",
            status: "beklemede",
            provider: "Temizlik GmbH",
          },
        ]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const handleCancel = async (id) => {
    if (!confirm("Randevuyu iptal etmek istediğinizden emin misiniz?")) return;
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "iptal edildi" } : a))
      );
      alert("Randevu iptal talebiniz gönderildi.");
    } catch {
      alert("İptal sırasında hata.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>;

  return (
    <div className="container" style={{ padding: 20 }}>
      <h2 className="display-stoewer" style={{ fontSize: 24 }}>
        Randevularım
      </h2>

      <div style={{ marginTop: 14 }}>
        {appointments.length === 0 && (
          <div className="card">Henüz randevunuz yok.</div>
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
                {a.serviceName} — {a.provider}
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
                      : a.status === "beklemede"
                      ? "pending"
                      : "cancelled"
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => alert("Detay gösterilecek (demo).")}
                >
                  Detay
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleCancel(a.id)}
                  disabled={cancellingId === a.id}
                >
                  {cancellingId === a.id ? "İptal ediliyor..." : "İptal Et"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
