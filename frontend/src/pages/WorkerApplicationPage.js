import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { workerApplicationAPI } from "../services/api";
import "../styles/LegalPages.css";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const categories = [
  { id: 1, name: "Tesisatçı", icon: "🔧" },
  { id: 2, name: "Elektrikçi", icon: "💡" },
  { id: 3, name: "Boyacı", icon: "🎨" },
  { id: 4, name: "Marangoz", icon: "🪚" },
  { id: 5, name: "Temizlik", icon: "🧹" },
  { id: 6, name: "Bahçe Bakımı", icon: "🌿" },
  { id: 7, name: "Klima Servis", icon: "❄️" },
  { id: 8, name: "Çilingir", icon: "🔐" },
  { id: 9, name: "Mobilya Montaj", icon: "🛠️" },
  { id: 10, name: "Diğer", icon: "📦" },
];

export default function WorkerApplicationPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    postalCode: "",
    
    // Professional Info
    category: "",
    experience: "",
    description: "",
    certifications: "",
    
    // Documents
    cv: null,
    idDocument: null,
    tradeRegister: null,
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState({});

  // Redirect to register if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/register?redirect=/apply&role=provider");
    }
  }, [user, authLoading, navigate]);

  // Redirect to provider dashboard if already a provider
  useEffect(() => {
    if (user?.role === "provider") {
      navigate("/provider/dashboard");
    }
  }, [user, navigate]);

  // Check for existing application status
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }
      
      try {
        const response = await workerApplicationAPI.getMyApplication();
        setApplicationStatus(response.data);
      } catch (error) {
        // 404 or error means no existing application - show form
        setApplicationStatus(null);
      } finally {
        setCheckingStatus(false);
      }
    };

    if (user && user.role !== "provider") {
      checkApplicationStatus();
    } else {
      setCheckingStatus(false);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleFileChange = (field, file) => {
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setErrors((prev) => ({ ...prev, [field]: "Dosya boyutu 5MB'dan küçük olmalıdır." }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Ad gerekli";
      if (!formData.lastName.trim()) newErrors.lastName = "Soyad gerekli";
      if (!formData.email.trim()) {
        newErrors.email = "E-posta gerekli";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Geçerli e-posta girin";
      }
      if (!formData.phone.trim()) newErrors.phone = "Telefon gerekli";
      if (!formData.city.trim()) newErrors.city = "Şehir gerekli";
    }

    if (stepNumber === 2) {
      if (!formData.category) newErrors.category = "Kategori seçin";
      if (!formData.experience) newErrors.experience = "Deneyim seçin";
      if (!formData.description.trim()) newErrors.description = "Açıklama gerekli";
    }

    if (stepNumber === 3) {
      if (!formData.cv) newErrors.cv = "CV yükleyin";
      if (!formData.termsAccepted) newErrors.termsAccepted = "Koşulları kabul etmelisiniz";
      if (!formData.privacyAccepted) newErrors.privacyAccepted = "Gizlilik politikasını kabul etmelisiniz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 2000);
  };

  // Loading state while checking auth
  if (authLoading || checkingStatus) {
    return (
      <div className="legal-page">
        <div className="legal-container" style={{ maxWidth: 600 }}>
          <div className="legal-content" style={{ textAlign: "center", padding: 60 }}>
            <div className="loading-spinner" style={{ 
              width: 48, 
              height: 48, 
              border: "4px solid #ddd",
              borderTopColor: "#85A98D",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 24px"
            }} />
            <p style={{ fontSize: 16, color: "#666" }}>Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect happens via useEffect, return null while redirecting
  if (!user) {
    return null;
  }

  // Show pending application status
  if (applicationStatus?.status === "pending") {
    return (
      <div className="legal-page">
        <div className="legal-container" style={{ maxWidth: 600 }}>
          <div className="application-status" style={{ textAlign: "center", padding: 60 }}>
            <div className="status-icon" style={{ fontSize: 64, marginBottom: 24 }}>⏳</div>
            <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--text-primary)" }}>Başvurunuz İnceleniyor</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
              Başvurunuz {applicationStatus.createdAt ? new Date(applicationStatus.createdAt).toLocaleDateString("tr-TR") : ""} tarihinde alındı.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
              En kısa sürede size dönüş yapılacaktır.
            </p>
            <Link to="/" className="btn btn-primary">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show rejected application status
  if (applicationStatus?.status === "rejected") {
    return (
      <div className="legal-page">
        <div className="legal-container" style={{ maxWidth: 600 }}>
          <div className="application-status rejected" style={{ 
            textAlign: "center", 
            padding: 60,
            background: "rgba(239, 68, 68, 0.05)",
            borderRadius: 16,
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            <div className="status-icon" style={{ fontSize: 64, marginBottom: 24 }}>❌</div>
            <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--text-primary)" }}>Başvurunuz Reddedildi</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
              Maalesef başvurunuz onaylanmadı.
            </p>
            {applicationStatus.rejectionReason && (
              <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                Sebep: {applicationStatus.rejectionReason}
              </p>
            )}
            <button 
              className="btn btn-primary"
              onClick={() => setApplicationStatus(null)}
            >
              Yeniden Başvur
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="legal-page">
        <div className="legal-container" style={{ maxWidth: 600 }}>
          <div className="legal-content" style={{ textAlign: "center", padding: 60 }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
            <h1 style={{ fontSize: 28, marginBottom: 16 }}>Başvurunuz Alındı!</h1>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.8 }}>
              Başvurunuz başarıyla tarafımıza ulaştı. En kısa sürede inceleyip
              size geri dönüş yapacağız. Başvurunuzun durumunu e-posta ile takip edebilirsiniz.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Link to="/" className="btn btn-primary">
                Ana Sayfaya Dön
              </Link>
              <Link to="/hizmetler" className="btn btn-outline">
                Hizmetleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Header */}
        <div className="legal-header">
          <div className="legal-icon">👷</div>
          <h1 className="legal-title">Bizimle Çalışın</h1>
          <p className="legal-subtitle">
            All In One 4 You ailesine katılın ve becerilerinizi değerlendirin!
          </p>
        </div>

        {/* Progress Steps */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: step >= s ? "linear-gradient(135deg, #85A98D, #517970)" : "#ddd",
                  color: step >= s ? "white" : "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {step > s ? "✓" : s}
              </div>
              <span style={{ fontSize: 14, color: step >= s ? "#364F53" : "#999" }}>
                {s === 1 && "Kişisel Bilgiler"}
                {s === 2 && "Mesleki Bilgiler"}
                {s === 3 && "Belgeler"}
              </span>
              {s < 3 && (
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: step > s ? "#85A98D" : "#ddd",
                    marginLeft: 8,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="legal-content">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div>
                <h2 style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>👤</span>
                  Kişisel Bilgiler
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Ad *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Adınız"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                    {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Soyad *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Soyadınız"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                    {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">E-posta *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefon *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+49 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Doğum Tarihi</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Adres</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Sokak ve numara"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Şehir *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Berlin"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                    {errors.city && <div className="form-error">{errors.city}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Posta Kodu</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="12345"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Info */}
            {step === 2 && (
              <div>
                <h2 style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>🔧</span>
                  Mesleki Bilgiler
                </h2>

                <div className="form-group">
                  <label className="form-label">Hizmet Kategorisi *</label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleInputChange("category", cat.name)}
                        style={{
                          padding: 16,
                          border: `2px solid ${formData.category === cat.name ? "#85A98D" : "#ddd"}`,
                          borderRadius: 12,
                          background: formData.category === cat.name ? "rgba(133, 169, 141, 0.1)" : "white",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{cat.name}</div>
                      </button>
                    ))}
                  </div>
                  {errors.category && <div className="form-error">{errors.category}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Deneyim Süresi *</label>
                  <select
                    className="form-select"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                  >
                    <option value="">Seçin...</option>
                    <option value="0-1">0-1 yıl</option>
                    <option value="1-3">1-3 yıl</option>
                    <option value="3-5">3-5 yıl</option>
                    <option value="5-10">5-10 yıl</option>
                    <option value="10+">10+ yıl</option>
                  </select>
                  {errors.experience && <div className="form-error">{errors.experience}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Kendinizi Tanıtın *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Deneyimleriniz, uzmanlık alanlarınız ve neden bizimle çalışmak istediğinizi anlatın..."
                    rows="5"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  {errors.description && <div className="form-error">{errors.description}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Sertifikalar ve Belgeler</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Sahip olduğunuz mesleki sertifika ve belgeleri listeleyin..."
                    rows="3"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange("certifications", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div>
                <h2 style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>📄</span>
                  Belgeler ve Onay
                </h2>

                <div className="form-group">
                  <label className="form-label">Özgeçmiş (CV) * - PDF, max 5MB</label>
                  <div
                    style={{
                      border: `2px dashed ${errors.cv ? "#ef4444" : "#ddd"}`,
                      borderRadius: 12,
                      padding: 32,
                      textAlign: "center",
                      cursor: "pointer",
                      background: formData.cv ? "rgba(133, 169, 141, 0.05)" : "white",
                    }}
                    onClick={() => document.getElementById("cv-input").click()}
                  >
                    <input
                      id="cv-input"
                      type="file"
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange("cv", e.target.files[0])}
                    />
                    {formData.cv ? (
                      <>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
                        <div style={{ fontWeight: 600 }}>{formData.cv.name}</div>
                        <div style={{ fontSize: 13, color: "#666" }}>Değiştirmek için tıklayın</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
                        <div style={{ fontWeight: 600 }}>CV'nizi Yükleyin</div>
                        <div style={{ fontSize: 13, color: "#666" }}>veya sürükleyip bırakın</div>
                      </>
                    )}
                  </div>
                  {errors.cv && <div className="form-error">{errors.cv}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Kimlik Belgesi (isteğe bağlı)</label>
                  <div
                    style={{
                      border: "2px dashed #ddd",
                      borderRadius: 12,
                      padding: 24,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => document.getElementById("id-input").click()}
                  >
                    <input
                      id="id-input"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange("idDocument", e.target.files[0])}
                    />
                    {formData.idDocument ? (
                      <div style={{ fontWeight: 600 }}>✓ {formData.idDocument.name}</div>
                    ) : (
                      <div style={{ color: "#666" }}>Kimlik belgesi yükle</div>
                    )}
                  </div>
                </div>

                {/* Agreements */}
                <div style={{ marginTop: 32, padding: 24, background: "#F9F1F1", borderRadius: 12 }}>
                  <h4 style={{ marginBottom: 16 }}>Onay ve Kabul</h4>
                  
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <label htmlFor="terms" style={{ fontSize: 14, cursor: "pointer" }}>
                      <Link to="/terms" target="_blank" style={{ color: "#85A98D" }}>
                        Kullanım Koşullarını
                      </Link>{" "}
                      okudum ve kabul ediyorum. *
                    </label>
                  </div>
                  {errors.termsAccepted && <div className="form-error">{errors.termsAccepted}</div>}

                  <div style={{ display: "flex", gap: 12 }}>
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onChange={(e) => handleInputChange("privacyAccepted", e.target.checked)}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <label htmlFor="privacy" style={{ fontSize: 14, cursor: "pointer" }}>
                      <Link to="/privacy" target="_blank" style={{ color: "#85A98D" }}>
                        Gizlilik Politikasını
                      </Link>{" "}
                      okudum ve kabul ediyorum. *
                    </label>
                  </div>
                  {errors.privacyAccepted && <div className="form-error">{errors.privacyAccepted}</div>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid #ddd",
              }}
            >
              {step > 1 ? (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleBack}
                >
                  ← Geri
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Devam →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner" style={{ width: 20, height: 20 }}></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    "📤 Başvuruyu Gönder"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
