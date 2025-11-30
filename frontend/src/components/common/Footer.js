import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="brand-tile-small">4</div>
              <span className="brand-name">ALL IN ONE</span>
            </div>
            <p className="footer-description">
              2018'den beri Almanya'da güvenilir ev hizmetleri. Profesyonel,
              hızlı ve uygun fiyatlı çözümler.
            </p>
            <div className="social-links-footer">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                📷
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐦
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/hizmetler">Hizmetler</Link>
              </li>
              <li>
                <Link to="/hakkimizda">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/iletisim">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="footer-section">
            <h4>Popüler Hizmetler</h4>
            <ul className="footer-links">
              <li>
                <Link to="/hizmetler">Temizlik</Link>
              </li>
              <li>
                <Link to="/hizmetler">Tadilat</Link>
              </li>
              <li>
                <Link to="/hizmetler">Bahçe Bakımı</Link>
              </li>
              <li>
                <Link to="/hizmetler">Nakliye</Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="footer-section">
            <h4>İletişim</h4>
            <ul className="footer-contact">
              <li>📍 Musterstraße 123, Berlin</li>
              <li>
                📞 <a href="tel:+491234567890">+49 123 456 7890</a>
              </li>
              <li>
                📧 <a href="mailto:info@allinone.de">info@allinone.de</a>
              </li>
              <li>
                💬{" "}
                <a
                  href="https://wa.me/491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} ALL IN ONE. Tüm hakları saklıdır.</p>
          <div className="footer-legal">
            <Link to="/privacy">Gizlilik Politikası</Link>
            <span>•</span>
            <Link to="/terms">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
