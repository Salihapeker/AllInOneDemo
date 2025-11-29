// src/pages/Provider/ProviderDashboard.js
// Note: this file path matches the error you reported - the import path for services must be '../../services/api'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProviderProfile } from "../../services/api"; // corrected path

export default function ProviderDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    // If your backend uses "me" for provider, call a different endpoint.
    getProviderProfile(101)
      .then((res) => {
        // axios returns {data: ...}
        const data = res?.data ?? res;
        if (!mounted) return;
        setProfile(data);
      })
      .catch(() => {
        // fallback mock if API fails
        if (!mounted) return;
        setProfile({
          id: 101,
          name: "Usta Ahmet",
          category: "Tesisatçı",
          region: "Berlin",
          workingHours: "09:00 - 18:00",
        });
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className="container" style={{ padding: 20 }}>
      <h2 className="display-stoewer" style={{ fontSize: 28 }}>
        Hizmet Veren Paneli
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 18,
          marginTop: 14,
        }}
      >
        <div>
          <div className="card" style={{ padding: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>
                  {profile?.name || "Usta"}
                </div>
                <div className="muted">
                  {profile?.category} • {profile?.region}
                </div>
              </div>
              <div>
                <Link
                  to="/provider/appointments"
                  className="btn btn-primary"
                  style={{ marginRight: 8 }}
                >
                  Randevular
                </Link>
                <Link to="/provider/profile" className="btn btn-ghost">
                  Profil Düzenle
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4>Güncel Bilgiler</h4>
              <div className="muted">
                Çalışma saatleri ve hizmet koşulları profil sayfanızdan
                güncellenebilir.
              </div>
            </div>
          </div>

          <div className="mt-8 card" style={{ padding: 14 }}>
            <h4>Hızlı İstatistikler</h4>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div className="stat-title">Günlük Talepler</div>
                <div className="stat-value">4</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="stat-title">Onaylanan</div>
                <div className="stat-value">12</div>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="card" style={{ padding: 14 }}>
            <h4>Hızlı Yardım</h4>
            <div className="muted">
              Yeni başvurular, mesajlar ve sistem bildirimleri buradan takip
              edilir.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
