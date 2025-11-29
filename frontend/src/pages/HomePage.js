// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Updated HomePage:
  - Expands categories inline (click/tap) to reveal their services/alt-kategoriler.
  - Clicking a child (leaf) navigates to /services/:id (existing ServicesDetailPage).
  - Keeps mock data until backend is available (getCategories).
  - Accessible keyboard handling (Enter/Space).
  - Login/Register buttons removed from header per design update.
*/

const CategoryNode = ({
  cat,
  isOpen,
  onToggle,
  onChildClick,
  index = 0,
}) => {
  const side = index % 2 === 0 ? "left" : "right";
  
  return (
    <div className={`category-node ${side}`}>
      {/* Ana kategori kartı */}
      <div
        className={`category-card ${isOpen ? "open" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => onToggle(cat.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle(cat.id);
        }}
      >
        <div className="category-icon">
          {cat.icon || "🔧"}
        </div>
        <div className="category-info">
          <h3>{cat.name}</h3>
          {cat.description && <p>{cat.description}</p>}
        </div>
        <div className="expand-indicator">{isOpen ? "▲" : "▼"}</div>
      </div>

      {/* Alt kategoriler */}
      {isOpen && cat.children?.length > 0 && (
        <div className="subcategories stagger-children" aria-live="polite">
          {cat.children.map((child, idx) => (
            <Link
              key={child.id}
              to={`/services/${child.id}`}
              className="subcategory-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={(e) => {
                e.stopPropagation();
                onChildClick(child);
              }}
            >
              <div className="sub-icon">{child.icon || "🔨"}</div>
              <div className="sub-name">{child.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data until backend API is available.
    setCategories([
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
        children: [
          { id: 31, name: "Mobilya Montaj", icon: "🛠️" },
          { id: 32, name: "Çilingir", icon: "🔐" },
          { id: 33, name: "Klima Servis", icon: "❄️" },
        ],
      },
      {
        id: 4,
        name: "SERVİSLER (MAINTENANCE)",
        icon: "🧰",
        children: [
          { id: 41, name: "Genel Bakım", icon: "🛎️" },
          { id: 42, name: "Periyodik Kontrol", icon: "📋" },
          { id: 43, name: "Acil Müdahale", icon: "🚨" },
        ],
      },
    ]);
    setLoading(false);
  }, []);

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChildClick = (child) => {
    // Navigate to service detail / list page (existing route)
    navigate(`/services/${child.id}`);
  };

  return (
    <>
      <style>{`
        /* Timeline section styles */
        .timeline-section {
          padding: 60px 20px;
          background: linear-gradient(180deg, #F9F1F1 0%, #F4EEEC 100%);
          position: relative;
          min-height: 100vh;
        }

        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* Hero section */
        .timeline-hero {
          text-align: center;
          margin-bottom: 48px;
        }

        .timeline-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: #364F53;
          margin-bottom: 12px;
          font-weight: 800;
        }

        .timeline-hero p {
          color: rgba(47, 61, 70, 0.7);
          font-size: 18px;
        }

        /* Merkezi yeşil çizgi */
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #6DBF8C, #4A9D6F);
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(109, 191, 140, 0.4);
          border-radius: 2px;
        }

        /* Kategori node pozisyonlama */
        .category-node {
          margin: 40px 0;
          position: relative;
        }

        .category-node.left .category-card {
          margin-right: calc(50% + 40px);
        }

        .category-node.right .category-card {
          margin-left: calc(50% + 40px);
        }

        /* Ana kategori kartı */
        .category-card {
          background: linear-gradient(135deg, #364F53, #2F3D46);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(54, 79, 83, 0.2);
          position: relative;
        }

        .category-card::before {
          content: '';
          position: absolute;
          width: 30px;
          height: 3px;
          background: #6DBF8C;
          top: 50%;
          transform: translateY(-50%);
        }

        .category-node.left .category-card::before {
          right: -40px;
        }

        .category-node.right .category-card::before {
          left: -40px;
        }

        .category-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 48px rgba(54, 79, 83, 0.3);
        }

        /* Kategori ikonu */
        .category-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #6DBF8C, #4A9D6F);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          box-shadow: 0 8px 24px rgba(109, 191, 140, 0.3);
          flex-shrink: 0;
        }

        /* Kategori bilgisi */
        .category-info {
          flex: 1;
          color: white;
        }

        .category-info h3 {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .category-info p {
          font-size: 14px;
          opacity: 0.8;
        }

        /* Expand indicator */
        .expand-indicator {
          color: #6DBF8C;
          font-size: 16px;
          font-weight: 700;
          transition: transform 0.3s ease;
        }

        .category-card:hover .expand-indicator {
          transform: scale(1.2);
        }

        /* Alt kategoriler */
        .subcategories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 24px;
          padding: 0 20px;
        }

        /* Alt kategori kartları */
        .subcategory-card {
          background: linear-gradient(135deg, #364F53, #2F3D46);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          text-decoration: none;
          color: white;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeIn 0.5s ease-out backwards;
        }

        .subcategory-card:hover {
          border-color: #6DBF8C;
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 32px rgba(109, 191, 140, 0.4);
        }

        .sub-icon {
          font-size: 32px;
          filter: drop-shadow(0 4px 8px rgba(109, 191, 140, 0.3));
        }

        .sub-name {
          font-size: 15px;
          font-weight: 700;
        }

        /* Stagger animation */
        .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-children > *:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Loading spinner */
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #F4EEEC;
          border-top-color: #6DBF8C;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 40px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* CTA Button */
        .cta-section {
          text-align: center;
          margin-top: 48px;
        }

        .btn-cta {
          background: linear-gradient(135deg, #6DBF8C, #4A9D6F);
          color: white;
          padding: 16px 32px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(109, 191, 140, 0.25);
        }

        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(109, 191, 140, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline-line {
            left: 30px;
          }
          
          .category-node.left .category-card,
          .category-node.right .category-card {
            margin-left: 60px;
            margin-right: 0;
          }
          
          .category-card::before {
            left: -40px !important;
            right: auto !important;
          }

          .timeline-hero h1 {
            font-size: 32px;
          }

          .category-card {
            padding: 16px;
            gap: 12px;
          }

          .category-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }

          .category-info h3 {
            font-size: 16px;
          }

          .subcategories {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            padding: 0 10px;
          }

          .subcategory-card {
            padding: 14px;
          }
        }
      `}</style>

      <section className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-hero">
            <h1>ALL IN ONE</h1>
            <p>Tıklayın → Dallansın → Ustanızı Bulun</p>
          </div>

          {/* Merkezi yeşil çizgi */}
          <div className="timeline-line"></div>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            categories.map((cat, idx) => {
              const isOpen = openIds.includes(cat.id);
              return (
                <CategoryNode
                  key={cat.id}
                  cat={cat}
                  isOpen={isOpen}
                  onToggle={toggleOpen}
                  onChildClick={handleChildClick}
                  index={idx}
                />
              );
            })
          )}

          <div className="cta-section">
            <Link to="/provider/register" className="btn-cta">
              USTA MISINIZ? HEMEN BAŞVURUN
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
