import React, { useState } from "react";
import "../styles/LegalPages.css";

export default function CookiePolicyPage() {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Çerezler nedir?",
      answer:
        "Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır. Bu dosyalar, tercihlerinizi hatırlamak ve deneyiminizi kişiselleştirmek için kullanılır.",
    },
    {
      question: "Çerezleri nasıl silebilirim?",
      answer:
        "Tarayıcı ayarlarınızdan çerezleri silebilirsiniz. Her tarayıcının farklı adımları vardır. Genellikle Ayarlar > Gizlilik > Çerezler bölümünden ulaşabilirsiniz.",
    },
    {
      question: "Çerezleri engelleyebilir miyim?",
      answer:
        "Evet, tarayıcı ayarlarından çerezleri engelleyebilirsiniz. Ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir.",
    },
  ];

  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Header */}
        <div className="legal-header">
          <div className="legal-icon">🍪</div>
          <h1 className="legal-title">Çerez Politikası</h1>
          <p className="legal-subtitle">
            Web sitemizde kullandığımız çerezler hakkında bilgi
          </p>
          <div className="legal-last-updated">
            📅 Son Güncelleme: 20 Mart 2024
          </div>
        </div>

        {/* Content */}
        <div className="legal-content">
          {/* Section 1 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">🍪</div>
              1. Çerezler Hakkında
            </h2>
            <div className="legal-section-content">
              <p>
                All In One 4 You web sitesi, deneyiminizi geliştirmek ve size
                daha iyi hizmet sunmak amacıyla çerezler kullanmaktadır.
              </p>
              <p>
                Bu politika, hangi çerezleri kullandığımızı, neden
                kullandığımızı ve bunları nasıl yönetebileceğinizi açıklar.
              </p>

              {/* Cookie Banner Preview */}
              <div className="cookie-banner-preview">
                <div className="cookie-banner-preview-title">
                  🖥️ Çerez Bildirimi Önizlemesi
                </div>
                <div className="cookie-banner-demo">
                  <div className="cookie-banner-text">
                    🍪 Bu web sitesi deneyiminizi geliştirmek için çerezler
                    kullanmaktadır. Devam ederek çerez politikamızı kabul etmiş
                    olursunuz.
                  </div>
                  <div className="cookie-banner-actions">
                    <button className="cookie-banner-btn accept">
                      Kabul Et
                    </button>
                    <button className="cookie-banner-btn settings">
                      Ayarlar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📊</div>
              2. Kullandığımız Çerez Türleri
            </h2>
            <div className="legal-section-content">
              <table className="cookie-types-table">
                <thead>
                  <tr>
                    <th>Çerez Türü</th>
                    <th>Açıklama</th>
                    <th>Süre</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Zorunlu Çerezler</strong>
                    </td>
                    <td>
                      Web sitesinin temel işlevleri için gereklidir. Oturum
                      yönetimi ve güvenlik sağlar.
                    </td>
                    <td>Oturum</td>
                    <td>
                      <span className="cookie-status required">Zorunlu</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Analitik Çerezler</strong>
                    </td>
                    <td>
                      Ziyaretçi istatistiklerini toplamak ve site performansını
                      ölçmek için kullanılır.
                    </td>
                    <td>2 yıl</td>
                    <td>
                      <span className="cookie-status optional">
                        İsteğe Bağlı
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fonksiyonel Çerezler</strong>
                    </td>
                    <td>
                      Dil tercihi, tema gibi kişiselleştirme ayarlarınızı
                      hatırlar.
                    </td>
                    <td>1 yıl</td>
                    <td>
                      <span className="cookie-status optional">
                        İsteğe Bağlı
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Pazarlama Çerezleri</strong>
                    </td>
                    <td>
                      İlgi alanlarınıza göre reklamlar sunmak için kullanılır.
                    </td>
                    <td>6 ay</td>
                    <td>
                      <span className="cookie-status optional">
                        İsteğe Bağlı
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">🔧</div>
              3. Zorunlu Çerezler
            </h2>
            <div className="legal-section-content">
              <p>
                Bu çerezler, web sitesinin düzgün çalışması için kesinlikle
                gereklidir. Devre dışı bırakılamazlar.
              </p>

              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">🔐</div>
                  <div className="legal-list-text">
                    <strong>Oturum Çerezi:</strong> Kullanıcı girişi ve güvenli
                    oturum yönetimi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🛡️</div>
                  <div className="legal-list-text">
                    <strong>CSRF Token:</strong> Güvenlik saldırılarına karşı
                    koruma
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    <strong>Çerez Onayı:</strong> Çerez tercihlerinizi hatırlama
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📈</div>
              4. Analitik Çerezler
            </h2>
            <div className="legal-section-content">
              <p>
                Ziyaretçi istatistiklerini toplamak ve sitemizi geliştirmek için
                aşağıdaki analitik araçları kullanıyoruz:
              </p>

              <div className="legal-info-box info">
                <div className="legal-info-box-title">📊 Google Analytics</div>
                <div className="legal-info-box-content">
                  Google Analytics, web sitesi trafiğini analiz etmek için
                  kullanılır. IP adresleri anonimleştirilmiştir. Bu çerezler
                  onayınız ile aktifleştirilir.
                  <br />
                  <br />
                  Daha fazla bilgi için:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Gizlilik Politikası
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">⚙️</div>
              5. Çerez Yönetimi
            </h2>
            <div className="legal-section-content">
              <p>
                Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. İşte popüler
                tarayıcılar için bağlantılar:
              </p>

              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">🌐</div>
                  <div className="legal-list-text">
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Chrome - Çerez Ayarları
                    </a>
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🦊</div>
                  <div className="legal-list-text">
                    <a
                      href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mozilla Firefox - Çerez Ayarları
                    </a>
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🧭</div>
                  <div className="legal-list-text">
                    <a
                      href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Safari - Çerez Ayarları
                    </a>
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">📘</div>
                  <div className="legal-list-text">
                    <a
                      href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Microsoft Edge - Çerez Ayarları
                    </a>
                  </div>
                </li>
              </ul>

              <div className="legal-info-box warning">
                <div className="legal-info-box-title">⚠️ Dikkat</div>
                <div className="legal-info-box-content">
                  Çerezleri devre dışı bırakırsanız, web sitemizin bazı
                  özellikleri düzgün çalışmayabilir.
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">❓</div>
              6. Sık Sorulan Sorular
            </h2>
            <div className="legal-section-content">
              <div className="legal-accordion">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`legal-accordion-item ${
                      expandedItems.includes(index) ? "open" : ""
                    }`}
                  >
                    <div
                      className="legal-accordion-header"
                      onClick={() => toggleItem(index)}
                    >
                      <span>{faq.question}</span>
                      <span className="legal-accordion-icon">▼</span>
                    </div>
                    {expandedItems.includes(index) && (
                      <div className="legal-accordion-content">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <div className="legal-contact">
            <h3 className="legal-contact-title">📞 Sorularınız mı var?</h3>
            <div className="legal-contact-grid">
              <a
                href="mailto:datenschutz@allinone4you.de"
                className="legal-contact-item"
              >
                <div className="legal-contact-icon">📧</div>
                <div>
                  <div className="legal-contact-label">E-posta</div>
                  <div className="legal-contact-value">
                    datenschutz@allinone4you.de
                  </div>
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
