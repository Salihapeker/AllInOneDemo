import React, { useState, useContext } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // ✅ ../ oldu
import "../styles/AuthPages.css"; // ✅ .. / oldu

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/customer/dashboard";
  const intendedRole = searchParams.get("role"); // "provider" olabilir
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate(redirectUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>📝 Kayıt Ol</h1>
            <p>Yeni hesap oluşturun</p>
          </div>

          {intendedRole === "provider" && (
            <div className="info-banner" style={{
              background: "rgba(133, 169, 141, 0.1)",
              border: "1px solid rgba(133, 169, 141, 0.3)",
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 24,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: 20 }}>ℹ️</span>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>
                Hizmet vermek için önce kayıt olmanız gerekmektedir. 
                Kayıt olduktan sonra başvuru formuna yönlendirileceksiniz.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-alert">{error}</div>}

            <div className="form-group">
              <label className="form-label">Ad Soyad</label>
              <input
                type="text"
                className="form-input"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-posta</label>
              <input
                type="email"
                className="form-input"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+49 123 456 7890"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Şifre</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Zaten hesabınız var mı?{" "}
              <Link to="/login" className="auth-link">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
