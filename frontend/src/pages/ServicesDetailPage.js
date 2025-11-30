import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BookingModal from "../components/booking/BookingModal";
import "../styles/ServicesDetailPage.css";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await api.get(`/services/${id}`);
      setService(response.data);
    } catch (error) {
      console.error("Hizmet detayları yüklenirken hata:", error);
      navigate("/hizmetler");
    } finally {
      setLoading(false);
    }
  };

  const openBookingModal = (provider = null) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (service.gallery && lightboxIndex < service.gallery.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!service) {
    return <div className="error-message">Hizmet bulunamadı. </div>;
  }

  return (
    <div className="service-detail-page">
      <div className="container">
        {/* Header Section */}
        <div className="service-header">
          <div className="service-header-content">
            <h1>{service.name}</h1>
            <p className="service-category">
              📦 {service.category?.name || "Genel"}
            </p>
            <p className="service-long-description">
              {service.longDescription || service.description}
            </p>

            <div className="service-meta-info">
              <div className="meta-item">
                <span className="meta-icon">💶</span>
                <div>
                  <div className="meta-label">Fiyat</div>
                  <div className="meta-value">{service.price}€</div>
                </div>
              </div>

              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <div>
                  <div className="meta-label">Süre</div>
                  <div className="meta-value">{service.duration} dk</div>
                </div>
              </div>

              <div className="meta-item">
                <span className="meta-icon">⭐</span>
                <div>
                  <div className="meta-label">Değerlendirme</div>
                  <div className="meta-value">4.8/5</div>
                </div>
              </div>
            </div>

            <button
              className="btn-primary btn-lg"
              onClick={() => openBookingModal()}
            >
              📅 Hemen Randevu Al
            </button>
          </div>

          <div className="service-header-image">
            <img
              src={service.image || "/placeholder. jpg"}
              alt={service.name}
            />
          </div>
        </div>

        {/* Neler Dahil Section */}
        {service.includes && service.includes.length > 0 && (
          <section className="includes-section">
            <h2>✅ Hizmete Dahil Olanlar</h2>
            <ul className="includes-list">
              {service.includes.map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Usta/Şirket Seçimi */}
        {service.providers && service.providers.length > 0 && (
          <section className="providers-section">
            <h2>👥 Hizmet Verenler</h2>
            <p className="section-subtitle">
              Size en uygun uzmanı seçin veya otomatik atama için "Randevu Al"
              butonunu kullanın.
            </p>

            <div className="provider-list">
              {service.providers.map((provider) => (
                <div
                  key={provider._id}
                  className={`provider-card ${
                    selectedProvider?._id === provider._id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedProvider(provider)}
                >
                  <img
                    src={provider.avatar || "/default-avatar.png"}
                    alt={provider.name}
                    className="provider-avatar"
                  />

                  <div className="provider-info">
                    <h3>{provider.name}</h3>
                    <div className="provider-badge">
                      {provider.type === "company" ? "🏢 Şirket" : "👤 Uzman"}
                    </div>
                    <div className="provider-rating">
                      ⭐ {provider.rating || 4.5}/5 ({provider.reviews || 0}{" "}
                      değerlendirme)
                    </div>
                    <p className="provider-experience">
                      📅 {provider.experience || 5} yıl deneyim
                    </p>
                  </div>

                  {selectedProvider?._id === provider._id && (
                    <div className="selected-indicator">✓</div>
                  )}
                </div>
              ))}
            </div>

            {selectedProvider && (
              <div className="selected-provider-action">
                <button
                  className="btn-primary btn-lg"
                  onClick={() => openBookingModal(selectedProvider)}
                >
                  📅 {selectedProvider.name} ile Randevu Al
                </button>
              </div>
            )}
          </section>
        )}

        {/* Örnek İşler Galerisi */}
        {service.gallery && service.gallery.length > 0 && (
          <section className="gallery-section">
            <h2>🖼️ Örnek İşlerimiz</h2>
            <div className="gallery-grid">
              {service.gallery.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => openLightbox(index)}
                >
                  <img src={image} alt={`Örnek ${index + 1}`} />
                  <div className="gallery-overlay">
                    <span>🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SSS Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="faq-section">
            <h2>❓ Sık Sorulan Sorular</h2>
            <div className="faq-list">
              {service.faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">{faq.question}</summary>
                  <div className="faq-answer">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* İletişim Bilgileri */}
        <section className="contact-info-section">
          <h2>📞 Sorularınız mı var?</h2>
          <p className="section-subtitle">
            Hizmet hakkında detaylı bilgi almak için bize ulaşın.
          </p>

          <div className="contact-methods">
            <a href="tel:+491234567890" className="contact-method">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-label">Telefon</div>
                <div className="contact-value">+49 123 456 7890</div>
              </div>
            </a>

            <a href="mailto:info@allinone.de" className="contact-method">
              <div className="contact-icon">📧</div>
              <div>
                <div className="contact-label">E-posta</div>
                <div className="contact-value">info@allinone.de</div>
              </div>
            </a>

            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method whatsapp"
            >
              <div className="contact-icon">💬</div>
              <div>
                <div className="contact-label">WhatsApp</div>
                <div className="contact-value">Direkt Mesaj</div>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          service={service}
          provider={selectedProvider}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && service.gallery && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>

          {lightboxIndex > 0 && (
            <button
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              ‹
            </button>
          )}

          <img
            src={service.gallery[lightboxIndex]}
            alt={`Galeri ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {lightboxIndex < service.gallery.length - 1 && (
            <button
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ›
            </button>
          )}

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {service.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}
