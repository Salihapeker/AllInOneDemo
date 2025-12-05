// src/services/api.js
// Central API client and helper functions for Django REST Framework.
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token interceptor - adds Authorization header
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor - handle 401 redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  login: (credentials) => api.post("/auth/login/", credentials),
  register: (userData) => api.post("/auth/register/", userData),
  logout: () => api.post("/auth/logout/"),
  getMe: () => api.get("/auth/me/"),
  forgotPassword: (email) => api.post("/auth/forgot-password/", { email }),
  resetPassword: (data) => api.post("/auth/reset-password/", data),
  refreshToken: (refreshToken) =>
    api.post("/auth/token/refresh/", { refresh: refreshToken }),
};

// ============================================
// USERS API
// ============================================
export const usersAPI = {
  getAll: (params) => api.get("/users/", { params }),
  getById: (id) => api.get(`/users/${id}/`),
  update: (id, data) => api.put(`/users/${id}/`, data),
  patch: (id, data) => api.patch(`/users/${id}/`, data),
  delete: (id) => api.delete(`/users/${id}/`),
  getProfile: () => api.get("/users/me/"),
  updateProfile: (data) => api.patch("/users/me/", data),
};

// ============================================
// WORKERS / PROVIDERS API
// ============================================
export const workersAPI = {
  getAll: (params) => api.get("/workers/", { params }),
  getById: (id) => api.get(`/workers/${id}/`),
  apply: (formData) =>
    api.post("/workers/apply/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  approve: (id) => api.post(`/workers/${id}/approve/`),
  reject: (id, reason) => api.post(`/workers/${id}/reject/`, { reason }),
  getApplications: (params) => api.get("/workers/applications/", { params }),
  getMyApplication: () => api.get("/workers/my-application/"),
};

// ============================================
// CATEGORIES API
// ============================================
export const categoriesAPI = {
  getAll: (params) => api.get("/categories/", { params }),
  getTree: () => api.get("/categories/tree/"),
  getById: (id) => api.get(`/categories/${id}/`),
  create: (data) => api.post("/categories/", data),
  update: (id, data) => api.put(`/categories/${id}/`, data),
  delete: (id) => api.delete(`/categories/${id}/`),
};

// ============================================
// SERVICES API
// ============================================
export const servicesAPI = {
  getAll: (params) => api.get("/services/", { params }),
  getById: (id) => api.get(`/services/${id}/`),
  getByCategory: (categoryId) =>
    api.get(`/categories/${categoryId}/services/`),
  create: (data) => api.post("/services/", data),
  update: (id, data) => api.put(`/services/${id}/`, data),
  delete: (id) => api.delete(`/services/${id}/`),
};

// ============================================
// APPOINTMENTS API
// ============================================
export const appointmentsAPI = {
  getAll: (params) => api.get("/appointments/", { params }),
  getMyAppointments: () => api.get("/appointments/my-appointments/"),
  getById: (id) => api.get(`/appointments/${id}/`),
  create: (data) => api.post("/appointments/", data),
  update: (id, data) => api.put(`/appointments/${id}/`, data),
  cancel: (id) => api.patch(`/appointments/${id}/cancel/`),
  approve: (id) => api.post(`/appointments/${id}/approve/`),
  reject: (id) => api.post(`/appointments/${id}/reject/`),
  getProviderAppointments: (providerId) =>
    api.get(`/providers/${providerId}/appointments/`),
};

// ============================================
// PROVIDERS API
// ============================================
export const providersAPI = {
  getAll: (params) => api.get("/providers/", { params }),
  getById: (id) => api.get(`/providers/${id}/`),
  getProfile: (id) => api.get(`/providers/${id}/`),
  updateProfile: (id, data) => api.put(`/providers/${id}/`, data),
  getAppointments: (id) => api.get(`/providers/${id}/appointments/`),
  getAvailableSlots: (id, date) =>
    api.get(`/providers/${id}/available-slots/`, { params: { date } }),
  createPreChat: (id, data) => api.post(`/providers/${id}/prechat/`, data),
};

// ============================================
// REPORTS API (Admin)
// ============================================
export const reportsAPI = {
  getDashboardStats: () => api.get("/reports/dashboard/"),
  getUserStats: (params) => api.get("/reports/users/", { params }),
  getWorkerStats: (params) => api.get("/reports/workers/", { params }),
  getAppointmentStats: (params) =>
    api.get("/reports/appointments/", { params }),
  getRevenueStats: (params) => api.get("/reports/revenue/", { params }),
};

// ============================================
// WORKER APPLICATION API (Convenience wrapper)
// ============================================
export const workerApplicationAPI = {
  // Submit new application
  submit: (formData) => workersAPI.apply(formData),
  
  // Get current user's application status
  getMyApplication: () => workersAPI.getMyApplication(),
  
  // Admin: Get all applications
  getAll: (params) => workersAPI.getApplications(params),
  
  // Admin: Approve application
  approve: (id) => workersAPI.approve(id),
  
  // Admin: Reject application with reason
  reject: (id, reason) => workersAPI.reject(id, reason),
};

// ============================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================
// Auth / user
export const getCurrentUser = () => authAPI.getMe();

// Categories
export const getCategories = () => categoriesAPI.getTree();

// Users
export const getUserProfile = (userId) => {
  if (!userId) return authAPI.getMe();
  return usersAPI.getById(userId);
};
export const getUserAppointments = () => appointmentsAPI.getMyAppointments();
export const cancelAppointment = (id) => appointmentsAPI.cancel(id);

// Services
export const getServiceById = (id) => servicesAPI.getById(id);
export const getServicesByCategory = (categoryId) =>
  servicesAPI.getByCategory(categoryId);

// Provider
export const getProviderProfile = (providerId) =>
  providersAPI.getById(providerId);
export const updateProviderProfile = (providerId, payload) =>
  providersAPI.updateProfile(providerId, payload);
export const getProviderAppointments = (providerId) =>
  providersAPI.getAppointments(providerId);
export const providerRespondAppointment = (appointmentId, action) =>
  api.post(`/appointments/${appointmentId}/${action}/`);

// Booking
export const createAppointment = (payload) => appointmentsAPI.create(payload);

// Availability / calendar
export const getAvailableSlots = (providerId, date) =>
  providersAPI.getAvailableSlots(providerId, date);

// Provider registration (multipart)
export const providerRegister = (formData) => workersAPI.apply(formData);

// Pre-chat / quick message
export const createPreChat = (providerId, payload) =>
  providersAPI.createPreChat(providerId, payload);

// Admin examples
export const getAllUsers = () => usersAPI.getAll();
export const getWorkerApplications = () => workersAPI.getApplications();
export const approveWorker = (id) => workersAPI.approve(id);
export const rejectWorker = (id) => workersAPI.reject(id);

// Default axios export
export default api;
