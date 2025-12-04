import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import BookingModal from "../components/booking/BookingModal";
import "../styles/ServicesDetailPage.css";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("details"); // details, gallery, faq
  const [loading, setLoading] = useState(true);

  const fetchServiceDetails = useCallback(async () => {
    try {
      const response = await api.get(`/services/${id}`);
      setService(response.data);
      setProviders(response.data.providers || []);
    } catch (error) {
      console.error("Hizmet detayları yüklenirken hata:", error);
      // Demo data
      setService({
        _id: id,
        name: "Profesyonel Ev Temizliği",
        category: { name: "Temizlik", icon: "🧹" },
        price: 40,
        duration: 120,
        rating: 4.8,
        reviewsCount: 156,
        image: "https://via.placeholder.com/800x500?text=Ev+Temizligi",
        shortDescription: "Detaylı ve hijyenik ev temizlik hizmeti",
        longDescription: `
          Profesyonel ekibimizle evinizi en ince detayına kadar temizliyoruz. 
          Çevre dostu temizlik ürünleri kullanarak sağlıklı bir yaşam alanı oluşturuyoruz.  
          Tüm ekipmanlarımız dezenfekte edilmiş ve hijyenik koşullarda hazırlanmıştır. 
        `,
        includes: [
          "Tüm odaların genel temizliği",
          "Mutfak ve banyo detaylı temizlik",
          "Cam ve ayna silme",
          "Yer silme ve elektrik süpürgesi",
          "Toz alma ve yüzey temizliği",
          "Çöp toplama ve çıkarma",
        ],
        gallery: [
          "https://via.placeholder.com/600x400?text=Galeri+1",
          "https://via. placeholder.com/600x400? text=Galeri+2",
          "https://via.placeholder.com/600x400?text=Galeri+3",
          "https://via.placeholder. com/600x400?text=Galeri+4",
          "https://via.placeholder.com/600x400?text=Galeri+5",
          "https://via.placeholder.com/600x400?text=Galeri+6",
        ],
        faqs: [
          {
            question: "Temizlik malzemeleri sizde mi?",
            answer:
              "Evet, tüm temizlik malzemeleri ve ekipmanları bizim tarafımızdan sağlanmaktadır.",
          },
          {
            question: "Ne kadar sürer?",
            answer:
              "Ortalama 2-3 saatlik bir süreçtir. Evinizin büyüklüğüne göre değişiklik gösterebilir.",
          },
          {
            question: "Sigortalı mısınız?",
            answer:
              "Evet, tüm ekibimiz sigortalıdır ve olası hasarlara karşı sigorta kapsamımız vardır.",
          },
          {
            question: "İptal edebilir miyim?",
            answer:
              "Randevunuzdan 24 saat öncesine kadar ücretsiz iptal edebilirsiniz.",
          },
        ],
      });

      setProviders([
        {
          _id: "1",
          name: "Ayşe Temizlik",
          type: "individual",
          avatar: "https://i.pravatar.cc/150?img=1",
          rating: 4.9,
          reviewsCount: 87,
          experience: 5,
          completedJobs: 230,
          responseTime: "~2 saat",
          about:
            "5 yıldır profesyonel temizlik hizmeti veriyorum. Müşteri memnuniyeti benim önceliğim.",
        },
        {
          _id: "2",
          name: "CleanPro GmbH",
          type: "company",
          avatar: "https://i.pravatar.cc/150?img=2",
          rating: 4.8,
          reviewsCount: 342,
          experience: 10,
          completedJobs: 1850,
          responseTime: "~1 saat",
          about:
            "Almanya genelinde hizmet veren profesyonel temizlik şirketi. ISO 9001 sertifikalı.",
        },
        {
          _id: "3",
          name: "Mehmet Usta",
          type: "individual",
          avatar: "https://i.pravatar.cc/150?img=3",
          rating: 4.7,
          reviewsCount: 124,
          experience: 7,
          completedJobs: 456,
          responseTime: "~3 saat",
          about:
            "Titiz ve hızlı çalışma prensibimle evlerinizi pırıl pırıl ediyorum.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchServiceDetails();
  }, [fetchServiceDetails]);

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (service.gallery && lightboxIndex < service.gallery.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
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
    return (
      <div className="error-container">
        <h2>Hizmet bulunamadı</h2>
        <button className="btn-primary" onClick={() => navigate("/hizmetler")}>
          ← Hizmetlere Dön
        </button>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Ana Sayfa</a>
          <span>/</span>
          <a href="/hizmetler">Hizmetler</a>
          <span>/</span>
          <span>{service.category?.name}</span>
          <span>/</span>
          <span className="current">{service.name}</span>
        </div>

        {/* Hero Section */}
        <div className="service-hero">
          <div className="hero-image">
            <img src={service.image} alt={service.name} />
            <div className="hero-badge">
              {service.category?.icon} {service.category?.name}
            </div>
          </div>

          <div className="hero-content">
            <h1>{service.name}</h1>
            <p className="hero-description">{service.shortDescription}</p>

            <div className="hero-stats">
              <div className="stat-box">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-value">{service.rating}</div>
                  <div className="stat-label">
                    ({service.reviewsCount} değerlendirme)
                  </div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <div className="stat-value">{service.duration} dk</div>
                  <div className="stat-label">Tahmini Süre</div>
                </div>
              </div>

              <div className="stat-box stat-price-box">
                <div className="stat-icon">💶</div>
                <div className="stat-info">
                  <div className="stat-value">{service.price}€</div>
                  <div className="stat-label">Başlangıç Fiyatı</div>
                </div>
              </div>
            </div>

            <button
              className="btn-primary btn-lg btn-book"
              onClick={openBookingModal}
            >
              📅 Hemen Randevu Al
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <button
            className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            📋 Detaylar
          </button>
          <button
            className={`tab-btn ${activeTab === "providers" ? "active" : ""}`}
            onClick={() => setActiveTab("providers")}
          >
            👥 Hizmet Verenler ({providers.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            🖼️ Galeri ({service.gallery?.length || 0})
          </button>
          <button
            className={`tab-btn ${activeTab === "faq" ? "active" : ""}`}
            onClick={() => setActiveTab("faq")}
          >
            ❓ SSS
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="details-content">
              <section className="detail-section">
                <h2>📖 Hizmet Hakkında</h2>
                <p className="long-description">{service.longDescription}</p>
              </section>

              {service.includes && service.includes.length > 0 && (
                <section className="detail-section">
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

              <section className="detail-section">
                <h2>📞 İletişim</h2>
                <div className="contact-grid">
                  <a href="tel:+491234567890" className="contact-card">
                    <div className="contact-icon">📞</div>
                    <div>
                      <div className="contact-label">Telefon</div>
                      <div className="contact-value">+49 123 456 7890</div>
                    </div>
                  </a>

                  <a href="mailto:info@allinone.de" className="contact-card">
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
                    className="contact-card whatsapp"
                  >
                    <div className="contact-icon">💬</div>
                    <div>
                      <div className="contact-label">WhatsApp</div>
                      <div className="contact-value">Mesaj Gönder</div>
                    </div>
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* Providers Tab */}
          {activeTab === "providers" && (
            <div className="providers-content">
              <h2>👥 Bu Hizmeti Verenler</h2>
              <p className="section-subtitle">
                Size en uygun hizmet vereni seçin ve randevu oluşturun.
              </p>

              <div className="providers-grid">
                {providers.map((provider) => (
                  <div
                    key={provider._id}
                    className={`provider-card ${
                      selectedProvider?._id === provider._id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div className="provider-header">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="provider-avatar"
                      />
                      <div className="provider-main-info">
                        <h3>{provider.name}</h3>
                        <div className="provider-type-badge">
                          {provider.type === "company"
                            ? "🏢 Şirket"
                            : "👤 Uzman"}
                        </div>
                      </div>
                      {selectedProvider?._id === provider._id && (
                        <div className="selected-check">✓</div>
                      )}
                    </div>

                    <p className="provider-about">{provider.about}</p>

                    <div className="provider-stats-grid">
                      <div className="provider-stat">
                        <div className="provider-stat-icon">⭐</div>
                        <div>
                          <div className="provider-stat-value">
                            {provider.rating}
                          </div>
                          <div className="provider-stat-label">
                            {provider.reviewsCount} değerlendirme
                          </div>
                        </div>
                      </div>

                      <div className="provider-stat">
                        <div className="provider-stat-icon">📅</div>
                        <div>
                          <div className="provider-stat-value">
                            {provider.experience} yıl
                          </div>
                          <div className="provider-stat-label">Deneyim</div>
                        </div>
                      </div>

                      <div className="provider-stat">
                        <div className="provider-stat-icon">✅</div>
                        <div>
                          <div className="provider-stat-value">
                            {provider.completedJobs}
                          </div>
                          <div className="provider-stat-label">
                            Tamamlanan İş
                          </div>
                        </div>
                      </div>

                      <div className="provider-stat">
                        <div className="provider-stat-icon">⚡</div>
                        <div>
                          <div className="provider-stat-value">
                            {provider.responseTime}
                          </div>
                          <div className="provider-stat-label">
                            Yanıt Süresi
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-primary btn-block"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProvider(provider);
                        openBookingModal();
                      }}
                    >
                      {provider.name} ile Randevu Al
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="gallery-content">
              <h2>🖼️ Örnek İşlerimiz</h2>
              <p className="section-subtitle">
                Bu hizmete ait daha önce yaptığımız işlerden örnekler.
              </p>

              {service.gallery && service.gallery.length > 0 ? (
                <div className="gallery-grid">
                  {service.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="gallery-item"
                      onClick={() => openLightbox(index)}
                    >
                      <img src={image} alt={`Galeri ${index + 1}`} />
                      <div className="gallery-overlay">
                        <span className="gallery-zoom-icon">🔍</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-gallery">
                  <div className="empty-icon">📷</div>
                  <p>Henüz galeri görseli eklenmemiş.</p>
                </div>
              )}
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="faq-content">
              <h2>❓ Sık Sorulan Sorular</h2>
              <p className="section-subtitle">
                Bu hizmet hakkında en çok sorulan sorular ve cevapları.
              </p>

              {service.faqs && service.faqs.length > 0 ? (
                <div className="faq-list">
                  {service.faqs.map((faq, index) => (
                    <details key={index} className="faq-item">
                      <summary className="faq-question">{faq.question}</summary>
                      <div className="faq-answer">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="empty-faq">
                  <div className="empty-icon">❓</div>
                  <p>Henüz SSS eklenmemiş.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Book Button (Mobile) */}
        <button className="floating-book-btn" onClick={openBookingModal}>
          📅 Randevu Al
        </button>
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
            <button className="lightbox-prev" onClick={prevImage}>
              ‹
            </button>
          )}

          <img
            src={service.gallery[lightboxIndex]}
            alt={`Galeri ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {lightboxIndex < service.gallery.length - 1 && (
            <button className="lightbox-next" onClick={nextImage}>
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
