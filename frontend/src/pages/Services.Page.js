import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/ServicesPage.css";

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/services/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Hizmetler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <h1>🛠️ Tüm Hizmetlerimiz</h1>
          <p>
            Ev ve işyeriniz için profesyonel hizmetler. Kategoriye tıklayarak
            detaylı hizmetleri görüntüleyin.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="categories-list">
          {categories.map((category) => (
            <div key={category._id} className="category-section">
              {/* Category Header */}
              <div
                className="category-header"
                onClick={() => toggleCategory(category._id)}
              >
                <div className="category-title">
                  <span className="category-icon">{category.icon || "📦"}</span>
                  <div>
                    <h2>{category.name}</h2>
                    <p className="category-description">
                      {category.description}
                    </p>
                  </div>
                </div>
                <button className="expand-btn">
                  {expandedCategory === category._id ? "▲" : "▼"}
                </button>
              </div>

              {/* Services Grid (Collapsed/Expanded) */}
              {expandedCategory === category._id && (
                <div className="services-grid">
                  {category.services && category.services.length > 0 ? (
                    category.services.map((service) => (
                      <Link
                        key={service._id}
                        to={`/hizmet/${service._id}`}
                        className="service-card"
                      >
                        <div className="service-image">
                          <img
                            src={service.image || "/placeholder.jpg"}
                            alt={service.name}
                          />
                        </div>
                        <div className="service-content">
                          <h3>{service.name}</h3>
                          <p className="service-description">
                            {service.shortDescription || service.description}
                          </p>
                          <div className="service-meta">
                            <span className="service-price">
                              💶 {service.price}€
                            </span>
                            <span className="service-duration">
                              ⏱️ {service.duration} dk
                            </span>
                          </div>
                        </div>
                        <div className="service-footer">
                          <span className="btn-link">Detay & Randevu →</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="no-services">
                      Bu kategoride henüz hizmet bulunmuyor.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 Aradığınızı Bulamadınız mı?</h2>
          <p>
            Özel talepleriniz için bizimle iletişime geçin. Size özel çözümler
            sunalım.
          </p>
          <Link to="/iletisim" className="btn-primary btn-lg">
            📞 İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
}
