import React, { useState, useEffect } from "react";
import "./../../styles/admin.css";
// If you have api: import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';

const initialCategories = [
  {
    id: 1,
    name: "EV & İNŞAAT",
    description: "Tesisat, elektrik, boya",
    parent: null,
  },
  { id: 11, name: "Tesisatçı", parent: 1 },
  { id: 12, name: "Elektrikçi", parent: 1 },
  { id: 2, name: "TEMİZLİK & BAKIM", parent: null },
  { id: 21, name: "Ev Temizliği", parent: 2 },
  { id: 22, name: "Bahçe Bakımı", parent: 2 },
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

export default function AdminCategoryManager() {
  const [categories, setCategories] = useState([]);
  const [flat, setFlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", parent: "", description: "" });

  useEffect(() => {
    // replace with getCategories()
    setTimeout(() => {
      setFlat(initialCategories);
      setCategories(buildTree(initialCategories));
      setLoading(false);
    }, 300);
  }, []);

  const saveCategory = () => {
    if (!form.name.trim()) return alert("Kategori adı gerekli.");
    const id = Math.floor(Math.random() * 10000) + 200;
    const newCat = {
      id,
      name: form.name.trim(),
      description: form.description,
      parent: form.parent ? Number(form.parent) : null,
    };
    const newFlat = [...flat, newCat];
    setFlat(newFlat);
    setCategories(buildTree(newFlat));
    setForm({ name: "", parent: "", description: "" });
    // call API: createCategory(newCat)
  };

  const removeCategory = (id) => {
    if (
      !confirm(
        "Kategoriyi silmek istediğinize emin misiniz? Alt kategoriler de silinebilir."
      )
    )
      return;
    const newFlat = flat.filter((c) => c.id !== id && c.parent !== id);
    setFlat(newFlat);
    setCategories(buildTree(newFlat));
    // call API: deleteCategory(id)
  };

  const renderNode = (node, level = 0) => (
    <div
      key={node.id}
      className="cat-tree-node"
      style={{ marginLeft: level * 12 }}
    >
      <div className="node-row">
        <div>
          <strong>{node.name}</strong>
          {node.description && <div className="muted">{node.description}</div>}
        </div>
        <div className="node-actions">
          <button
            className="btn btn-outline"
            onClick={() => alert("Düzenle UI - " + node.name)}
          >
            Düzenle
          </button>
          <button
            className="btn btn-danger"
            onClick={() => removeCategory(node.id)}
          >
            Sil
          </button>
        </div>
      </div>
      {node.children?.length > 0 && (
        <div className="node-children">
          {node.children.map((c) => renderNode(c, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-panel card">
      <h2 className="admin-title">Kategori Yönetimi</h2>
      <div className="grid-two">
        <div>
          <h3>Kategoriler</h3>
          {loading ? (
            <div className="loading-spinner">Yükleniyor...</div>
          ) : (
            <div className="cat-tree">
              {categories.map((n) => renderNode(n))}
              {categories.length === 0 && (
                <div className="muted">Kategori yok</div>
              )}
            </div>
          )}
        </div>

        <div>
          <h3>Yeni Kategori / Alt Kategori Ekle</h3>
          <div className="form-grid">
            <label className="form-row">
              <span className="form-label">Ad</span>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
              />
            </label>

            <label className="form-row">
              <span className="form-label">Üst Kategori (opsiyonel)</span>
              <select
                className="form-input"
                value={form.parent}
                onChange={(e) =>
                  setForm((s) => ({ ...s, parent: e.target.value }))
                }
              >
                <option value="">Yeni kök kategori</option>
                {flat
                  .filter((f) => !f.parent)
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
              </select>
            </label>

            <label className="form-row">
              <span className="form-label">Açıklama</span>
              <input
                className="form-input"
                value={form.description}
                onChange={(e) =>
                  setForm((s) => ({ ...s, description: e.target.value }))
                }
              />
            </label>

            <div className="actions">
              <button className="btn btn-primary" onClick={saveCategory}>
                Kaydet
              </button>
              <button
                className="btn btn-ghost"
                onClick={() =>
                  setForm({ name: "", parent: "", description: "" })
                }
              >
                Temizle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
