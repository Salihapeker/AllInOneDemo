import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";
// import { providerRegister } from "../../services/api"; // real API

const mockProviderRegister = async (formData) => {
  await new Promise((r) => setTimeout(r, 900));
  if (formData.get("email") && formData.get("name")) {
    return { ok: true, message: "Başvuru alındı" };
  }
  return { ok: false, message: "Eksik bilgi" };
};

export default function ProviderRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    setResumeFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !category) {
      setError("Ad, e-posta ve kategori zorunludur.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("category", category);
      fd.append("bio", bio);
      if (resumeFile) fd.append("resume", resumeFile);

      const res = await mockProviderRegister(fd);
      // const res = await providerRegister(fd);
      if (res.ok) {
        navigate("/provider/thank-you");
      } else {
        setError(res.message || "Başvuru başarısız.");
      }
    } catch {
      setError("Sunucu hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form-grid"
      onSubmit={handleSubmit}
      aria-label="Provider registration form"
    >
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <label className="form-row">
        <span className="form-label">Ad Soyad</span>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="form-row">
        <span className="form-label">E-posta</span>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="form-row">
        <span className="form-label">Telefon</span>
        <input
          className="form-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label className="form-row">
        <span className="form-label">Kategori</span>
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Kategori seçin</option>
          <option value="plumbing">Tesisatçı</option>
          <option value="electric">Elektrikçi</option>
          <option value="cleaning">Temizlik</option>
          <option value="carpentry">Marangoz</option>
        </select>
      </label>

      <label className="form-row">
        <span className="form-label">Kısa Özgeçmiş / Hakkında</span>
        <textarea
          className="form-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Deneyiminiz, sertifikalarınız..."
        ></textarea>
      </label>

      <label className="form-row">
        <span className="form-label">Özgeçmiş (PDF) / Sertifika</span>
        <input
          className="form-input file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onFileChange}
        />
        {resumeFile && (
          <div className="upload-info">Yüklendi: {resumeFile.name}</div>
        )}
      </label>

      <div className="form-row actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Başvurunuz gönderiliyor..." : "Başvuruyu Gönder"}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/")}
        >
          İptal
        </button>
      </div>
    </form>
  );
}
