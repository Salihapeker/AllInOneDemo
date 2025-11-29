// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // mock login: save token to localStorage and redirect home
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("userEmail", email);
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{ maxWidth: 480, width: "100%", padding: 28 }}
      >
        <h2 className="display-font" style={{ fontSize: 28, marginBottom: 8 }}>
          Giriş Yap
        </h2>
        <p className="text-muted" style={{ marginBottom: 18 }}>
          Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
        </p>

        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #e6e9ee",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #e6e9ee",
            }}
          />
          <button type="submit" className="btn btn-primary">
            Giriş Yap
          </button>
        </form>

        <div style={{ marginTop: 14, fontSize: 14 }}>
          Henüz hesabınız yok mu?{" "}
          <Link to="/register" className="btn-ghost">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
