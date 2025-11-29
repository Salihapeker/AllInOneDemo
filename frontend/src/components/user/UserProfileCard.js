import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/api";
import "../../styles/admin.css"; // uses card utilities; keeps consistent look

export default function UserProfileCard({ userId = null }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    // If userId is null, getUserProfile will call /auth/me/ in api wrapper
    getUserProfile(userId)
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        // Normalize fields
        setProfile({
          id: data.id,
          name: data.name || data.full_name || "Kullanıcı",
          email: data.email,
          phone: data.phone || "",
          location: data.location || data.city || "",
          bookings: data.bookings ?? data.booking_count ?? 0,
          avatar: data.avatar || "/images/user-placeholder.png",
        });
      })
      .catch(() => {
        if (!mounted) return;
        // fallback mock
        setProfile({
          id: 1,
          name: "Demo Kullanıcı",
          email: "demo@user.test",
          phone: "+49 170 000 0000",
          location: "Berlin",
          bookings: 0,
          avatar: "/images/user-placeholder.png",
        });
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [userId]);

  if (loading) return <div className="card loading-spinner">Yükleniyor...</div>;

  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <img
          src={profile.avatar}
          alt="avatar"
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            objectFit: "cover",
          }}
          onError={(e) =>
            (e.currentTarget.src = "/images/user-placeholder.png")
          }
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.name}</div>
          <div className="muted" style={{ marginTop: 6 }}>
            {profile.email}
          </div>
          <div className="muted" style={{ marginTop: 6 }}>
            {profile.phone} • {profile.location}
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: 14, display: "flex", gap: 8, alignItems: "center" }}
      >
        <div className="badge approved">Üye</div>
        <div className="badge pending">
          Aktif Randevular: {profile.bookings}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Link to="/profile" className="btn btn-outline">
            Profil
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/appointments")}
          >
            Randevularım
          </button>
        </div>
      </div>
    </div>
  );
}
