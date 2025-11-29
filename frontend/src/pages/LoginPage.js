import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

/*
  LoginPage
  - Basic login form, calls API (post /auth/login/ or /auth/token/)
  - On success stores token and role in localStorage and redirects to 'from' or '/'
  - If your backend path differs, replace api call accordingly
*/

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // replace with your real endpoint; here using api.post('/auth/login/')
      const res = await api.post("/auth/login/", { email, password });
      const data = res?.data ?? res;
      // expected: { access: "...", user: { role: "user" } }
      const token = data.access || data.token || data.data?.token;
      const role = data.user?.role || data.role || "user";
      const emailRet = data.user?.email || email;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("access_token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userEmail", emailRet);
        navigate(from, { replace: true });
      } else {
        setError("Giriş başarısız. Yanlış kimlik bilgileri.");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Sunucu hatası, tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-centered">
      <div className="card">
        <h2>Giriş Yap</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-row">
            <span>E-posta</span>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-row">
            <span>Parola</span>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div style={{ color: "crimson" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigate("/register")}
            >
              Kayıt Ol
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Giriş yapılıyor..." : "Giriş"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
