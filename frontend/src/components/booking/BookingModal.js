import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import "./BookingModal.css";

export default function BookingModal({ service, provider, onClose }) {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // 09:00 - 18:00 arası 30 dakikalık slotlar oluştur
  const generateTimeSlots = useCallback((booked) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        const isBooked = booked.includes(timeStr);

        slots.push({
          time: timeStr,
          available: !isBooked,
        });
      }
    }

    setAvailableTimes(slots);
  }, []);

  // Seçilen gün için müsait saatleri getir
  const fetchAvailableTimes = useCallback(async (date) => {
    try {
      const dateStr = date.toISOString().split("T")[0];
      const response = await api.get(
        `/bookings/available-slots?serviceId=${service._id}&date=${dateStr}${
          provider ? `&providerId=${provider._id}` : ""
        }`
      );

      generateTimeSlots(response.data.bookedSlots || []);
    } catch (error) {
      console.error("Müsait saatler alınamadı:", error);
      generateTimeSlots([]);
    }
  }, [service._id, provider, generateTimeSlots]);

  useEffect(() => {
    generateAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate, fetchAvailableTimes]);

  // Önümüzdeki 14 günü oluştur (bugün hariç)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Pazar günlerini atla (isteğe bağlı)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }

    setAvailableDates(dates);
  };



  const handleBooking = async () => {
    if (!user) {
      alert("Randevu almak için giriş yapmalısınız.");
      onClose();
      window.location.href = "/login";
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Lütfen tarih ve saat seçiniz.");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        providerId: provider?._id,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        notes: notes,
      };

      await api.post("/bookings", bookingData);

      alert(
        `✅ Randevunuz başarıyla oluşturuldu!\n\nHizmet: ${
          service.name
        }\nTarih: ${formatDate(selectedDate)}\nSaat: ${selectedTime}`
      );

      onClose();
    } catch (error) {
      console.error("Randevu oluşturulamadı:", error);
      alert(
        error.response?.data?.message ||
          "Randevu oluşturulurken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    return `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}, ${days[date.getDay()]}`;
  };

  const isDateSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content booking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>📅 Randevu Al</h3>
            <p className="modal-subtitle">{service.name}</p>
            {provider && <p className="modal-provider">👤 {provider.name}</p>}
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Tarih Seçimi */}
          <div className="booking-section">
            <h4>📆 Tarih Seçin</h4>
            <div className="date-grid">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  className={`date-card ${
                    isDateSelected(date) ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="date-day">
                    {date.toLocaleDateString("tr-TR", { weekday: "short" })}
                  </div>
                  <div className="date-number">{date.getDate()}</div>
                  <div className="date-month">
                    {date.toLocaleDateString("tr-TR", { month: "short" })}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Saat Seçimi */}
          {selectedDate && (
            <div className="booking-section">
              <h4>⏰ Saat Seçin</h4>
              <p className="section-hint">
                Müsait saatler yeşil, dolu saatler kırmızı ile gösterilmiştir.
              </p>
              <div className="time-slots">
                {availableTimes.map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot ${!slot.available ? "booked" : ""} ${
                      selectedTime === slot.time ? "selected" : ""
                    }`}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                    {!slot.available && (
                      <span className="badge-booked">DOLU</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notlar */}
          {selectedTime && (
            <div className="booking-section">
              <h4>📝 Notlar (Opsiyonel)</h4>
              <textarea
                className="form-textarea"
                placeholder="Özel talepleriniz veya notlarınız varsa buraya yazabilirsiniz..."
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

          {/* Özet */}
          {selectedDate && selectedTime && (
            <div className="booking-summary">
              <h4>📋 Randevu Özeti</h4>
              <div className="summary-item">
                <span className="summary-label">Hizmet:</span>
                <span className="summary-value">{service.name}</span>
              </div>
              {provider && (
                <div className="summary-item">
                  <span className="summary-label">Hizmet Veren:</span>
                  <span className="summary-value">{provider.name}</span>
                </div>
              )}
              <div className="summary-item">
                <span className="summary-label">Tarih:</span>
                <span className="summary-value">
                  {formatDate(selectedDate)}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Saat:</span>
                <span className="summary-value">{selectedTime}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Süre:</span>
                <span className="summary-value">{service.duration} dakika</span>
              </div>
              <div className="summary-item summary-total">
                <span className="summary-label">Toplam:</span>
                <span className="summary-value">{service.price}€</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>
            İptal
          </button>
          <button
            className="btn-primary"
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || loading}
          >
            {loading ? "Oluşturuluyor..." : "✅ Randevuyu Onayla"}
          </button>
        </div>
      </div>
    </div>
  );
}
