import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";

// Layouts
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

// Auth Pages
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Services - . js uzantısıyla import et
import ServicesPage from "./pages/ServicesPage.js";
import ServicesDetailPage from "./pages/ServicesDetailPage";

// Legal Pages
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";

// Worker Application
import WorkerApplicationPage from "./pages/WorkerApplicationPage";

// User Dashboard
import UserDashboard from "./pages/user/UserDashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryManagement from "./pages/admin/CategoryManagement";
import UserManagement from "./pages/admin/UserManagement";
import WorkerManagement from "./pages/admin/WorkerManagement";
import AppointmentManagement from "./pages/admin/AppointmentManagement";
import LegalTextManagement from "./pages/admin/LegalTextManagement";
import ReportsPage from "./pages/admin/ReportsPage";

// Provider Pages
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import ProviderAppointments from "./pages/Provider/ProviderAppointments";
import ProviderCalendar from "./pages/Provider/ProviderCalendar";
import ProviderProfile from "./pages/Provider/ProviderProfile";

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
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hizmetler" element={<ServicesPage />} />
                  <Route path="/hizmet/:id" element={<ServicesDetailPage />} />
                  <Route path="/services/:id" element={<ServicesDetailPage />} />
                  <Route path="/hakkimizda" element={<AboutPage />} />
                  <Route path="/iletisim" element={<ContactPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  {/* Legal Pages */}
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/cookies" element={<CookiePolicyPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />

                  {/* Worker Application */}
                  <Route path="/apply" element={<WorkerApplicationPage />} />
                  <Route path="/worker-application" element={<WorkerApplicationPage />} />
                  <Route path="/calisanlar/basvuru" element={<WorkerApplicationPage />} />

                  {/* User Routes */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/customer/dashboard" element={<UserDashboard />} />

                  {/* Admin Routes (Protected) */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute role="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute role="admin">
                        <CategoryManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute role="admin">
                        <UserManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/workers"
                    element={
                      <ProtectedRoute role="admin">
                        <WorkerManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/appointments"
                    element={
                      <ProtectedRoute role="admin">
                        <AppointmentManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/legal-texts"
                    element={
                      <ProtectedRoute role="admin">
                        <LegalTextManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/reports"
                    element={
                      <ProtectedRoute role="admin">
                        <ReportsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Provider Routes (Protected) */}
                  <Route
                    path="/provider/dashboard"
                    element={
                      <ProtectedRoute role="provider">
                        <ProviderDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/provider/appointments"
                    element={
                      <ProtectedRoute role="provider">
                        <ProviderAppointments />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/provider/calendar"
                    element={
                      <ProtectedRoute role="provider">
                        <ProviderCalendar />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/provider/profile"
                    element={
                      <ProtectedRoute role="provider">
                        <ProviderProfile />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
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
