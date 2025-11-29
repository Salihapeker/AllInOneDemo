import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderProfile } from "../../services/api";
import BookingModal from "../booking/BookingModal";
import PreChatModal from "../booking/PreChatModal";
import AppointmentForm from "../forms/AppointmentForm";
import "../../styles/globals.css";

/*
  WorkerDetail (updated)
  - Adds Takvimi Gör and Ön Görüşme modals
  - Booking requires login to finalize (redirects to /login)
*/

export default function WorkerDetail({ providerId: propProviderId = null }) {
  const params = useParams();
  const providerId = propProviderId || params.providerId;
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showPreChat, setShowPreChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }
    let mounted = true;
    getProviderProfile(providerId)
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setProvider({
          id: data.id,
          name: data.name,
          avatar: data.avatar || "/images/provider-placeholder.jpg",
          bio: data.bio || data.description || "",
          region: data.region || data.location || "",
          phone: data.phone || "",
          examples: data.examples || data.gallery || [],
          workingHours: data.working_hours || "09:00 - 18:00",
        });
      })
      .catch(() => {
        if (!mounted) return;
        setProvider({
          id: providerId,
          name: "Usta Demo",
          avatar: "/images/provider-placeholder.jpg",
          bio: "Deneyimli usta, çeşitli tamir ve bakım işleri yapar.",
          region: "Berlin",
          phone: "+49 170 000 0000",
          examples: [],
          workingHours: "09:00 - 18:00",
        });
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [providerId]);

  if (loading) return <div className="loading-spinner card">Yükleniyor...</div>;
  if (!provider) return <div className="card">Sağlayıcı bulunamadı.</div>;

  const handleBookClick = () => {
    setShowBooking(true);
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 18 }}>
        <img
          src={provider.avatar}
          alt={provider.name}
          style={{
            width: 140,
            height: 140,
            borderRadius: 12,
            objectFit: "cover",
          }}
          onError={(e) =>
            (e.currentTarget.src = "/images/provider-placeholder.jpg")
          }
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>
                {provider.name}
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {provider.region} • {provider.workingHours}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" onClick={handleBookClick}>
                Takvimi Gör
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowPreChat(true)}
              >
                Ön Görüşme
              </button>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <h4>Açıklama</h4>
            <p className="text-muted">{provider.bio}</p>
          </div>

          {provider.examples?.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h4>Örnek İşler</h4>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {provider.examples.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`example-${i}`}
                    style={{
                      width: 120,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    onError={(e) =>
                      (e.currentTarget.src = "/images/placeholder.png")
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showBooking && (
        <BookingModal
          providerId={provider.id}
          serviceId={null}
          onClose={() => setShowBooking(false)}
          onBooked={() => setShowBooking(false)}
        />
      )}

      {showPreChat && (
        <PreChatModal
          providerId={provider.id}
          onClose={() => setShowPreChat(false)}
        />
      )}
    </div>
  );
}
