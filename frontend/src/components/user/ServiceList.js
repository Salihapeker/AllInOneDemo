import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServicesByCategory } from "../../services/api";
import "../../styles/globals.css";

/*
  ServiceList
  - Shows list of services for a category (categoryId taken from props or route params)
  - Links to service detail page /services/:id
*/

export default function ServiceList({ categoryId: propCategoryId = null }) {
  const params = useParams();
  const categoryId = propCategoryId || params.categoryId;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) {
      setLoading(false);
      setServices([]);
      return;
    }
    let mounted = true;
    getServicesByCategory(categoryId)
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setServices(Array.isArray(data) ? data : data.results || []);
      })
      .catch(() => {
        if (!mounted) return;
        // fallback mocks
        setServices([
          {
            id: 11,
            name: "Tesisatçı",
            short: "Su tesisatı, boru onarımları",
            priceFrom: "€40/saat",
          },
          {
            id: 12,
            name: "Elektrikçi",
            short: "Priz, arıza, sigorta",
            priceFrom: "€45/saat",
          },
        ]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [categoryId]);

  if (loading) return <div className="loading-spinner card">Yükleniyor...</div>;
  if (services.length === 0)
    return (
      <div className="card" style={{ padding: 12 }}>
        Bu kategoride hizmet bulunamadı.
      </div>
    );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {services.map((s) => (
        <div
          key={s.id}
          className="card"
          style={{
            padding: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link
              to={`/services/${s.id}`}
              style={{ fontWeight: 800, color: "var(--brand-2)" }}
            >
              {s.name}
            </Link>
            <div className="muted" style={{ marginTop: 6 }}>
              {s.short}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 800 }}>{s.priceFrom}</div>
            <Link
              to={`/services/${s.id}`}
              className="btn btn-primary"
              style={{ marginTop: 8 }}
            >
              Detay
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
