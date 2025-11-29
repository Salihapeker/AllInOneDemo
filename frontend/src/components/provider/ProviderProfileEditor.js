// src/components/provider/ProviderProfileEditor.js
import React, { useEffect, useState } from "react";
import { getProviderProfile, updateProviderProfile } from "../../services/api";
import "../forms/FormStyles.css";

export default function ProviderProfileEditor({ providerId = 101 }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
    workingHours: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    getProviderProfile(providerId).then((p) => {
      if (!mounted) return;
      setProfile(p);
      setForm({
        name: p.name || "",
        phone: p.phone || "",
        bio: p.bio || "",
        workingHours: p.workingHours || "",
      });
      setLoading(false);
    });
    return () => (mounted = false);
  }, [providerId]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProviderProfile(providerId, form);
    setSaving(false);
    if (res.ok) {
      alert("Profil güncellendi (demo).");
      setProfile((p) => ({ ...p, ...form }));
    } else {
      alert("Güncelleme başarısız.");
    }
  };

  if (loading) return <div className="loading-spinner">Yükleniyor...</div>;

  return (
    <form className="form-grid card" style={{ padding: 14 }} onSubmit={save}>
      <h3>Profil Düzenle</h3>

      <label className="form-row">
        <span className="form-label">Ad Soyad</span>
        <input
          className="form-input"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
      </label>

      <label className="form-row">
        <span className="form-label">Telefon</span>
        <input
          className="form-input"
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
        />
      </label>

      <label className="form-row">
        <span className="form-label">Hakkında / Açıklama</span>
        <textarea
          className="form-input"
          rows={4}
          value={form.bio}
          onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
        />
      </label>

      <label className="form-row">
        <span className="form-label">Çalışma Saatleri</span>
        <input
          className="form-input"
          value={form.workingHours}
          onChange={(e) =>
            setForm((s) => ({ ...s, workingHours: e.target.value }))
          }
        />
      </label>

      <div className="actions" style={{ marginTop: 8 }}>
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
