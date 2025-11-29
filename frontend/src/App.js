import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Doğru import'lar (pages klasöründen)
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ServicesDetailPage from "./pages/ServicesDetailPage";
// Rol bazlı dashboard'lar
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProviderDashboard from "./pages/Provider/ProviderDashboard";
// Ortak bileşenler
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Genel Sayfalar */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* User (Müşteri) */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Provider (Usta) */}
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
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
