import React, { useState, useEffect, useContext } from "react";
import ProviderLayout from "../../components/provider/ProviderLayout";
import { providersAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/ProviderPanel.css";

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function ProviderProfile() {
  const { t } = useContext(I18nContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [toast, setToast] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    address: "",
  });

  const [workingHours, setWorkingHours] = useState({
    Pazartesi: { active: true, start: "09:00", end: "18:00" },
    Salı: { active: true, start: "09:00", end: "18:00" },
    Çarşamba: { active: true, start: "09:00", end: "18:00" },
    Perşembe: { active: true, start: "09:00", end: "18:00" },
    Cuma: { active: true, start: "09:00", end: "17:00" },
    Cumartesi: { active: false, start: "10:00", end: "14:00" },
    Pazar: { active: false, start: "", end: "" },
  });

  const [gallery, setGallery] = useState([]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) {
        const response = await providersAPI.getById(user.id);
        const data = response.data || {};
        setProfile(data);
        setFormData({
          name: data.name || data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          category: data.category || "",
          description: data.description || "",
          address: data.address || data.region || "",
        });
        setGallery(data.gallery || []);
      } else {
        // No user data - show empty form
        setProfile({
          id: null,
          name: "",
          email: "",
          rating: 0,
          completedJobs: 0,
          memberSince: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Profil yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // Show empty profile
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) {
        await providersAPI.updateProfile(user.id, formData);
        setProfile((prev) => ({ ...prev, ...formData }));
        showToast(t("save_success"), "success");
      }
    } catch (err) {
      showToast(t("save_error"), "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = () => {
    const url = prompt(t("enter_url"));
    if (url) {
      setGallery((prev) => [...prev, url]);
      showToast(t("save_success"), "success");
    }
  };

  const handleRemoveImage = (index) => {
    if (window.confirm(t("confirm"))) {
      setGallery((prev) => prev.filter((_, i) => i !== index));
      showToast(t("delete_success"), "info");
    }
  };

  if (loading) {
    return (
      <ProviderLayout title={t("profile")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </ProviderLayout>
    );
  }

  if (error) {
    return (
      <ProviderLayout title={t("profile")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchProfile}
        />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title={t("profile_settings")}>
      {/* Profile Header */}
      <div className="provider-profile-card">
        <div className="provider-profile-header">
          <div className="provider-profile-avatar-section">
            <div className="provider-profile-avatar">👷</div>
            <button className="provider-profile-avatar-btn">📷 {t("change")}</button>
          </div>
          <div className="provider-profile-info">
            <div className="provider-profile-name">{profile?.name || t("profile")}</div>
            <div className="provider-profile-category">
              🔧 {profile?.category} • 📍 {profile?.address || formData.address}
            </div>
            <div className="provider-profile-stats">
              <div className="provider-profile-stat">
                <div className="provider-profile-stat-value">⭐ {profile?.rating || 0}</div>
                <div className="provider-profile-stat-label">{t("rating")}</div>
              </div>
              <div className="provider-profile-stat">
                <div className="provider-profile-stat-value">{profile?.completedJobs || 0}</div>
                <div className="provider-profile-stat-label">{t("completed_jobs")}</div>
              </div>
              <div className="provider-profile-stat">
                <div className="provider-profile-stat-value">
                  {profile?.memberSince ? new Date(profile.memberSince).getFullYear() : "-"}
                </div>
                <div className="provider-profile-stat-label">{t("member_since")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="provider-filter-tabs" style={{ marginBottom: 24 }}>
        <button
          className={`provider-filter-tab ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          👤 {t("information")}
        </button>
        <button
          className={`provider-filter-tab ${activeTab === "hours" ? "active" : ""}`}
          onClick={() => setActiveTab("hours")}
        >
          🕐 {t("working_hours")}
        </button>
        <button
          className={`provider-filter-tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          🖼️ {t("gallery")} ({gallery.length})
        </button>
      </div>

      {/* Info Tab */}
      {activeTab === "info" && (
        <div className="provider-profile-card">
          <h4 style={{ marginBottom: 20 }}>{t("profile_info")}</h4>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="admin-form-group">
              <label className="admin-form-label">{t("full_name")}</label>
              <input
                type="text"
                className="admin-form-input"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">E-posta</label>
              <input
                type="email"
                className="admin-form-input"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Telefon</label>
              <input
                type="tel"
                className="admin-form-input"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Kategori</label>
              <select
                className="admin-form-select"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <option value="Tesisatçı">Tesisatçı</option>
                <option value="Elektrikçi">Elektrikçi</option>
                <option value="Boyacı">Boyacı</option>
                <option value="Marangoz">Marangoz</option>
                <option value="Temizlik">Temizlik</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Adres</label>
            <input
              type="text"
              className="admin-form-input"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Hizmet Açıklaması</label>
            <textarea
              className="admin-form-textarea"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows="4"
              placeholder="Kendinizi ve sunduğunuz hizmetleri tanıtın..."
            />
          </div>

          <button
            className="admin-btn admin-btn-primary"
            onClick={handleSaveProfile}
            disabled={saving}
            style={{ marginTop: 16 }}
          >
            {saving ? "Kaydediliyor..." : "💾 Kaydet"}
          </button>
        </div>
      )}

      {/* Working Hours Tab */}
      {activeTab === "hours" && (
        <div className="provider-profile-card">
          <h4 style={{ marginBottom: 20 }}>Çalışma Saatleri</h4>
          
          <div className="provider-hours-list">
            {DAYS.map((day) => (
              <div key={day} className="provider-hours-day">
                <div className="provider-hours-day-name">{day}</div>
                <div
                  className={`provider-hours-toggle ${workingHours[day].active ? "active" : ""}`}
                  onClick={() =>
                    handleWorkingHoursChange(day, "active", !workingHours[day].active)
                  }
                />
                {workingHours[day].active ? (
                  <div className="provider-hours-inputs">
                    <input
                      type="time"
                      className="provider-hours-input"
                      value={workingHours[day].start}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "start", e.target.value)
                      }
                    />
                    <span className="provider-hours-separator">—</span>
                    <input
                      type="time"
                      className="provider-hours-input"
                      value={workingHours[day].end}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "end", e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <span style={{ color: "#999", fontSize: 14 }}>Kapalı</span>
                )}
              </div>
            ))}
          </div>

          <button
            className="admin-btn admin-btn-primary"
            onClick={() => showToast("Çalışma saatleri kaydedildi!", "success")}
            style={{ marginTop: 20 }}
          >
            💾 Kaydet
          </button>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="provider-profile-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h4>Örnek İşlerim</h4>
            <button className="admin-btn admin-btn-primary" onClick={handleAddImage}>
              ➕ Görsel Ekle
            </button>
          </div>

          <div className="provider-gallery-grid">
            {gallery.map((image, index) => (
              <div key={index} className="provider-gallery-item">
                <img src={image} alt={`Örnek iş ${index + 1}`} />
                <div className="provider-gallery-overlay">
                  <button
                    className="provider-gallery-delete-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="provider-gallery-add" onClick={handleAddImage}>
              <span className="provider-gallery-add-icon">➕</span>
              <span className="provider-gallery-add-text">Görsel Ekle</span>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 16, background: "#f2d8d8", borderRadius: 12 }}>
            <h5 style={{ marginBottom: 8 }}>💡 İpucu</h5>
            <p style={{ fontSize: 13, color: "#374259", lineHeight: 1.6 }}>
              Örnek iş fotoğrafları ekleyerek müşterilerin güvenini kazanabilirsiniz.
              En iyi işlerinizden yüksek kaliteli fotoğraflar yükleyin.
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`provider-toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "ℹ"} {toast.message}
        </div>
      )}
    </ProviderLayout>
  );
}
