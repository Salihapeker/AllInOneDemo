import React from "react";
import "../styles/LegalPages.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Header */}
        <div className="legal-header">
          <div className="legal-icon">🔒</div>
          <h1 className="legal-title">Gizlilik Politikası</h1>
          <p className="legal-subtitle">
            DSGVO (Allgemeine Datenschutzverordnung) uyumlu gizlilik politikamız
          </p>
          <div className="legal-last-updated">
            📅 Son Güncelleme: 1 Mayıs 2024
          </div>
        </div>

        {/* Table of Contents */}
        <div className="legal-toc">
          <div className="legal-toc-title">İçindekiler</div>
          <div className="legal-toc-list">
            <a href="#overview" className="legal-toc-item">
              <div className="legal-toc-number">1</div>
              Genel Bakış
            </a>
            <a href="#responsible" className="legal-toc-item">
              <div className="legal-toc-number">2</div>
              Sorumlu Taraf
            </a>
            <a href="#data-collection" className="legal-toc-item">
              <div className="legal-toc-number">3</div>
              Veri Toplama
            </a>
            <a href="#data-usage" className="legal-toc-item">
              <div className="legal-toc-number">4</div>
              Verilerin Kullanımı
            </a>
            <a href="#rights" className="legal-toc-item">
              <div className="legal-toc-number">5</div>
              Haklarınız
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="legal-content">
          {/* Section 1 */}
          <section id="overview" className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📋</div>
              1. Genel Bakış
            </h2>
            <div className="legal-section-content">
              <p>
                Bu gizlilik politikası, All In One 4 You platformunu kullandığınızda
                kişisel verilerinize ne olduğunu açıklar. Kişisel veriler, sizi
                kişisel olarak tanımlamak için kullanılabilecek tüm verilerdir.
              </p>
              <p>
                Verilerinizin korunmasını ciddiye alıyoruz. Kişisel verilerinizi
                gizli tutuyoruz ve yürürlükteki veri koruma mevzuatına (özellikle
                DSGVO/GDPR) uygun şekilde işliyoruz.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="responsible" className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">🏢</div>
              2. Sorumlu Taraf (Verilerin İşlenmesinden Sorumlu)
            </h2>
            <div className="legal-section-content">
              <div className="legal-info-box info">
                <div className="legal-info-box-title">📍 İletişim Bilgileri</div>
                <div className="legal-info-box-content">
                  <strong>All In One 4 You GmbH</strong>
                  <br />
                  Musterstraße 123
                  <br />
                  12345 Berlin, Almanya
                  <br />
                  <br />
                  E-posta: datenschutz@allinone4you.de
                  <br />
                  Telefon: +49 123 456 7890
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="data-collection" className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📊</div>
              3. Topladığımız Veriler
            </h2>
            <div className="legal-section-content">
              <p>Web sitemizde ve platformumuzda aşağıdaki kişisel verileri topluyoruz:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    <strong>Kimlik Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    <strong>Randevu Bilgileri:</strong> Talep edilen hizmet, tarih, saat, adres
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    <strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    <strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklama davranışları
                  </div>
                </li>
              </ul>

              <div className="legal-info-box warning">
                <div className="legal-info-box-title">⚠️ Önemli</div>
                <div className="legal-info-box-content">
                  Hassas kişisel veriler (sağlık bilgileri, dini inanç, vb.) tarafımızca
                  toplanmamakta ve işlenmemektedir.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="data-usage" className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">⚙️</div>
              4. Verilerin Kullanımı
            </h2>
            <div className="legal-section-content">
              <p>Topladığımız verileri aşağıdaki amaçlarla kullanıyoruz:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">1</div>
                  <div className="legal-list-text">
                    Randevu oluşturma ve yönetimi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">2</div>
                  <div className="legal-list-text">
                    Hizmet sağlayıcılar ile iletişim kurulması
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">3</div>
                  <div className="legal-list-text">
                    Bildirim ve hatırlatmaların gönderilmesi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">4</div>
                  <div className="legal-list-text">
                    Platform güvenliğinin sağlanması
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">5</div>
                  <div className="legal-list-text">
                    Yasal yükümlülüklerin yerine getirilmesi
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="rights" className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">⚖️</div>
              5. DSGVO Kapsamındaki Haklarınız
            </h2>
            <div className="legal-section-content">
              <p>
                Avrupa Birliği Genel Veri Koruma Tüzüğü (DSGVO/GDPR) kapsamında
                aşağıdaki haklara sahipsiniz:
              </p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">📋</div>
                  <div className="legal-list-text">
                    <strong>Bilgi Edinme Hakkı (Madde 15):</strong> İşlenen verileriniz hakkında bilgi talep edebilirsiniz.
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✏️</div>
                  <div className="legal-list-text">
                    <strong>Düzeltme Hakkı (Madde 16):</strong> Yanlış verilerin düzeltilmesini talep edebilirsiniz.
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🗑️</div>
                  <div className="legal-list-text">
                    <strong>Silme Hakkı (Madde 17):</strong> Verilerinizin silinmesini talep edebilirsiniz.
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🔒</div>
                  <div className="legal-list-text">
                    <strong>İşlemenin Kısıtlanması (Madde 18):</strong> Veri işlemenin kısıtlanmasını talep edebilirsiniz.
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">📦</div>
                  <div className="legal-list-text">
                    <strong>Veri Taşınabilirliği (Madde 20):</strong> Verilerinizi yapılandırılmış formatta alabilirsiniz.
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✋</div>
                  <div className="legal-list-text">
                    <strong>İtiraz Hakkı (Madde 21):</strong> Veri işlemeye itiraz edebilirsiniz.
                  </div>
                </li>
              </ul>

              <div className="legal-info-box success">
                <div className="legal-info-box-title">💡 Nasıl Başvurabilirim?</div>
                <div className="legal-info-box-content">
                  Yukarıdaki haklarınızı kullanmak için datenschutz@allinone4you.de
                  adresine e-posta göndererek veya iletişim formu aracılığıyla
                  bize ulaşabilirsiniz.
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <div className="legal-contact">
            <h3 className="legal-contact-title">📞 İletişim</h3>
            <div className="legal-contact-grid">
              <a href="mailto:datenschutz@allinone4you.de" className="legal-contact-item">
                <div className="legal-contact-icon">📧</div>
                <div>
                  <div className="legal-contact-label">E-posta</div>
                  <div className="legal-contact-value">datenschutz@allinone4you.de</div>
                </div>
              </a>
              <a href="tel:+491234567890" className="legal-contact-item">
                <div className="legal-contact-icon">📞</div>
                <div>
                  <div className="legal-contact-label">Telefon</div>
                  <div className="legal-contact-value">+49 123 456 7890</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
