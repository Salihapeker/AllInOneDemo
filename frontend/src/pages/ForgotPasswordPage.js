import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthPages.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Lütfen e-posta adresinizi girin.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {!sent ? (
            <>
              <div className="auth-header">
                <div className="auth-icon">🔐</div>
                <h1 className="auth-title">Parolamı Unuttum</h1>
                <p className="auth-subtitle">
                  E-posta adresinizi girin, size parola sıfırlama bağlantısı
                  gönderelim.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label className="form-label">E-posta Adresi</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="loading-spinner"
                        style={{ width: 20, height: 20 }}
                      ></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    "📧 Sıfırlama Bağlantısı Gönder"
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Parolanızı hatırladınız mı?{" "}
                  <Link to="/login" className="auth-link">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="auth-success">
              <div className="auth-success-icon">✅</div>
              <h2 className="auth-success-title">E-posta Gönderildi!</h2>
              <p className="auth-success-text">
                Parola sıfırlama bağlantısı <strong>{email}</strong> adresine
                gönderildi. Lütfen gelen kutunuzu kontrol edin.
              </p>
              <p className="auth-success-hint">
                E-posta birkaç dakika içinde ulaşmazsa spam/junk klasörünü
                kontrol edin.
              </p>
              <div className="auth-success-actions">
                <Link to="/login" className="btn btn-primary">
                  Giriş Sayfasına Dön
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                >
                  Tekrar Gönder
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side decoration */}
        <div className="auth-decoration">
          <div className="auth-decoration-content">
            <h2>All In One 4 You</h2>
            <p>Tüm hizmetler tek çatı altında</p>
            <div className="auth-decoration-features">
              <div className="auth-decoration-feature">
                <span>🔧</span> Tesisatçı
              </div>
              <div className="auth-decoration-feature">
                <span>💡</span> Elektrikçi
              </div>
              <div className="auth-decoration-feature">
                <span>🎨</span> Boyacı
              </div>
              <div className="auth-decoration-feature">
                <span>🧹</span> Temizlik
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
