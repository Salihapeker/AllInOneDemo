import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";
import { I18nContext } from "../contexts/I18nContext";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";

/*
 ProfilePage
 - Requires login; if not logged in, redirect to /login with return path.
 - Displays editable profile fields (basic). Save should call backend (update not implemented here).
*/

export default function ProfilePage() {
  const { t } = useContext(I18nContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Profil yüklenirken hata:", err);
        setError(err.message || t("error_occurred"));
        setProfile(null);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [navigate, t]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 20 }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: 20 }}>
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container" style={{ padding: 20 }}>
        <EmptyState 
          icon="👤"
          title={t("no_data")}
          message={t("login_required")}
          actionLabel={t("login")}
          actionLink="/login"
        />
      </div>
    );
  }

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
