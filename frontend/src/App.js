import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Doğru import'lar (pages klasöründen)
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ServicesDetailPage from "./pages/ServicesDetailPage";
// Rol bazlı dashboard'lar
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
// Ortak bileşenler
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Genel Sayfalar */}
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* User (Müşteri) - Herkesin erişimine açık */}
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* Admin - Herkesin erişimine açık */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Provider (Usta) - Herkesin erişimine açık */}
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />

          <Route path="/services/:id" element={<ServicesDetailPage />} />

          {/* 404 - Sayfa Bulunamadı */}
          <Route
            path="*"
            element={
              <div className="container mx-auto p-8 text-center text-2xl">
                404 - Sayfa Bulunamadı
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
