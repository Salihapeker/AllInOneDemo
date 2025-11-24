import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      setMessage("Giriş başarılı!");
      // Giriş sonrası yapılacaklar: token saklama, sayfa yönlendirme vb.
    } catch (error) {
      setMessage("Giriş başarısız. Bilgileri kontrol edin.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
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
      <button type="submit">Giriş Yap</button>
      {message && (
        <p className={message.includes("başarılı") ? "success" : "error"}>
          {message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
