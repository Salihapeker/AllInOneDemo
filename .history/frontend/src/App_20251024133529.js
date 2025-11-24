import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/login" style={{ marginRight: "10px" }}>
          Giriş
        </Link>
        <Link to="/register">Kayıt Ol</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
