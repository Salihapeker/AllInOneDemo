import React, { useState, useEffect, useContext } from "react";
import ProviderLayout from "../../components/provider/ProviderLayout";
import { appointmentsAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/ProviderPanel.css";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function ProviderCalendar() {
  const { t } = useContext(I18nContext);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [viewMode, setViewMode] = useState("month"); // month or week
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({});
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsAPI.getMyAppointments();
      const appts = response.data || [];
      
      // Group appointments by date
      const apptsByDate = {};
      appts.forEach(apt => {
        const date = apt.date;
        if (!apptsByDate[date]) apptsByDate[date] = [];
        apptsByDate[date].push({
          time: apt.time || apt.time_slot,
          service: apt.service || apt.service_name,
        });
      });
      setAppointments(apptsByDate);
    } catch (err) {
      console.error("Takvim verileri yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      setAppointments({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get calendar days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isOtherMonth: true,
      date: new Date(year, month - 1, prevMonthLastDay - i),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isOtherMonth: false,
      date: new Date(year, month, day),
    });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isOtherMonth: true,
      date: new Date(year, month + 1, day),
    });
  }

  const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date) => {
    return formatDateKey(date) === formatDateKey(today);
  };

  const hasAvailability = (date) => {
    return availability[formatDateKey(date)]?.length > 0;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const handleDateClick = (dayData) => {
    if (dayData.isOtherMonth) return;
    setSelectedDate(dayData.date);
    setSelectedSlots(availability[formatDateKey(dayData.date)] || []);
    setShowAvailabilityModal(true);
  };

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const saveAvailability = () => {
    if (selectedDate) {
      const dateKey = formatDateKey(selectedDate);
      setAvailability((prev) => ({
        ...prev,
        [dateKey]: selectedSlots,
      }));
      setShowAvailabilityModal(false);
      alert(t("save_success"));
    }
  };

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  if (loading) {
    return (
      <ProviderLayout title={t("calendar")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </ProviderLayout>
    );
  }

  if (error) {
    return (
      <ProviderLayout title={t("calendar")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchData}
        />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title={t("calendar")}>
      <div className="provider-calendar-card">
        {/* Header */}
        <div className="provider-calendar-header">
          <div className="provider-calendar-title">
            📅 {MONTHS[month]} {year}
          </div>
          <div className="provider-calendar-nav">
            <button className="provider-calendar-nav-btn" onClick={() => navigateMonth(-1)}>
              ← {t("previous")}
            </button>
            <button
              className="provider-calendar-nav-btn"
              onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
            >
              {t("today")}
            </button>
            <button className="provider-calendar-nav-btn" onClick={() => navigateMonth(1)}>
              {t("next")} →
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="provider-calendar-view-tabs">
          <button
            className={`provider-calendar-view-tab ${viewMode === "month" ? "active" : ""}`}
            onClick={() => setViewMode("month")}
          >
            {t("monthly")}
          </button>
          <button
            className={`provider-calendar-view-tab ${viewMode === "week" ? "active" : ""}`}
            onClick={() => setViewMode("week")}
          >
            {t("weekly")}
          </button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, fontSize: 13 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: "var(--accent-1)" }}></div>
            <span>{t("today")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--warning)" }}></div>
            <span>{t("has_appointment")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--success)" }}></div>
            <span>{t("available")}</span>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === "month" && (
          <div className="provider-calendar-grid">
            {/* Weekdays */}
            {DAYS.map((day) => (
              <div key={day} className="provider-calendar-weekday">
                {day}
              </div>
            ))}

            {/* Days */}
            {calendarDays.map((dayData, idx) => {
              const dateKey = formatDateKey(dayData.date);
              const dayAppointments = appointments[dateKey] || [];
              const isAvailable = hasAvailability(dayData.date);

              return (
                <div
                  key={idx}
                  className={`provider-calendar-day ${
                    isToday(dayData.date) ? "today" : ""
                  } ${dayData.isOtherMonth ? "other-month" : ""} ${
                    selectedDate && formatDateKey(selectedDate) === dateKey ? "selected" : ""
                  } ${dayAppointments.length > 0 ? "has-appointments" : ""}`}
                  onClick={() => handleDateClick(dayData)}
                  style={{ cursor: dayData.isOtherMonth ? "default" : "pointer" }}
                >
                  {dayData.day}
                  {isAvailable && !dayData.isOtherMonth && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 4,
                        right: 4,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--success)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Weekly View */}
        {viewMode === "week" && (
          <div style={{ overflowX: "auto" }}>
            <div className="provider-weekly-grid">
              {/* Time column */}
              <div style={{ background: "white" }}></div>
              {DAYS.map((day) => (
                <div
                  key={day}
                  style={{
                    padding: 12,
                    textAlign: "center",
                    fontWeight: 700,
                    background: "#F9F1F1",
                    borderBottom: "1px solid rgba(54, 79, 83, 0.1)",
                  }}
                >
                  {day}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map((time) => (
                <React.Fragment key={time}>
                  <div className="provider-weekly-time">{time}</div>
                  {DAYS.map((day, dayIdx) => {
                    // For demo, use current week
                    const weekStart = new Date(today);
                    weekStart.setDate(today.getDate() - today.getDay() + 1 + dayIdx);
                    const dateKey = formatDateKey(weekStart);
                    const dayAvailability = availability[dateKey] || [];
                    const isSlotAvailable = dayAvailability.includes(time);
                    const dayAppointments = appointments[dateKey] || [];
                    const hasAppt = dayAppointments.some((a) => a.time === time);

                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`provider-weekly-cell ${isSlotAvailable ? "available" : ""}`}
                        style={{
                          background: hasAppt
                            ? "rgba(245, 158, 11, 0.15)"
                            : isSlotAvailable
                            ? "rgba(16, 185, 129, 0.1)"
                            : "var(--bg-card)",
                        }}
                      >
                        {hasAppt && (
                          <div className="provider-weekly-event">
                            {dayAppointments.find((a) => a.time === time)?.service}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: "#f2d8d8",
          borderRadius: 16,
        }}
      >
        <h4 style={{ marginBottom: 8 }}>💡 İpucu</h4>
        <p style={{ fontSize: 14, color: "#374259", lineHeight: 1.6 }}>
          Bir güne tıklayarak o gün için müsait olduğunuz saatleri belirleyebilirsiniz.
          Müşteriler sadece müsait olduğunuz saatlerde randevu alabilir.
        </p>
      </div>

      {/* Availability Modal */}
      {showAvailabilityModal && selectedDate && (
        <div className="modal-overlay" onClick={() => setShowAvailabilityModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 450 }}>
            <div className="modal-header">
              <h3>🗓️ Uygunluk Ayarla</h3>
              <button className="modal-close" onClick={() => setShowAvailabilityModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  {DAYS[(selectedDate.getDay() + 6) % 7]}
                </div>
              </div>

              <p style={{ marginBottom: 16, fontSize: 14, color: "#666" }}>
                Müsait olduğunuz saatleri seçin:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "2px solid",
                      borderColor: selectedSlots.includes(slot) ? "#10b981" : "#ddd",
                      background: selectedSlots.includes(slot) ? "rgba(16, 185, 129, 0.1)" : "white",
                      color: selectedSlots.includes(slot) ? "#10b981" : "#374259",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {selectedSlots.includes(slot) ? "✓ " : ""}{slot}
                  </button>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => setSelectedSlots(timeSlots)}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "white",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Tümünü Seç
                </button>
                <button
                  onClick={() => setSelectedSlots([])}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "white",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Temizle
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="provider-action-btn approve"
                style={{ padding: "12px 24px" }}
                onClick={saveAvailability}
              >
                💾 Kaydet
              </button>
              <button className="btn btn-ghost" onClick={() => setShowAvailabilityModal(false)}>
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </ProviderLayout>
  );
}
