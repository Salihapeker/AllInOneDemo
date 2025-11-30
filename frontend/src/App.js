import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";

// Layouts
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

// Services - . js uzantısıyla import et
import ServicesPage from "./pages/ServicesPage.js";
import ServicesDetailPage from "./pages/ServicesDetailPage";

// Dashboards
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProviderDashboard from "./pages/Provider/ProviderDashboard";

// Styles
import "./styles/globals.css";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="app-main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hizmetler" element={<ServicesPage />} />
                  <Route path="/hizmet/:id" element={<ServicesDetailPage />} />
                  <Route
                    path="/services/:id"
                    element={<ServicesDetailPage />}
                  />
                  <Route path="/hakkimizda" element={<AboutPage />} />
                  <Route path="/iletisim" element={<ContactPage />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route path="/profile" element={<ProfilePage />} />

                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route
                    path="/customer/dashboard"
                    element={<UserDashboard />}
                  />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/provider/dashboard"
                    element={<ProviderDashboard />}
                  />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

function NotFoundPage() {
  return (
    <div
      className="container"
      style={{ padding: "100px 20px", textAlign: "center" }}
    >
      <h1 style={{ fontSize: "72px", marginBottom: "20px" }}>404</h1>
      <h2>Sayfa Bulunamadı</h2>
      <p style={{ marginBottom: "32px" }}>
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <a href="/" className="btn-primary btn-lg">
        🏠 Ana Sayfaya Dön
      </a>
    </div>
  );
}

export default App;
