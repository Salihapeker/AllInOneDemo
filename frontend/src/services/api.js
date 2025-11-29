// src/services/api.js
// Central API client and helper functions (updated with availability & pre-chat).
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Endpoints ---
// Auth / user
export const getCurrentUser = () => api.get("/auth/me/");

// Categories
export const getCategories = () => api.get("/categories/tree/");

// Users
export const getUserProfile = (userId) => {
  if (!userId) return api.get("/auth/me/");
  return api.get(`/users/${userId}/`);
};
export const getUserAppointments = () =>
  api.get("/appointments/my-appointments/");
export const cancelAppointment = (id) =>
  api.patch(`/appointments/${id}/cancel/`);

// Services
export const getServiceById = (id) => api.get(`/services/${id}/`);
export const getServicesByCategory = (categoryId) =>
  api.get(`/categories/${categoryId}/services/`);

// Provider
export const getProviderProfile = (providerId) =>
  api.get(`/providers/${providerId}/`);
export const updateProviderProfile = (providerId, payload) =>
  api.put(`/providers/${providerId}/`, payload);
export const getProviderAppointments = (providerId) =>
  api.get(`/providers/${providerId}/appointments/`);
export const providerRespondAppointment = (appointmentId, action) =>
  api.post(`/appointments/${appointmentId}/${action}/`);

// Booking
export const createAppointment = (payload) =>
  api.post("/appointments/", payload);

// Availability / calendar (backend expected to return array of times for date)
// Example backend path: GET /providers/:id/available-slots/?date=YYYY-MM-DD
export const getAvailableSlots = (providerId, date) =>
  api.get(`/providers/${providerId}/available-slots/`, { params: { date } });

// Provider registration (multipart)
export const providerRegister = (formData) =>
  api.post("/providers/apply/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Pre-chat / quick message (ön görüşme)
export const createPreChat = (providerId, payload) =>
  api.post(`/providers/${providerId}/prechat/`, payload);

// Admin examples
export const getAllUsers = () => api.get("/admin/users/");
export const getWorkerApplications = () =>
  api.get("/admin/worker-applications/");
export const approveWorker = (id) => api.post(`/admin/workers/${id}/approve/`);
export const rejectWorker = (id) => api.post(`/admin/workers/${id}/reject/`);

// Default axios export
export default api;
