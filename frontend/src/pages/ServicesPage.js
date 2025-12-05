import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { servicesAPI, categoriesAPI } from "../services/api";
import { I18nContext } from "../contexts/I18nContext";
import ErrorMessage from "../components/common/ErrorMessage";

import "../styles/ServicesPage.css";

export default function ServicesPage() {
  const { t } = useContext(I18nContext);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // name, price, rating

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [servicesRes, categoriesRes] = await Promise.all([
        servicesAPI.getAll(),
        categoriesAPI.getAll(),
      ]);

      setServices(servicesRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error("Veri yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
      setServices([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Kategori toggle
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filtreleme
  const filteredServices = services.filter((service) => {
    // Arama filtresi
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Kategori filtresi
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(service.category);

    return matchesSearch && matchesCategory;
  });

  // Sıralama
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <div className="container">
          <ErrorMessage 
            message={error} 
            onRetry={fetchData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <h1>🛠️ {t("all_services")}</h1>
          <p>
            {services.length > 0 
              ? `${services.length}+ profesyonel hizmet arasından size en uygun olanı bulun`
              : t("no_data")
            }
          </p>
        </header>

        {/* Search & Filters */}
        <div className="filters-section">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Hizmet ara...  (örn: temizlik, tadilat)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            <h3>Kategoriler:</h3>
            <div className="category-chips">
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`category-chip ${
                    selectedCategories.includes(category._id) ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category._id)}
                >
                  <span className="chip-icon">{category.icon}</span>
                  <span className="chip-name">{category.name}</span>
                  {selectedCategories.includes(category._id) && (
                    <span className="chip-check">✓</span>
                  )}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <button
                className="clear-filters-btn"
                onClick={() => setSelectedCategories([])}
              >
                Filtreleri Temizle
              </button>
            )}
          </div>

          {/* Sort Options */}
          <div className="sort-section">
            <label>Sıralama:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">İsme Göre (A-Z)</option>
              <option value="price">Fiyata Göre (Artan)</option>
              <option value="rating">Puana Göre (En Yüksek)</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            {sortedServices.length === 0 ? (
              <span className="no-results">
                ❌ Aramanıza uygun hizmet bulunamadı.
              </span>
            ) : (
              <span>
                ✅ <strong>{sortedServices.length}</strong> hizmet bulundu
              </span>
            )}
          </p>
        </div>

        {/* Services Grid */}
        {sortedServices.length > 0 ? (
          <div className="services-grid-modern">
            {sortedServices.map((service) => (
              <Link
                key={service._id}
                to={`/hizmet/${service._id}`}
                className="service-card-modern"
              >
                <div className="service-image">
                  <img
                    src={service.image || "/placeholder.jpg"}
                    alt={service.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300? text=Hizmet";
                    }}
                  />
                  <div className="service-badge">
                    {service.categoryName || "Genel"}
                  </div>
                </div>

                <div className="service-body">
                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-description">
                    {service.shortDescription || service.description}
                  </p>

                  <div className="service-stats">
                    <div className="stat-item">
                      <span className="stat-icon">⭐</span>
                      <span className="stat-value">
                        {service.rating || 4.5}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">⏱️</span>
                      <span className="stat-value">
                        {service.duration || 60} dk
                      </span>
                    </div>
                    <div className="stat-item stat-price">
                      <span className="stat-icon">💶</span>
                      <span className="stat-value">{service.price}€</span>
                    </div>
                  </div>

                  <button className="service-btn">Detay & Randevu Al →</button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Sonuç bulunamadı</h3>
            <p>
              Lütfen arama kriterlerinizi değiştirin veya filtreleri temizleyin.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
              }}
            >
              Tüm Hizmetleri Göster
            </button>
          </div>
        )}

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
