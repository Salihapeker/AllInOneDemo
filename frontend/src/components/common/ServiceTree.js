import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ServiceTree.css";

const defaultCategories = [
  {
    id: 1,
    name: "EV & İNŞAAT",
    icon: "🏠",
    description: "Tesisat, elektrik, boya, tadilat",
    children: [
      { id: 11, name: "Tesisatçı", icon: "🔧" },
      { id: 12, name: "Elektrikçi", icon: "💡" },
      { id: 13, name: "Boyacı", icon: "🎨" },
      { id: 14, name: "Marangoz", icon: "🪚" },
    ],
  },
  {
    id: 2,
    name: "TEMİZLİK & BAKIM",
    icon: "🧽",
    description: "Ev temizliği, halı, bahçe bakımı",
    children: [
      { id: 21, name: "Ev Temizliği", icon: "🧹" },
      { id: 22, name: "Bahçe Bakımı", icon: "🌿" },
      { id: 23, name: "Halı Yıkama", icon: "🧼" },
    ],
  },
  {
    id: 3,
    name: "ONARIM & MONTAJ",
    icon: "🔩",
    description: "Mobilya montaj, çilingir, klima",
    children: [
      { id: 31, name: "Mobilya Montaj", icon: "🛠️" },
      { id: 32, name: "Çilingir", icon: "🔐" },
      { id: 33, name: "Klima Servis", icon: "❄️" },
    ],
  },
  {
    id: 4,
    name: "SERVİSLER",
    icon: "🧰",
    description: "Bakım, kontrol, acil müdahale",
    children: [
      { id: 41, name: "Genel Bakım", icon: "🛎️" },
      { id: 42, name: "Periyodik Kontrol", icon: "📋" },
      { id: 43, name: "Acil Müdahale", icon: "🚨" },
    ],
  },
];

export default function ServiceTree({ categories = defaultCategories }) {
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleServiceClick = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="service-tree-container">
      {/* Header */}
      <div className="service-tree-header">
        <h1 className="service-tree-slogan">All In One 4 You</h1>
        <p className="service-tree-subtitle">
          all in one for you - Tüm hizmetler tek çatı altında.
          <br />
          Dala tıkla, hizmetleri keşfet, ustanı bul!
        </p>
      </div>

      {/* Tree Structure */}
      <div className="service-tree">
        <div className="service-tree-trunk" />

        {categories.map((category, index) => {
          const isOpen = openCategories.includes(category.id);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={category.id}
              className={`service-tree-branch ${isLeft ? "left" : "right"}`}
            >
              <div className="service-tree-node">
                <div
                  className={`service-tree-category ${isOpen ? "active" : ""}`}
                  onClick={() => toggleCategory(category.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleCategory(category.id);
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="service-tree-category-header">
                    <div className="service-tree-category-icon">
                      {category.icon}
                    </div>
                    <div className="service-tree-category-info">
                      <div className="service-tree-category-name">
                        {category.name}
                      </div>
                      <div className="service-tree-category-desc">
                        {category.description}
                      </div>
                    </div>
                    <span className="service-tree-category-arrow">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Subcategories / Leaves */}
                  {isOpen && category.children && category.children.length > 0 && (
                    <div className="service-tree-leaves">
                      {category.children.map((child) => (
                        <button
                          key={child.id}
                          className="service-tree-leaf"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(child);
                          }}
                          aria-label={`${child.name} hizmetine git`}
                        >
                          <div className="service-tree-leaf-icon">
                            {child.icon}
                          </div>
                          <span className="service-tree-leaf-name">
                            {child.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
