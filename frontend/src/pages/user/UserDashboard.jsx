// src/pages/user/UserDashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/user/UserProfileCard";
import {
  getCurrentUser,
  getUserAppointments,
  cancelAppointment,
} from "../../services/api";
import { formatDateTR, formatTime } from "../../utils/helpers";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userRes, apptRes] = await Promise.all([
          getCurrentUser(),
          getUserAppointments(),
        ]);

        setUser(userRes.data);
        setAppointments(apptRes.data || []);
      } catch (err) {
        console.error("Dashboard yüklenirken hata:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          setError("Veriler yüklenirken bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleCancel = async (appointmentId) => {
    if (
      !window.confirm("Bu randevuyu iptal etmek istediğinizden emin misiniz?")
    )
      return;

    try {
      await cancelAppointment(appointmentId);
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId ? { ...a, status: "cancelled" } : a
        )
      );
      alert("Randevu başarıyla iptal edildi.");
    } catch (err) {
      alert("Randevu iptal edilirken hata oluştu.");
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      approved: { text: "Onaylandı", color: "bg-green-100 text-green-800" },
      pending: { text: "Beklemede", color: "bg-yellow-100 text-yellow-800" },
      rejected: { text: "Reddedildi", color: "bg-red-100 text-red-800" },
      cancelled: { text: "İptal Edildi", color: "bg-gray-100 text-gray-800" },
    };
    const s = map[status] || {
      text: status,
      color: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>
        {s.text}
      </span>
    );
  };

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  const upcoming = appointments.filter((a) =>
    ["approved", "pending"].includes(a.status)
  );
  const past = appointments.filter((a) =>
    ["rejected", "cancelled"].includes(a.status)
  );

  return (
    <div className="user-dashboard container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Hoş geldin, {user?.first_name || user?.name || "Kullanıcı"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Randevularını buradan takip edebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Profil + Hızlı Butonlar */}
        <div className="space-y-6">
          <UserProfileCard user={user} />

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="font-semibold text-lg">Hızlı İşlemler</h3>
            <Link
              to="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition"
            >
              Yeni Randevu Al
            </Link>
            <Link
              to="/user/appointments"
              className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 rounded-lg font-medium transition"
            >
              Tüm Randevularım
            </Link>
          </div>
        </div>

        {/* Sağ Kolon - Randevular */}
        <div className="lg:col-span-2 space-y-8">
          {/* Yaklaşan Randevular */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              Yaklaşan Randevularım
              <span className="text-sm font-normal text-gray-500">
                {upcoming.length} adet
              </span>
            </h2>

            {upcoming.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <p className="text-gray-600">Henüz randevunuz bulunmuyor.</p>
                <Link
                  to="/"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Hemen bir usta bulun →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">
                        {appointment.service_name ||
                          appointment.category?.name ||
                          "Hizmet Belirtilmedi"}
                      </h3>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <strong>Usta:</strong>{" "}
                        {appointment.provider
                          ? `${appointment.provider.first_name} ${appointment.provider.last_name}`
                          : "Henüz atanmadı"}
                      </div>
                      <div>
                        <strong>Tarih:</strong> {formatDateTR(appointment.date)}
                      </div>
                      <div>
                        <strong>Saat:</strong>{" "}
                        {formatTime(appointment.time_slot)}
                      </div>
                      {appointment.address && (
                        <div>
                          <strong>Adres:</strong> {appointment.address}
                        </div>
                      )}
                    </div>

                    {appointment.notes && (
                      <div className="mt-4 text-sm bg-gray-50 p-3 rounded">
                        <strong>Not:</strong> {appointment.notes}
                      </div>
                    )}

                    {appointment.status === "pending" && (
                      <div className="mt-4 text-right">
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          İptal Et
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Son 3 Geçmiş Randevu (opsiyonel ama güzel duruyor) */}
          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Son İşlemler</h2>
              <div className="space-y-3">
                {past.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">
                        {appointment.service_name}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        — {formatDateTR(appointment.date)}
                      </span>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
