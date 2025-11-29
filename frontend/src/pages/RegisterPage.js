// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // mock register: store and redirect to login
    navigate("/login");
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
        style={{ maxWidth: 540, width: "100%", padding: 28 }}
      >
        <h2 className="display-font" style={{ fontSize: 28, marginBottom: 8 }}>
          Kayıt Ol
        </h2>
        <p className="text-muted" style={{ marginBottom: 18 }}>
          E-posta ile kayıt olun ya da hizmet veren olarak başvuru yapın.
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
          <select style={{ padding: 12, borderRadius: 8 }}>
            <option value="user">Müşteri</option>
            <option value="provider">Hizmet Veren</option>
          </select>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" className="btn btn-primary">
              Kayıt Ol
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Zaten Hesabım Var
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
