import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { usersAPI } from "../../services/api";
import { I18nContext } from "../../contexts/I18nContext";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../styles/AdminPanel.css";

export default function UserManagement() {
  const { t } = useContext(I18nContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersAPI.getAll();
      setUsers(response.data || []);
    } catch (err) {
      console.error("Kullanıcılar yüklenirken hata:", err);
      setError(err.message || t("error_occurred"));
      // No mock data - show empty state
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <AdminLayout title={t("user_management")}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title={t("user_management")}>
        <ErrorMessage 
          message={error} 
          onRetry={fetchUsers}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={t("user_management")}>
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">👥 {t("users")} ({filteredUsers.length})</h3>
          
          <div className="admin-table-actions">
            <div className="admin-search-box">
              <span className="admin-search-icon">🔍</span>
              <input
                type="text"
                placeholder="İsim veya e-posta ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="admin-filter-btn"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ border: "none", cursor: "pointer" }}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Kullanıcı</th>
              <th>Durum</th>
              <th>Kayıt Tarihi</th>
              <th>Randevu Sayısı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="admin-table-user">
                    <div className="admin-table-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="admin-table-name">{user.name}</div>
                      <div className="admin-table-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`admin-status-badge ${user.status}`}>
                    {user.status === "active" ? "✓ Aktif" : "○ Pasif"}
                  </span>
                </td>
                <td>{formatDate(user.joinDate)}</td>
                <td>
                  <strong>{user.appointments}</strong> randevu
                </td>
                <td>
                  <div className="admin-action-btns">
                    <button
                      className="admin-action-btn view"
                      onClick={() => setSelectedUser(user)}
                    >
                      Detay
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <EmptyState 
            icon="👥"
            title={t("no_data")}
            message={t("no_data")}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Toplam {filteredUsers.length} kullanıcıdan {(currentPage - 1) * usersPerPage + 1} -{" "}
              {Math.min(currentPage * usersPerPage, filteredUsers.length)} gösteriliyor
            </div>
            <div className="admin-pagination-btns">
              <button
                className="admin-pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ← Önceki
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`admin-pagination-btn ${currentPage === idx + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="admin-pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Sonraki →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3>👤 Kullanıcı Detayları</h3>
              <button className="modal-close" onClick={() => setSelectedUser(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #85A98D, #517970)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    color: "white",
                    margin: "0 auto 16px",
                  }}
                >
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <h4 style={{ marginBottom: 4 }}>{selectedUser.name}</h4>
                <p style={{ color: "#666", fontSize: 14 }}>{selectedUser.email}</p>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Durum</span>
                  <span className={`admin-status-badge ${selectedUser.status}`}>
                    {selectedUser.status === "active" ? "✓ Aktif" : "○ Pasif"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Kayıt Tarihi</span>
                  <strong>{formatDate(selectedUser.joinDate)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#F9F1F1", borderRadius: 8 }}>
                  <span style={{ color: "#666" }}>Toplam Randevu</span>
                  <strong>{selectedUser.appointments} randevu</strong>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelectedUser(null)}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
