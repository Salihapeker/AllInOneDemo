import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";
// import { register } from "../../services/api"; // if you have an API

const mockRegister = async ({ email, password, name, role }) => {
  await new Promise((r) => setTimeout(r, 700));
  if (email && password && name) {
    return { ok: true, message: "Kayıt başarılı" };
  }
  return { ok: false, message: "Eksik alanlar" };
};

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setLoading(true);
    try {
      const res = await mockRegister({ name, email, password, role });
      // const res = await register({ name, email, password, role });
      if (res.ok) {
        navigate("/login");
      } else {
        setError(res.message || "Kayıt sırasında hata.");
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
      aria-label="Register form"
    >
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <label className="form-row">
        <span className="form-label">Ad Soyad</span>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınız Soyadınız"
          required
        />
      </label>

      <label className="form-row">
        <span className="form-label">E-posta</span>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="form-row">
        <span className="form-label">Parola</span>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Güçlü bir parola"
          required
        />
      </label>

      <label className="form-row">
        <span className="form-label">Hesap Türü</span>
        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Müşteri</option>
          <option value="provider">Hizmet Veren</option>
        </select>
      </label>

      <div className="form-row actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/login")}
        >
          Giriş Yap
        </button>
      </div>
    </form>
  );
}
