import React from "react";
import "../styles/LegalPages.css";

export default function TermsOfServicePage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Header */}
        <div className="legal-header">
          <div className="legal-icon">📋</div>
          <h1 className="legal-title">Kullanım Koşulları</h1>
          <p className="legal-subtitle">
            All In One 4 You platformunu kullanırken uymanız gereken kurallar
          </p>
          <div className="legal-last-updated">
            📅 Son Güncelleme: 15 Nisan 2024
          </div>
        </div>

        {/* Content */}
        <div className="legal-content">
          {/* Section 1 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📜</div>
              1. Genel Hükümler
            </h2>
            <div className="legal-section-content">
              <p>
                Bu kullanım koşulları, All In One 4 You platformunu ("Platform")
                kullanan tüm kullanıcılar için geçerlidir. Platformu kullanarak
                bu koşulları kabul etmiş sayılırsınız.
              </p>
              <p>
                All In One 4 You, Almanya'da faaliyet gösteren ve hizmet arayanlar
                ile hizmet sağlayıcıları (ustalar) arasında bağlantı kuran bir
                dijital platformdur.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">🎯</div>
              2. Hizmet Tanımı
            </h2>
            <div className="legal-section-content">
              <p>Platformumuz aşağıdaki hizmetleri sunmaktadır:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Hizmet sağlayıcıları (tesisatçı, elektrikçi, boyacı vb.) ile müşterileri buluşturma
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Online randevu oluşturma ve yönetimi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Hizmet sağlayıcı profil ve değerlendirme sistemi
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    İletişim ve bildirim hizmetleri
                  </div>
                </li>
              </ul>

              <div className="legal-info-box info">
                <div className="legal-info-box-title">ℹ️ Önemli Bilgi</div>
                <div className="legal-info-box-content">
                  Platform, hizmet sağlayıcıları ile müşteriler arasında aracılık
                  yapmaktadır. Hizmetin kalitesi ve sonuçlarından doğrudan sorumlu
                  değildir.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">👤</div>
              3. Kullanıcı Yükümlülükleri
            </h2>
            <div className="legal-section-content">
              <p>Platform kullanıcıları olarak aşağıdaki yükümlülüklere uymanız gerekmektedir:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">1</div>
                  <div className="legal-list-text">
                    <strong>Doğru Bilgi:</strong> Kayıt sırasında ve platform kullanımında doğru ve güncel bilgi sağlamak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">2</div>
                  <div className="legal-list-text">
                    <strong>Yasal Kullanım:</strong> Platformu yürürlükteki yasalara uygun şekilde kullanmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">3</div>
                  <div className="legal-list-text">
                    <strong>Saygılı Davranış:</strong> Diğer kullanıcılara ve hizmet sağlayıcılara saygılı davranmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">4</div>
                  <div className="legal-list-text">
                    <strong>Hesap Güvenliği:</strong> Hesap bilgilerinizi gizli tutmak ve yetkisiz erişimi engellemek
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">5</div>
                  <div className="legal-list-text">
                    <strong>İçerik Sorumluluğu:</strong> Yüklenen içeriklerden tamamen sorumlu olmak
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">👷</div>
              4. Hizmet Sağlayıcı Yükümlülükleri
            </h2>
            <div className="legal-section-content">
              <p>Platformda kayıtlı hizmet sağlayıcılar için ek yükümlülükler:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Geçerli ticari kayıt ve gerekli izinlere sahip olmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Profesyonel ve kaliteli hizmet sunmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Randevulara zamanında katılmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Fiyatlandırma konusunda şeffaf olmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">✓</div>
                  <div className="legal-list-text">
                    Mesleki sorumluluk sigortasına sahip olmak (önerilir)
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">❌</div>
              5. Yasaklı Faaliyetler
            </h2>
            <div className="legal-section-content">
              <p>Aşağıdaki faaliyetler kesinlikle yasaktır:</p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">🚫</div>
                  <div className="legal-list-text">
                    Yanlış veya yanıltıcı bilgi paylaşmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🚫</div>
                  <div className="legal-list-text">
                    Diğer kullanıcılara hakaret veya tehdit etmek
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🚫</div>
                  <div className="legal-list-text">
                    Platformu kötüye kullanmak veya güvenliğini tehlikeye atmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🚫</div>
                  <div className="legal-list-text">
                    Sahte profil oluşturmak
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">🚫</div>
                  <div className="legal-list-text">
                    Spam veya istenmeyen mesaj göndermek
                  </div>
                </li>
              </ul>

              <div className="legal-info-box warning">
                <div className="legal-info-box-title">⚠️ Uyarı</div>
                <div className="legal-info-box-content">
                  Bu kurallara uymayan kullanıcıların hesapları uyarı olmaksızın
                  askıya alınabilir veya kapatılabilir.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">⚖️</div>
              6. Sorumluluk Sınırlaması
            </h2>
            <div className="legal-section-content">
              <p>
                All In One 4 You platformu, aşağıdaki konularda sorumluluk kabul etmemektedir:
              </p>
              
              <ul className="legal-list">
                <li className="legal-list-item">
                  <div className="legal-list-icon">•</div>
                  <div className="legal-list-text">
                    Hizmet sağlayıcıları ile müşteriler arasındaki anlaşmazlıklar
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">•</div>
                  <div className="legal-list-text">
                    Verilen hizmetlerin kalitesi veya sonuçları
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">•</div>
                  <div className="legal-list-text">
                    Teknik arızalar nedeniyle oluşan kesintiler
                  </div>
                </li>
                <li className="legal-list-item">
                  <div className="legal-list-icon">•</div>
                  <div className="legal-list-text">
                    Üçüncü taraf bağlantılarından kaynaklanan sorunlar
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              <div className="legal-section-icon">📝</div>
              7. Değişiklikler
            </h2>
            <div className="legal-section-content">
              <p>
                Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını
                saklı tutarız. Önemli değişiklikler hakkında kullanıcılarımızı
                e-posta veya platform üzerinden bilgilendireceğiz.
              </p>
              <p>
                Değişikliklerden sonra platformu kullanmaya devam etmeniz,
                yeni koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <div className="legal-contact">
            <h3 className="legal-contact-title">📞 Sorularınız mı var?</h3>
            <div className="legal-contact-grid">
              <a href="mailto:info@allinone4you.de" className="legal-contact-item">
                <div className="legal-contact-icon">📧</div>
                <div>
                  <div className="legal-contact-label">E-posta</div>
                  <div className="legal-contact-value">info@allinone4you.de</div>
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
