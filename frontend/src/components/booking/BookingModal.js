import React, { useEffect, useState } from "react";
import { getAvailableSlots, createAppointment } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../forms/FormStyles.css";
import "../../styles/globals.css";

/*
  BookingModal
  - Props:
    - providerId (required) : used to fetch availability
    - serviceId (optional) : service id to include in appointment payload
    - onClose() : called when modal closed
    - onBooked(result) : called after successful booking
  - Behavior:
    - Fetches available slots for selected date
    - Allows selecting a slot and submitting appointment
    - Requires login: if no token, redirects to /login preserving return state
*/

export default function BookingModal({
  providerId,
  serviceId = null,
  onClose,
  onBooked,
}) {
  const navigate = useNavigate();
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("token") || localStorage.getItem("access_token");

  useEffect(() => {
    fetchSlots(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const fetchSlots = async (d) => {
    setLoadingSlots(true);
    setError("");
    try {
      const res = await getAvailableSlots(providerId, d);
      const data = res?.data ?? res;
      // expect array of time strings e.g. ["09:00", "10:30"]
      if (Array.isArray(data)) setSlots(data);
      else setSlots(data.slots || []);
    } catch (err) {
      // fallback mocks when backend unavailable
      setSlots(["09:00", "10:30", "13:00", "15:30"]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBook = async () => {
    setError("");
    if (!selectedSlot) {
      setError("Lütfen bir saat seçin.");
      return;
    }
    // enforce login before booking
    if (!token) {
      // redirect to login and keep return path
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        provider: providerId,
        service: serviceId,
        date,
        time: selectedSlot,
        note,
      };
      const res = await createAppointment(payload);
      const data = res?.data ?? res;
      if (data && (data.id || res.status === 201 || res.status === 200)) {
        if (onBooked) onBooked(data);
        alert(
          "Randevu talebiniz gönderildi. Sağlayıcı onaylayınca bilgilendirileceksiniz."
        );
        if (onClose) onClose();
      } else {
        setError("Randevu oluşturulamadı. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Sunucu hatası. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={modalOverlayStyle} role="dialog" aria-modal="true">
      <div style={modalStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="display-stoewer" style={{ margin: 0 }}>
            Randevu Takvimi
          </h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn btn-ghost"
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              Kapat
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <label className="form-row">
            <span className="form-label">Tarih seçin</span>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div>
            <div style={{ marginBottom: 8, fontWeight: 700 }}>
              Uygun Saatler
            </div>
            {loadingSlots ? (
              <div className="loading-spinner">Yükleniyor...</div>
            ) : slots.length === 0 ? (
              <div className="card">Seçilen tarihte uygun saat yok.</div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`child-tile ${
                      selectedSlot === s ? "selected-slot" : ""
                    }`}
                    onClick={() => setSelectedSlot(s)}
                    style={
                      selectedSlot === s
                        ? {
                            boxShadow: "0 12px 28px rgba(81,121,112,0.18)",
                            transform: "translateY(-4px)",
                          }
                        : {}
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="form-row">
            <span className="form-label">
              Kısa not / ön görüşme notu (opsiyonel)
            </span>
            <textarea
              className="form-input"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Talebinizle ilgili kısa bilgi..."
            />
          </label>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              İptal
            </button>
            <button
              className="btn btn-primary"
              onClick={handleBook}
              disabled={submitting}
            >
              {submitting ? "Gönderiliyor..." : "Randevu Talep Et"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// small inline styles to avoid new css file (you can move to admin.css or globals.css)
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(8,10,12,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: 16,
};

const modalStyle = {
  width: "min(880px, 96%)",
  background: "white",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 20px 60px rgba(16,24,32,0.4)",
};
