import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/AdminPanel.css";

const initialCategories = [
  {
    id: 1,
    name: "EV & İNŞAAT",
    icon: "🏠",
    description: "Tesisat, elektrik, boya, tadilat",
    price: null,
    image: null,
    parent: null,
  },
  { id: 11, name: "Tesisatçı", icon: "🔧", parent: 1, price: 50, description: "Su ve doğalgaz tesisatı" },
  { id: 12, name: "Elektrikçi", icon: "💡", parent: 1, price: 45, description: "Elektrik tesisatı ve tamirat" },
  { id: 13, name: "Boyacı", icon: "🎨", parent: 1, price: 35, description: "İç ve dış cephe boyama" },
  { id: 14, name: "Marangoz", icon: "🪚", parent: 1, price: 55, description: "Ahşap işleri ve mobilya" },
  {
    id: 2,
    name: "TEMİZLİK & BAKIM",
    icon: "🧽",
    description: "Ev temizliği, halı, bahçe bakımı",
    parent: null,
  },
  { id: 21, name: "Ev Temizliği", icon: "🧹", parent: 2, price: 40, description: "Detaylı ev temizliği" },
  { id: 22, name: "Bahçe Bakımı", icon: "🌿", parent: 2, price: 30, description: "Bahçe düzenleme ve bakım" },
  { id: 23, name: "Halı Yıkama", icon: "🧼", parent: 2, price: 25, description: "Profesyonel halı yıkama" },
  {
    id: 3,
    name: "ONARIM & MONTAJ",
    icon: "🔩",
    description: "Mobilya montaj, çilingir, klima",
    parent: null,
  },
  { id: 31, name: "Mobilya Montaj", icon: "🛠️", parent: 3, price: 40, description: "Mobilya kurulum ve montaj" },
  { id: 32, name: "Çilingir", icon: "🔐", parent: 3, price: 60, description: "Kilit ve anahtar hizmetleri" },
  { id: 33, name: "Klima Servis", icon: "❄️", parent: 3, price: 70, description: "Klima bakım ve tamir" },
];

function buildTree(flat) {
  const map = {};
  flat.forEach((c) => (map[c.id] = { ...c, children: [] }));
  const roots = [];
  flat.forEach((c) => {
    if (c.parent) {
      map[c.parent] && map[c.parent].children.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [flat, setFlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({
    name: "",
    icon: "",
    parent: "",
    description: "",
    price: "",
    image: "",
  });
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFlat(initialCategories);
      setCategories(buildTree(initialCategories));
      setExpandedNodes(initialCategories.filter(c => !c.parent).map(c => c.id));
      setLoading(false);
    }, 500);
  }, []);

  const toggleNode = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setForm({ name: "", icon: "", parent: "", description: "", price: "", image: "" });
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      icon: category.icon || "",
      parent: category.parent ? String(category.parent) : "",
      description: category.description || "",
      price: category.price ? String(category.price) : "",
      image: category.image || "",
    });
  };

  const saveCategory = () => {
    if (!form.name.trim()) {
      alert("Kategori adı gerekli.");
      return;
    }

    if (editingCategory) {
      // Update existing
      const newFlat = flat.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: form.name.trim(),
              icon: form.icon,
              description: form.description,
              price: form.price ? Number(form.price) : null,
              image: form.image,
              parent: form.parent ? Number(form.parent) : null,
            }
          : c
      );
      setFlat(newFlat);
      setCategories(buildTree(newFlat));
    } else {
      // Create new
      const id = Math.floor(Math.random() * 10000) + 200;
      const newCat = {
        id,
        name: form.name.trim(),
        icon: form.icon || "📁",
        description: form.description,
        price: form.price ? Number(form.price) : null,
        image: form.image,
        parent: form.parent ? Number(form.parent) : null,
      };
      const newFlat = [...flat, newCat];
      setFlat(newFlat);
      setCategories(buildTree(newFlat));
    }
    resetForm();
  };

  const deleteCategory = (id) => {
    if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz? Alt kategoriler de silinecektir.")) {
      return;
    }
    // Remove category and its children
    const idsToRemove = [id];
    const findChildren = (parentId) => {
      flat.forEach((c) => {
        if (c.parent === parentId) {
          idsToRemove.push(c.id);
          findChildren(c.id);
        }
      });
    };
    findChildren(id);
    
    const newFlat = flat.filter((c) => !idsToRemove.includes(c.id));
    setFlat(newFlat);
    setCategories(buildTree(newFlat));
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="admin-category-node" style={{ marginLeft: level * 16 }}>
        <div className="admin-category-node-header" onClick={() => hasChildren && toggleNode(node.id)}>
          <div className="admin-category-node-info">
            <span className="admin-category-node-icon">{node.icon || "📁"}</span>
            <div>
              <div className="admin-category-node-name">{node.name}</div>
              {node.description && (
                <div className="admin-category-node-desc">{node.description}</div>
              )}
              {node.price && (
                <div className="admin-category-node-desc">Fiyat: {node.price}€</div>
              )}
            </div>
          </div>
          <div className="admin-action-btns">
            <button className="admin-action-btn edit" onClick={(e) => { e.stopPropagation(); handleEdit(node); }}>
              Düzenle
            </button>
            <button className="admin-action-btn delete" onClick={(e) => { e.stopPropagation(); deleteCategory(node.id); }}>
              Sil
            </button>
            {hasChildren && (
              <span style={{ marginLeft: 8, fontSize: 14, color: "#85A98D" }}>
                {isExpanded ? "▼" : "▶"}
              </span>
            )}
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className="admin-category-children">
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Kategori Yönetimi">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Kategori Yönetimi">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
        {/* Category Tree */}
        <div className="admin-category-tree">
          <div className="admin-table-header">
            <h3 className="admin-table-title">📂 Kategori Ağacı</h3>
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={() => setExpandedNodes(categories.map(c => c.id))}
            >
              Tümünü Aç
            </button>
          </div>

          {categories.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
              <p>Henüz kategori eklenmemiş.</p>
            </div>
          ) : (
            <div style={{ marginTop: 16 }}>
              {categories.map((node) => renderNode(node))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="admin-form-card">
          <h3 className="admin-form-title">
            {editingCategory ? "✏️ Kategori Düzenle" : "➕ Yeni Kategori Ekle"}
          </h3>

          <div className="admin-form-group">
            <label className="admin-form-label">Kategori Adı *</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="örn. Tesisatçı"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">İkon (Emoji)</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="örn. 🔧"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Üst Kategori</label>
            <select
              className="admin-form-select"
              value={form.parent}
              onChange={(e) => setForm({ ...form, parent: e.target.value })}
            >
              <option value="">Ana Kategori (Kök)</option>
              {flat.filter((f) => !f.parent).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.icon} {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Açıklama</label>
            <textarea
              className="admin-form-textarea"
              placeholder="Kategori hakkında kısa açıklama..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Başlangıç Fiyatı (€)</label>
            <input
              type="number"
              className="admin-form-input"
              placeholder="örn. 50"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Görsel URL</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={saveCategory}>
              {editingCategory ? "Güncelle" : "Kaydet"}
            </button>
            <button className="admin-btn admin-btn-secondary" onClick={resetForm}>
              {editingCategory ? "İptal" : "Temizle"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
