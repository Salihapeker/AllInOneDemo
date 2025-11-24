import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { email, password });
      setMessage("Kayıt başarılı!");
    } catch (error) {
      setMessage("Kayıt başarısız. Tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Kaydol</button>
      {message && (
        <p className={message.includes("başarılı") ? "success" : "error"}>
          {message}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
