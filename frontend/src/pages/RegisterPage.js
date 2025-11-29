import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

/*
  RegisterPage
  - Simple registration: name, email, password and role selection (user/provider)
  - Calls api.post("/auth/register/") or adapt to your backend
*/

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/register/", form);
      const data = res?.data ?? res;
      // If backend returns token, store and redirect
      if (data?.access || data?.token) {
        const token = data.access || data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("access_token", token);
        localStorage.setItem("role", form.role);
        navigate("/", { replace: true });
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Kayıt yapılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-centered">
      <div className="card">
        <h2>Kayıt Ol</h2>
        <form className="form-grid" onSubmit={submit}>
          <label className="form-row">
            <span>Ad Soyad</span>
            <input
              className="form-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label className="form-row">
            <span>E-posta</span>
            <input
              className="form-input"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className="form-row">
            <span>Parola</span>
            <input
              className="form-input"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <label className="form-row">
            <span>Rol</span>
            <select
              className="form-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">Kullanıcı</option>
              <option value="provider">Hizmet Veren</option>
            </select>
          </label>

          {error && <div style={{ color: "crimson" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigate("/login")}
            >
              Giriş Yap
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
