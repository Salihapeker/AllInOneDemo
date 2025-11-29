import React, { useState } from "react";
import { createPreChat } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../forms/FormStyles.css";

/*
  PreChatModal
  - Sends a short pre-conversation message to provider (ön görüşme)
  - Requires login (redirects to /login if not authenticated)
  - Props:
    - providerId
    - onClose
*/

export default function PreChatModal({ providerId, onClose }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || localStorage.getItem("access_token");

  const handleSend = async () => {
    setError("");
    if (!message.trim()) {
      setError("Mesaj boş olamaz.");
      return;
    }
    if (!token) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    setSending(true);
    try {
      const res = await createPreChat(providerId, { message });
      const data = res?.data ?? res;
      alert("Mesajınız gönderildi. Sağlayıcı size dönecektir.");
      if (onClose) onClose();
    } catch (err) {
      setError(err?.response?.data?.detail || "Mesaj gönderilemedi.");
    } finally {
      setSending(false);
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
          <h3 style={{ margin: 0 }}>Ön Görüşme Gönder</h3>
          <div>
            <button
              className="btn btn-ghost"
              onClick={() => onClose && onClose()}
            >
              Kapat
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label className="form-row">
            <span className="form-label">Mesajınız</span>
            <textarea
              className="form-input"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kısa bir ön görüşme mesajı yazın..."
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <button
              className="btn btn-outline"
              onClick={() => onClose && onClose()}
            >
              İptal
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  width: "min(720px, 96%)",
  background: "white",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 20px 60px rgba(16,24,32,0.4)",
};
