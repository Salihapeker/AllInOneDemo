import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

/*
 ProfilePage
 - Requires login; if not logged in, redirect to /login with return path.
 - Displays editable profile fields (basic). Save should call backend (update not implemented here).
*/

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      navigate("/login", { state: { from: "/profile" } });
      return;
    }
    let mounted = true;
    getUserProfile()
      .then((res) => {
        const data = res?.data ?? res;
        if (!mounted) return;
        setProfile({
          id: data.id,
          name: data.name || data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
        });
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      })
      .catch(() => {
        if (!mounted) return;
        // fallback demo
        setProfile({
          id: 1,
          name: "Demo Kullanıcı",
          email: "demo@demo",
          phone: "+49 170 0",
          location: "Berlin",
        });
        setForm({
          name: "Demo Kullanıcı",
          phone: "+49 170 0",
          location: "Berlin",
        });
      });
    return () => (mounted = false);
  }, [navigate]);

  if (!profile)
    return <div className="loading-spinner card">Yükleniyor...</div>;

  const save = (e) => {
    e.preventDefault();
    // call API update endpoint if available (updateUserProfile)
    alert("Profil güncelleme demo: backend endpoint ile bağlanmalı.");
    setProfile((p) => ({ ...p, ...form }));
    setEditing(false);
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}
      >
        <div>
          <div className="card" style={{ padding: 18 }}>
            <img
              src="/images/user-placeholder.png"
              alt="avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
            <h3 style={{ marginTop: 12 }}>{profile.name}</h3>
            <div className="muted">{profile.email}</div>
            <div className="muted" style={{ marginTop: 8 }}>
              {profile.phone} • {profile.location}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: 18 }}>
            <h3>Hesap Bilgileri</h3>
            {!editing ? (
              <>
                <div style={{ marginTop: 12 }}>
                  <div>
                    <strong>Ad:</strong> {profile.name}
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    <strong>Telefon:</strong> {profile.phone}
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    <strong>Konum:</strong> {profile.location}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditing(true)}
                  >
                    Düzenle
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={save} style={{ display: "grid", gap: 10 }}>
                <label>
                  İsim
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Telefon
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, phone: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Konum
                  <input
                    className="form-input"
                    value={form.location}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, location: e.target.value }))
                    }
                  />
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary" type="submit">
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setEditing(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
