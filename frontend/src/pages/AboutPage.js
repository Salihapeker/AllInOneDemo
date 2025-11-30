import React from "react";

import "../styles/AboutPage.css";
export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <header className="about-hero">
          <h1>🏆 ALL IN ONE Hakkında</h1>
          <p className="hero-subtitle">
            2018'den beri Almanya'da güvenilir ev hizmetleri sunuyoruz.
          </p>
        </header>

        {/* Hikayemiz */}
        <section className="about-section">
          <div className="section-content">
            <h2>📖 Hikayemiz</h2>
            <p>
              ALL IN ONE, 2018 yılında Berlin'de küçük bir ekiple kuruldu.
              Amacımız, ev ve işyeri sahiplerine güvenilir, profesyonel ve uygun
              fiyatlı hizmetler sunmaktı. Bugün 100+ profesyonel ekip üyemiz ve
              binlerce mutlu müşterimizle Almanya'nın önde gelen hizmet
              platformlarından biriyiz.
            </p>
            <p>
              Her gün yüzlerce müşterimize temizlik, tadilat, bahçe bakımı,
              nakliye ve daha fazlasında hizmet veriyoruz. Müşteri memnuniyeti
              bizim için her şeydir.
            </p>
          </div>
          <div className="section-image">
            <div className="image-placeholder">🏢</div>
          </div>
        </section>

        {/* Misyon & Vizyon */}
        <section className="mission-vision">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h3>Misyonumuz</h3>
            <p>
              Her eve ve işyerine profesyonel, güvenilir ve uygun fiyatlı
              hizmetler sunarak hayatı kolaylaştırmak.
            </p>
          </div>

          <div className="mission-card">
            <div className="card-icon">🚀</div>
            <h3>Vizyonumuz</h3>
            <p>
              Avrupa'nın en güvenilir ve tercih edilen ev hizmetleri platformu
              olmak.
            </p>
          </div>
        </section>

        {/* Değerlerimiz */}
        <section className="values-section">
          <h2>💎 Değerlerimiz</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">✅</div>
              <h4>Güvenilirlik</h4>
              <p>Her hizmette %100 güven ve kalite garantisi.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h4>Hız</h4>
              <p>Aynı gün randevu, hızlı çözümler.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🎓</div>
              <h4>Profesyonellik</h4>
              <p>Sertifikalı ve deneyimli uzmanlar.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">💰</div>
              <h4>Uygun Fiyat</h4>
              <p>Şeffaf fiyatlandırma, gizli ücret yok.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">😊</div>
              <h4>Müşteri Memnuniyeti</h4>
              <p>%98 müşteri memnuniyeti oranı.</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🌍</div>
              <h4>Çevre Dostu</h4>
              <p>Ekolojik temizlik ürünleri kullanıyoruz.</p>
            </div>
          </div>
        </section>

        {/* Neden Biz? */}
        <section className="why-us-section">
          <h2>🌟 Neden ALL IN ONE?</h2>
          <div className="why-us-grid">
            <div className="why-item">
              <h3>✅ Sigortalı Hizmet</h3>
              <p>Tüm hizmetlerimiz sigorta kapsamındadır.</p>
            </div>

            <div className="why-item">
              <h3>🔒 Güvenli Ödeme</h3>
              <p>SSL sertifikalı güvenli ödeme sistemi.</p>
            </div>

            <div className="why-item">
              <h3>📱 Kolay Rezervasyon</h3>
              <p>Online randevu sistemiyle 2 dakikada randevu.</p>
            </div>

            <div className="why-item">
              <h3>🏅 Kalite Garantisi</h3>
              <p>Memnun kalmazsan ücret iadesi.</p>
            </div>

            <div className="why-item">
              <h3>📞 7/24 Destek</h3>
              <p>Her zaman yanınızdayız.</p>
            </div>

            <div className="why-item">
              <h3>⭐ 5 Yıldız Değerlendirme</h3>
              <p>Google'da 4.8/5 ortalama puan.</p>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Mutlu Müşteri</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Profesyonel Ekip</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Farklı Hizmet</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Yıllık Deneyim</div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Hemen Başlayın! </h2>
          <p>Size en uygun hizmeti bulun ve randevu alın.</p>
          <div className="cta-buttons">
            <a href="/hizmetler" className="btn-primary btn-lg">
              🛠️ Hizmetleri İncele
            </a>
            <a href="/iletisim" className="btn-outline btn-lg">
              📞 İletişime Geçin
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
