import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";
// import { createAppointment } from "../../services/api"; // real API integration

const mockCreateAppointment = async ({ serviceId, date, time, note }) => {
  await new Promise((r) => setTimeout(r, 600));
  if (serviceId && date && time) {
    return { ok: true, appointmentId: Math.floor(Math.random() * 100000) };
  }
  return { ok: false, message: "Lütfen tarih ve saat seçin." };
};

export default function AppointmentForm({ serviceId, onBooked } = {}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      // redirect to login with state so user can return
      navigate("/login", { state: { from: `/services/${serviceId}` } });
      return;
    }
    if (!date || !time) {
      setError("Lütfen uygun tarih ve saat seçin.");
      return;
    }
    setLoading(true);
    try {
      const res = await mockCreateAppointment({ serviceId, date, time, note });
      // const res = await createAppointment({ serviceId, date, time, note });
      if (res.ok) {
        if (onBooked) onBooked(res);
        alert("Randevu talebiniz oluşturuldu. ID: " + res.appointmentId);
      } else {
        setError(res.message || "Randevu oluşturulamadı.");
      }
    } catch {
      setError("Sunucu hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form-grid"
      onSubmit={handleSubmit}
      aria-label="Appointment form"
    >
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-row">
        <span className="form-label">Tarih</span>
        <input
          className="form-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <span className="form-label">Saat</span>
        <input
          className="form-input"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <span className="form-label">Açıklama / Not</span>
        <textarea
          className="form-input"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Kısa açıklama veya talimat..."
        />
      </div>

      <div className="form-row actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Gönderiliyor..." : "Randevu Talep Et"}
        </button>
      </div>
    </form>
  );
}
