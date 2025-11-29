import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/api";
import "../../styles/globals.css";

/*
  CategoryList
  - Fetches category tree from backend (getCategories)
  - Renders a compact list/tree for sidebars or service pages
  - Clicking a category leads to services list for that category
*/

const Node = ({ node, level = 0 }) => {
  return (
    <div style={{ marginLeft: level * 12, marginTop: 8 }}>
      <Link
        to={`/services/category/${node.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="cat-tile"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {node.icon || "🔧"}
          </div>
          <div style={{ fontWeight: 700 }}>{node.name}</div>
        </div>
      </Link>
      {node.children?.length > 0 &&
        node.children.map((c) => (
          <Node key={c.id} node={c} level={level + 1} />
        ))}
    </div>
  );
};

export default function CategoryList() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCategories()
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setCats(Array.isArray(data) ? data : data.categories || []);
      })
      .catch(() => {
        if (!mounted) return;
        // fallback mock
        setCats([
          {
            id: 1,
            name: "EV & İNŞAAT",
            icon: "🏠",
            children: [
              { id: 11, name: "Tesisatçı" },
              { id: 12, name: "Elektrikçi" },
            ],
          },
          {
            id: 2,
            name: "TEMİZLİK",
            icon: "🧽",
            children: [{ id: 21, name: "Ev Temizliği" }],
          },
        ]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="card loading-spinner">Yükleniyor...</div>;

  return (
    <div className="card" style={{ padding: 12 }}>
      <h4 style={{ marginBottom: 8 }}>Kategoriler</h4>
      <div>
        {cats.map((c) => (
          <Node key={c.id} node={c} />
        ))}
      </div>
    </div>
  );
}
