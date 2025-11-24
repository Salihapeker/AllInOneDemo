import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", { email, password });
      setMessage("Kayıt başarılı!");
    } catch (error) {
      setMessage("Kayıt başarısız. Tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Kaydol</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
