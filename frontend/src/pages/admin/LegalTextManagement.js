import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

const initialTexts = {
  privacy: {
    title: "Gizlilik Politikası (DSGVO)",
    content: `<h2>1. Veri Koruma Genel Bakış</h2>
<p>Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde kişisel verilerinize ne olduğunu açıklar. Kişisel veriler, sizi kişisel olarak tanımlamak için kullanılabilecek tüm verilerdir.</p>

<h2>2. Sorumlu Taraf</h2>
<p>All In One 4 You<br/>
Musterstraße 123<br/>
12345 Berlin, Almanya<br/>
E-posta: info@allinone4you.de<br/>
Telefon: +49 123 456 7890</p>

<h2>3. Veri Toplama</h2>
<p>Web sitemizde aşağıdaki kişisel verilerinizi topluyoruz:</p>
<ul>
<li>İletişim bilgileri (ad, e-posta, telefon)</li>
<li>Randevu bilgileri</li>
<li>Teknik veriler (IP adresi, tarayıcı bilgileri)</li>
</ul>

<h2>4. Haklarınız</h2>
<p>DSGVO kapsamında aşağıdaki haklara sahipsiniz:</p>
<ul>
<li>Bilgi edinme hakkı (Madde 15)</li>
<li>Düzeltme hakkı (Madde 16)</li>
<li>Silme hakkı (Madde 17)</li>
<li>İşlemenin kısıtlanması hakkı (Madde 18)</li>
<li>Veri taşınabilirliği hakkı (Madde 20)</li>
<li>İtiraz hakkı (Madde 21)</li>
</ul>`,
    lastUpdated: "2024-05-01",
  },
  terms: {
    title: "Kullanım Koşulları",
    content: `<h2>1. Genel Hükümler</h2>
<p>Bu kullanım koşulları, All In One 4 You platformunu kullanan tüm kullanıcılar için geçerlidir.</p>

<h2>2. Hizmet Tanımı</h2>
<p>Platformumuz, hizmet arayan müşteriler ile hizmet sağlayıcıları (ustalar) arasında bağlantı kurar.</p>

<h2>3. Kullanıcı Yükümlülükleri</h2>
<ul>
<li>Doğru ve güncel bilgi sağlamak</li>
<li>Platformu yasalara uygun kullanmak</li>
<li>Diğer kullanıcılara saygılı davranmak</li>
</ul>

<h2>4. Sorumluluk Reddi</h2>
<p>Platform, hizmet sağlayıcıları ile müşteriler arasındaki anlaşmazlıklardan sorumlu değildir.</p>`,
    lastUpdated: "2024-04-15",
  },
  cookies: {
    title: "Çerez Politikası",
    content: `<h2>1. Çerezler Hakkında</h2>
<p>Web sitemiz, deneyiminizi geliştirmek için çerezler kullanmaktadır.</p>

<h2>2. Kullandığımız Çerez Türleri</h2>
<h3>Zorunlu Çerezler</h3>
<p>Web sitesinin temel işlevleri için gereklidir. Devre dışı bırakılamazlar.</p>

<h3>Analitik Çerezler</h3>
<p>Ziyaretçi istatistiklerini toplamak için kullanılır. Google Analytics kullanıyoruz.</p>

<h3>Fonksiyonel Çerezler</h3>
<p>Dil tercihi gibi ayarlarınızı hatırlamak için kullanılır.</p>

<h2>3. Çerez Yönetimi</h2>
<p>Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz.</p>`,
    lastUpdated: "2024-03-20",
  },
};

export default function LegalTextManagement() {
  const [texts, setTexts] = useState(initialTexts);
  const [activeTab, setActiveTab] = useState("privacy");
  const [editMode, setEditMode] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [tempTitle, setTempTitle] = useState("");

  const tabs = [
    { id: "privacy", label: "Gizlilik Politikası", icon: "🔒" },
    { id: "terms", label: "Kullanım Koşulları", icon: "📋" },
    { id: "cookies", label: "Çerez Politikası", icon: "🍪" },
  ];

  const handleEdit = () => {
    setTempContent(texts[activeTab].content);
    setTempTitle(texts[activeTab].title);
    setEditMode(true);
  };

  const handleSave = () => {
    setTexts((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        title: tempTitle,
        content: tempContent,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    }));
    setEditMode(false);
    alert("Değişiklikler kaydedildi!");
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempContent("");
    setTempTitle("");
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple toolbar actions for rich text
  const insertTag = (tag) => {
    const selection = window.getSelection().toString();
    if (selection) {
      setTempContent((prev) =>
        prev.replace(selection, `<${tag}>${selection}</${tag}>`)
      );
    }
  };

  return (
    <AdminLayout title="Hukuki Metinler">
      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 24 }}>
        {/* Sidebar */}
        <div className="admin-form-card">
          <h3 className="admin-form-title">📜 Metin Türleri</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditMode(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  background: activeTab === tab.id ? "linear-gradient(135deg, #85A98D, #517970)" : "#F9F1F1",
                  color: activeTab === tab.id ? "white" : "#374259",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 20 }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: 16, background: "#f2d8d8", borderRadius: 12 }}>
            <h5 style={{ marginBottom: 8, fontSize: 13 }}>💡 İpucu</h5>
            <p style={{ fontSize: 12, color: "#374259", lineHeight: 1.6 }}>
              HTML etiketlerini kullanarak metni biçimlendirebilirsiniz. 
              Örn: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
            </p>
          </div>
        </div>

        {/* Content Editor */}
        <div className="admin-form-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 className="admin-form-title" style={{ marginBottom: 4 }}>
                {texts[activeTab].title}
              </h3>
              <p style={{ fontSize: 13, color: "#666" }}>
                Son güncelleme: {formatDate(texts[activeTab].lastUpdated)}
              </p>
            </div>
            {!editMode ? (
              <button className="admin-btn admin-btn-primary" onClick={handleEdit}>
                ✏️ Düzenle
              </button>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                  💾 Kaydet
                </button>
                <button className="admin-btn admin-btn-secondary" onClick={handleCancel}>
                  İptal
                </button>
              </div>
            )}
          </div>

          {editMode ? (
            <>
              {/* Title Input */}
              <div className="admin-form-group">
                <label className="admin-form-label">Başlık</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                />
              </div>

              {/* Rich Text Toolbar */}
              <div className="admin-rich-editor">
                <div className="admin-rich-toolbar">
                  <button className="admin-rich-btn" onClick={() => insertTag("h2")} title="Başlık 2">
                    H2
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("h3")} title="Başlık 3">
                    H3
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("p")} title="Paragraf">
                    P
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("strong")} title="Kalın">
                    <strong>B</strong>
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("em")} title="İtalik">
                    <em>I</em>
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("ul")} title="Liste">
                    UL
                  </button>
                  <button className="admin-rich-btn" onClick={() => insertTag("li")} title="Liste Öğesi">
                    LI
                  </button>
                </div>
                <textarea
                  className="admin-rich-content"
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: 400,
                    border: "none",
                    resize: "vertical",
                    fontFamily: "monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Preview */}
              <div style={{ marginTop: 24 }}>
                <h4 style={{ marginBottom: 12 }}>👁️ Önizleme</h4>
                <div
                  style={{
                    padding: 24,
                    background: "#F9F1F1",
                    borderRadius: 12,
                    maxHeight: 300,
                    overflowY: "auto",
                  }}
                  dangerouslySetInnerHTML={{ __html: tempContent }}
                />
              </div>
            </>
          ) : (
            /* View Mode */
            <div
              style={{
                padding: 24,
                background: "#F9F1F1",
                borderRadius: 12,
                maxHeight: 500,
                overflowY: "auto",
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: texts[activeTab].content }}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
