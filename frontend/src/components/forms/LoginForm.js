import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";
// If you have an API helper, you can replace the mockLogin with an import:
// import { login } from "../../services/api";

const mockLogin = async ({ email, password }) => {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 600));
  // Simple mock validation: accept any non-empty credentials
  if (email && password) {
    return { ok: true, token: "demo-token", user: { email } };
  }
  return { ok: false, message: "Geçersiz kimlik bilgileri" };
};

export default function LoginForm({ onSuccess } = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("E-posta ve parola gerekli.");
      return;
    }

    setLoading(true);
    try {
      const res = await mockLogin({ email, password });
      // const res = await login({ email, password, role }); // real API call
      if (res.ok) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userEmail", res.user.email);
        if (onSuccess) onSuccess(res.user);
        navigate("/");
      } else {
        setError(res.message || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Sunucuya bağlanırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} aria-label="Login form">
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <label className="form-row">
        <span className="form-label">E-posta</span>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </label>

      <label className="form-row">
        <span className="form-label">Parola</span>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parolanız"
          required
          autoComplete="current-password"
        />
      </label>

      <label className="form-row">
        <span className="form-label">Rol</span>
        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Müşteri</option>
          <option value="provider">Hizmet Veren</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <div className="form-row actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/register")}
        >
          Kayıt Ol
        </button>
      </div>
    </form>
  );
}
