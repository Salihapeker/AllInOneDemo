import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { categoriesAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/AdminPanel.css";

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
  const { t } = useContext(I18nContext);
  const [categories, setCategories] = useState([]);
  const [flat, setFlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getAll();
      const data = response.data || [];
      setFlat(data);
      setCategories(buildTree(data));
      setExpandedNodes(data.filter(c => !c.parent).map(c => c.id));
    } catch (err) {
      console.error("Kategoriler yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
      setFlat([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const saveCategory = async () => {
    if (!form.name.trim()) {
      alert(t("error_occurred"));
      return;
    }

    try {
      if (editingCategory) {
        // Update existing
        await categoriesAPI.update(editingCategory.id, {
          name: form.name.trim(),
          icon: form.icon,
          description: form.description,
          price: form.price ? Number(form.price) : null,
          image: form.image,
          parent: form.parent ? Number(form.parent) : null,
        });
        alert(t("save_success"));
      } else {
        // Create new
        await categoriesAPI.create({
          name: form.name.trim(),
          icon: form.icon || "📁",
          description: form.description,
          price: form.price ? Number(form.price) : null,
          image: form.image,
          parent: form.parent ? Number(form.parent) : null,
        });
        alert(t("save_success"));
      }
      resetForm();
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error("Kategori kaydedilirken hata:", err);
      alert(t("save_error"));
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm(t("confirm"))) {
      return;
    }
    try {
      await categoriesAPI.delete(id);
      alert(t("delete_success"));
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error("Kategori silinirken hata:", err);
      alert(t("delete_error"));
    }
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
      <AdminLayout title={t("category_management")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title={t("category_management")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchCategories}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={t("category_management")}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
        {/* Category Tree */}
        <div className="admin-category-tree">
          <div className="admin-table-header">
            <h3 className="admin-table-title">📂 {t("categories")}</h3>
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={() => setExpandedNodes(categories.map(c => c.id))}
            >
              {t("all")}
            </button>
          </div>

          {categories.length === 0 ? (
            <EmptyState 
              icon="📂"
              title={t("no_data")}
              message={t("no_data")}
            />
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
