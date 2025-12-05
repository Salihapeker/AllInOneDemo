// src/pages/HomePage.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesAPI } from "../services/api";
import { I18nContext } from "../contexts/I18nContext";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";

/*
  Updated HomePage:
  - Modern hero section with gradient title
  - Expands categories inline (click/tap) to reveal their services/alt-kategoriler.
  - Clicking a child (leaf) navigates to /services/:id (existing ServicesDetailPage).
  - Central timeline with alternating left/right categories
  - Smooth animations and transitions
  - NO MOCK DATA - fetches from API
*/

const CategoryNode = ({ cat, isOpen, onToggle, onChildClick, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`cat-node ${isLeft ? "left" : "right"}`}>
      <div
        className={`cat-main ${isOpen ? "open" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => onToggle(cat.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle(cat.id);
        }}
      >
        <div className="cat-tile">
          <div className="cat-icon" aria-hidden>
            {cat.icon || "🔧"}
          </div>
        </div>
        <div className="cat-label">
          <div className="cat-name">{cat.name}</div>
          {cat.description && <div className="cat-desc">{cat.description}</div>}
        </div>
        <div className="chev">{isOpen ? "▲" : "▼"}</div>
      </div>

      {/* children shown inline when open */}
      {isOpen && cat.children?.length > 0 && (
        <div className="children-row stagger-children" aria-live="polite">
          <div className="children-list">
            {cat.children.map((child) => (
              <button
                key={child.id}
                className="child-tile"
                onClick={() => onChildClick(child)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onChildClick(child);
                }}
                aria-label={`Go to ${child.name}`}
              >
                <div className="child-icon">{child.icon || "🔨"}</div>
                <div className="child-name">{child.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const { t } = useContext(I18nContext);
  const [categories, setCategories] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await categoriesAPI.getTree();
        setCategories(response.data || []);
      } catch (err) {
        console.error("Kategoriler yüklenirken hata:", err);
        setError(err.message || t("error_occurred"));
        // No mock data - show empty state
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

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
        /* ===== Hero Section ===== */
        .hero-section {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(180deg, var(--bg-main) 0%, var(--bg-secondary) 100%);
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 8vw, 72px);
          background: linear-gradient(135deg, var(--primary-1), var(--accent-1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          font-size: clamp(18px, 3vw, 24px);
          color: var(--text-secondary);
          margin-bottom: 40px;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-large {
          padding: 16px 48px;
          font-size: 18px;
          background: var(--gradient-primary);
          color: white;
          border: none;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(133, 169, 141, 0.3);
        }

        .btn-primary-large:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(133, 169, 141, 0.4);
        }

        .btn-secondary-large {
          padding: 16px 48px;
          font-size: 18px;
          background: transparent;
          color: var(--text-primary);
          border: 2px solid var(--primary-1);
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary-large:hover {
          background: var(--primary-1);
          color: white;
          transform: translateY(-2px);
        }

        /* ===== Timeline / Tree Section ===== */
        .home-root {
          min-height: 100vh;
          padding: 0 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-hover) 100%);
          color: var(--text-primary);
        }

        .timeline {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          padding: 40px 20px 80px;
        }

        /* Merkezi yeşil dikey çizgi (timeline) */
        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(133, 169, 141, 0.4);
        }

        .cat-node {
          width: 100%;
          display: block;
          margin: 32px 0;
          position: relative;
        }

        /* Kategori kartları */
        .cat-main {
          display: flex;
          align-items: center;
          gap: 18px;
          width: calc(50% - 50px);
          background: var(--gradient-card);
          border-radius: 12px;
          padding: 16px 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-md);
        }

        .cat-main:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .cat-main.open {
          box-shadow: 0 12px 40px rgba(133, 169, 141, 0.2);
          border: 2px solid rgba(133, 169, 141, 0.3);
        }

        .cat-node.left .cat-main {
          margin-left: auto;
          margin-right: calc(50% + 30px);
        }

        .cat-node.right .cat-main {
          margin-left: calc(50% + 30px);
          margin-right: auto;
        }

        /* Icon tiles */
        .cat-tile {
          width: 64px;
          height: 64px;
          min-width: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 8px 24px rgba(133, 169, 141, 0.3);
          transition: transform 0.3s ease;
        }

        .cat-main:hover .cat-tile {
          transform: scale(1.05);
        }

        .cat-icon {
          font-size: 28px;
        }

        .cat-label {
          flex: 1;
          color: #F9F1F1;
        }

        .cat-name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .cat-desc {
          font-weight: 500;
          font-size: 13px;
          opacity: 0.85;
        }

        .chev {
          color: rgba(249, 241, 241, 0.7);
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .cat-main.open .chev {
          transform: rotate(180deg);
        }

        /* Alt kategori kartları */
        .children-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 20px;
          padding-left: 20px;
        }

        .cat-node.left .children-row {
          justify-content: flex-end;
          padding-right: calc(50% + 50px);
          padding-left: 20px;
        }

        .cat-node.right .children-row {
          justify-content: flex-start;
          padding-left: calc(50% + 50px);
          padding-right: 20px;
        }

        .children-list {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .child-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 110px;
          height: 90px;
          padding: 12px;
          border-radius: 12px;
          background: var(--gradient-card);
          color: white;
          cursor: pointer;
          border: 2px solid transparent;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }

        .child-tile:hover {
          border-color: var(--accent-1);
          transform: scale(1.05);
          box-shadow: 0 8px 32px rgba(133, 169, 141, 0.4);
        }

        .child-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .child-name {
          font-size: 12px;
          font-weight: 600;
          text-align: center;
        }

        /* Stagger animation */
        .stagger-children > * {
          animation: fadeInUp 0.5s ease-out backwards;
        }
        .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-children > *:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Loading spinner */
        .loading-spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid var(--bg-secondary);
          border-top-color: var(--accent-1);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 40px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          margin-top: 40px;
          padding: 40px 20px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .timeline::before {
            left: 20px;
            transform: none;
          }

          .cat-main {
            width: calc(100% - 50px);
            margin-left: 50px !important;
            margin-right: 0 !important;
          }

          .cat-node.left .children-row,
          .cat-node.right .children-row {
            padding-left: 50px;
            padding-right: 0;
            justify-content: flex-start;
          }

          .hero-section {
            padding: 60px 20px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary-large,
          .btn-secondary-large {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <div className="home-root">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">ALL IN ONE</h1>
          <p className="hero-subtitle">Tıklayın → Dallansın → Ustanızı Bulun</p>

          <div className="hero-actions">
            <button
              className="btn-primary-large"
              onClick={() =>
                document
                  .querySelector(".timeline")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t("services")}
            </button>
            <button
              className="btn-secondary-large"
              onClick={() => navigate("/apply")}
            >
              Usta Olarak Katıl
            </button>
          </div>
        </section>

        {/* Timeline / Tree Section */}
        <main className="container">
          <section className="timeline" role="list">
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <div className="loading-spinner" />
                <p>{t("loading")}</p>
              </div>
            ) : error ? (
              <ErrorMessage 
                message={error} 
                onRetry={() => window.location.reload()}
              />
            ) : categories.length === 0 ? (
              <EmptyState 
                icon="📂"
                title={t("no_data")}
                message={t("no_data")}
              />
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
          </section>

          {/* CTA Section */}
          <div className="cta-section">
            <button
              className="btn-primary-large"
              onClick={() => navigate("/apply")}
            >
              USTA MISINIZ? HEMEN BAŞVURUN
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
