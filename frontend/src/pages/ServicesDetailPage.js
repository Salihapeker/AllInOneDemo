// src/pages/ServicesDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../services/api";
import BookingModal from "../components/booking/BookingModal";
import PreChatModal from "../components/booking/PreChatModal";

const ServicesDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showPreChat, setShowPreChat] = useState(false);

  useEffect(() => {
    let mounted = true;
    getServiceById(id)
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setService({
          id: data.id,
          name: data.name,
          description: data.description || data.short_description || "",
          gallery: data.gallery || data.examples || ["/images/placeholder.png"],
          priceFrom: data.price_from || null,
          provider: data.provider || data.provider_id || null,
          workingHours: data.working_hours || "09:00 - 18:00",
        });
      })
      .catch(() => {
        if (!mounted) return;
        // fallback mock
        setService({
          id,
          name: "Tesisatçı",
          description:
            "Tesisat onarımı, su kaçakları, kombi bağlantıları, boru değişimi ve acil müdahale hizmetleri.",
          gallery: ["/images/placeholder.png", "/images/placeholder.png"],
          priceFrom: null,
          provider: 101,
          workingHours: "09:00 - 18:00",
        });
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>;
  if (!service) return <div className="card">Hizmet bulunamadı.</div>;

  return (
    <div className="container" style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 28 }}>
        <div style={{ flex: 1 }}>
          <h1 className="display-stoewer" style={{ fontSize: 28 }}>
            {service.name}
          </h1>
          <p className="text-muted">{service.description}</p>

          <div style={{ marginTop: 18 }}>
            <h3>Örnek İşler</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {service.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`ex-${i}`}
                  style={{
                    width: 160,
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                  onError={(e) =>
                    (e.currentTarget.src = "/images/placeholder.png")
                  }
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3>Detaylar</h3>
            <ul>
              <li>Çalışma Saatleri: {service.workingHours}</li>
              <li>Ön görüşme ile hizmet koşulları netleştirilir.</li>
              <li>
                Fiyat: Hizmete göre değişir (yerinde değerlendirme veya ön
                görüşme ile belirlenir).
              </li>
            </ul>
          </div>
        </div>

        <aside style={{ width: 360 }}>
          <div className="card" style={{ padding: 14 }}>
            <h4>İşlemler</h4>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                className="btn btn-primary"
                onClick={() => setShowBooking(true)}
              >
                Takvimi Gör
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowPreChat(true)}
              >
                Ön Görüşme
              </button>
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="text-muted">
                Randevu oluşturmak için giriş yapmanız gerekmektedir.
                Oluşturulan talepler sağlayıcı tarafından onaylanacaktır.
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showBooking && (
        <BookingModal
          providerId={service.provider}
          serviceId={service.id}
          onClose={() => setShowBooking(false)}
          onBooked={() => setShowBooking(false)}
        />
      )}

      {showPreChat && (
        <PreChatModal
          providerId={service.provider}
          onClose={() => setShowPreChat(false)}
        />
      )}
    </div>
  );
};

export default ServicesDetailPage;
