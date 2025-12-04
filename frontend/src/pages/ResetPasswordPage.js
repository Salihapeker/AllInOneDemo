import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/AuthPages.css";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!password) {
      setError("Lütfen yeni parolanızı girin.");
      return;
    }

    if (password.length < 8) {
      setError("Parola en az 8 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolalar eşleşmiyor.");
      return;
    }

    if (!token) {
      setError("Geçersiz veya süresi dolmuş bağlantı.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 1, text: "Zayıf", color: "#ef4444" },
      { level: 2, text: "Orta", color: "#f59e0b" },
      { level: 3, text: "İyi", color: "#85A98D" },
      { level: 4, text: "Güçlü", color: "#10b981" },
    ];

    return levels[strength - 1] || { level: 0, text: "", color: "" };
  };

  const passwordStrength = getPasswordStrength();

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-error-state">
              <div className="auth-error-icon">⚠️</div>
              <h2>Geçersiz Bağlantı</h2>
              <p>
                Bu parola sıfırlama bağlantısı geçersiz veya süresi dolmuş.
                Lütfen yeni bir bağlantı talep edin.
              </p>
              <Link to="/forgot-password" className="btn btn-primary">
                Yeni Bağlantı Talep Et
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {!success ? (
            <>
              <div className="auth-header">
                <div className="auth-icon">🔑</div>
                <h1 className="auth-title">Yeni Parola Belirle</h1>
                <p className="auth-subtitle">
                  Hesabınız için yeni ve güvenli bir parola oluşturun.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Yeni Parola</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {password && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            style={{
                              flex: 1,
                              height: 4,
                              borderRadius: 2,
                              background:
                                level <= passwordStrength.level
                                  ? passwordStrength.color
                                  : "#e0e0e0",
                              transition: "background 0.3s ease",
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: passwordStrength.color }}>
                        Parola gücü: {passwordStrength.text}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Parola Tekrar</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
                      Parolalar eşleşmiyor
                    </div>
                  )}
                </div>

                {/* Password requirements */}
                <div
                  style={{
                    padding: 16,
                    background: "#F9F1F1",
                    borderRadius: 12,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    Parola gereksinimleri:
                  </div>
                  <ul style={{ fontSize: 12, color: "#666", margin: 0, paddingLeft: 16 }}>
                    <li style={{ color: password.length >= 8 ? "#10b981" : "#666" }}>
                      En az 8 karakter
                    </li>
                    <li style={{ color: /[A-Z]/.test(password) ? "#10b981" : "#666" }}>
                      En az 1 büyük harf
                    </li>
                    <li style={{ color: /[0-9]/.test(password) ? "#10b981" : "#666" }}>
                      En az 1 rakam
                    </li>
                    <li style={{ color: /[^A-Za-z0-9]/.test(password) ? "#10b981" : "#666" }}>
                      En az 1 özel karakter (önerilen)
                    </li>
                  </ul>
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading || password !== confirmPassword}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner" style={{ width: 20, height: 20 }}></span>
                      Kaydediliyor...
                    </>
                  ) : (
                    "🔑 Parolayı Değiştir"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="auth-success">
              <div className="auth-success-icon">✅</div>
              <h2 className="auth-success-title">Parola Değiştirildi!</h2>
              <p className="auth-success-text">
                Parolanız başarıyla güncellendi. Artık yeni parolanızla giriş yapabilirsiniz.
              </p>
              <div className="auth-success-actions">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => navigate("/login")}
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side decoration */}
        <div className="auth-decoration">
          <div className="auth-decoration-content">
            <h2>Güvenlik İpuçları</h2>
            <div className="auth-decoration-features">
              <div className="auth-decoration-feature">
                <span>🔐</span> Güçlü parolalar kullanın
              </div>
              <div className="auth-decoration-feature">
                <span>🔄</span> Parolaları düzenli değiştirin
              </div>
              <div className="auth-decoration-feature">
                <span>🚫</span> Aynı parolayı başka yerde kullanmayın
              </div>
              <div className="auth-decoration-feature">
                <span>📱</span> İki faktörlü doğrulama önerilir
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
