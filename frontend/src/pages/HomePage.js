// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Updated HomePage:
  - Expands categories inline (click/tap) to reveal their services/alt-kategoriler.
  - Clicking a child (leaf) navigates to /services/:id (existing ServicesDetailPage).
  - Keeps mock data until backend is available (getCategories).
  - Accessible keyboard handling (Enter/Space).
*/

const CategoryNode = ({
  cat,
  isOpen,
  onToggle,
  onChildClick,
  side = "left",
}) => {
  return (
    <div className="cat-node">
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
        <div className="children-row" aria-live="polite">
          <div className="connector" />
          <div className="children-list">
            {cat.children.map((child) => (
              <button
                key={child.id}
                className="child-tile card"
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
        /* Local styles for the expanded interactive homepage tree */
        .home-root { min-height: 100vh; padding: 40px 20px; background: linear-gradient(180deg, #f9f1f1 0%, #f4eeec 100%); color: #2F3D46; }
        .header { display:flex; justify-content:space-between; align-items:center; max-width:1200px; margin:0 auto 32px; }
        .brand { display:flex; gap:14px; align-items:center; }
        .brand-tile { width:52px; height:52px; border-radius:10px; background: linear-gradient(135deg,#85A98D,#517970); color:white; display:flex; align-items:center; justify-content:center; font-weight:900; font-family: 'Playfair Display', serif; font-size:20px; }
        .hero { text-align:center; margin-bottom:28px; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size:44px; margin-bottom:6px; }
        .hero p { color: rgba(47,61,70,0.7); }

        .timeline { max-width:1100px; margin: 0 auto; position:relative; padding: 20px 12px 80px; }
        .timeline::before { content:""; position:absolute; left:50%; transform:translateX(-50%); width:6px; height:100%; background: linear-gradient(180deg,#6fe0c6,#2f9a8a); border-radius:6px; box-shadow: 0 6px 24px rgba(81,121,112,0.08); }

        .cat-node { width:100%; display:block; margin: 28px 0; position:relative; }
        .cat-main { display:flex; align-items:center; gap:18px; justify-content:flex-start; width:calc(50% - 40px); background:transparent; cursor:pointer; transform-origin:left center; }
        .cat-node:nth-child(odd) .cat-main { margin-left: calc(50% - 480px); }
        .cat-node:nth-child(even) .cat-main { margin-left: calc(50% + 24px); justify-content:flex-end; text-align:right; }
        .cat-tile { width:86px; height:86px; border-radius:14px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg,#85A98D,#517970); color:white; box-shadow: 0 10px 30px rgba(47,61,70,0.15); }
        .cat-label { background: rgba(47,61,70,0.95); color: #F9F1F1; padding: 12px 16px; border-radius:8px; font-weight:700; box-shadow: 0 6px 18px rgba(20,20,20,0.35); max-width:320px; }
        .cat-desc { font-weight:500; font-size:13px; opacity:0.85; margin-top:6px; font-weight:500; }

        .chev { margin-left:8px; color: rgba(47,61,70,0.65); font-size:14px; }

        /* children */
        .children-row { display:flex; align-items:center; gap:18px; margin-top:14px; }
        .children-list { display:flex; gap:12px; flex-wrap:wrap; }
        .child-tile { display:flex; flex-direction:column; align-items:center; justify-content:center; width:130px; height:96px; padding:10px; border-radius:12px; background: linear-gradient(135deg,#364F53,#2F3D46); color:white; cursor:pointer; border: none; outline:none; transition: transform 160ms ease, box-shadow 160ms ease; }
        .child-tile .child-icon { font-size:26px; margin-bottom:8px; }
        .child-tile:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(47,61,70,0.18); }
        .connector { height:2px; width:40%; background: linear-gradient(90deg, rgba(133,169,141,0.95), rgba(81,121,112,0.3)); border-radius:2px; margin-right:8px; opacity:0.95; }

        /* responsive */
        @media (max-width: 900px) {
          .cat-main { width:100%; margin-left:0 !important; justify-content:flex-start !important; }
          .cat-node:nth-child(even) .cat-main { text-align:left; justify-content:flex-start; }
          .timeline::before { left:12px; transform:none; height:100%; }
        }
      `}</style>

      <div className="home-root">
        <header className="header container">
          <div className="brand">
            <div className="brand-tile">4</div>
            <div>
              <div style={{ fontWeight: 800, color: "var(--brand-dark-2)" }}>
                ALL IN ONE
              </div>
              <div style={{ fontSize: 12, color: "rgba(47,61,70,0.6)" }}>
                all in one for you
              </div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Link to="/login" className="btn-ghost">
              Login
            </Link>
            <Link to="/provider/register" className="btn-primary">
              Register
            </Link>
          </nav>
        </header>

        <main className="container">
          <section className="hero">
            <h1 className="heading-display">ALL IN ONE</h1>
            <p>Tıklayın → Dallansın → Ustanızı Bulun</p>
          </section>

          <section className="timeline" role="list">
            {loading ? (
              <div className="loading-spinner">Yükleniyor...</div>
            ) : (
              categories.map((cat, idx) => {
                const isOpen = openIds.includes(cat.id);
                return (
                  <div key={cat.id} className="cat-node" role="listitem">
                    <CategoryNode
                      cat={cat}
                      isOpen={isOpen}
                      onToggle={toggleOpen}
                      onChildClick={handleChildClick}
                      side={idx % 2 === 0 ? "left" : "right"}
                    />
                  </div>
                );
              })
            )}
          </section>

          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link
              to="/provider/register"
              className="btn-primary"
              style={{ padding: "12px 22px", borderRadius: 999 }}
            >
              USTA MISINIZ? HEMEN BAŞVURUN
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
