import React, { useState } from "react";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesajınız gönderildi! En kısa sürede dönüş yapacağız.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <header className="page-header">
          <h1>📞 Bizimle İletişime Geçin</h1>
          <p>
            Sorularınız için buradayız. 7/24 destek ekibimiz size yardımcı
            olmaktan mutluluk duyar.
          </p>
        </header>

        <div className="contact-grid">
          {/* İletişim Bilgileri */}
          <div className="contact-info-card">
            <h2>İletişim Bilgileri</h2>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Adres</h3>
                <p>
                  Musterstraße 123
                  <br />
                  10115 Berlin, Deutschland
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Telefon</h3>
                <p>
                  <a href="tel:+491234567890">+49 123 456 7890</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>E-posta</h3>
                <p>
                  <a href="mailto:info@allinone.de">info@allinone.de</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <h3>WhatsApp</h3>
                <p>
                  <a
                    href="https://wa.me/491234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                  >
                    WhatsApp'tan Yaz
                  </a>
                </p>
              </div>
            </div>

            <div className="social-links">
              <h3>Sosyal Medya</h3>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📘 Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📷 Instagram
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🐦 Twitter
                </a>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Mesaj Gönderin</h2>

            <div className="form-group">
              <label className="form-label">Adınız Soyadınız *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-posta Adresiniz *</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Konu</label>
              <input
                type="text"
                className="form-input"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mesajınız *</label>
              <textarea
                className="form-textarea"
                rows="6"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary btn-block">
              📤 Mesajı Gönder
            </button>
          </form>
        </div>

        {/* Google Maps */}
        <div className="map-section">
          <h2>📍 Bizi Haritada Bulun</h2>
          <iframe
            title="ALL IN ONE Harita"
            src="https://www.google. com/maps/embed?pb=!1m18!1m12!1m3!1d2427.4926433923185!2d13.404953999999999!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3! 1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63! 2sBrandenburg%20Gate! 5e0!3m2! 1sen!2sde!4v1234567890123"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
