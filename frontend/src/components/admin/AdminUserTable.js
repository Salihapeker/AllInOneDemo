import React, { useEffect, useState } from "react";
import "./../../styles/admin.css";
// If you have api: import { getUsers, blockUser, deleteUser } from '../../services/api';

const mockUsers = [
  {
    id: 1,
    name: "Mehmet Y.",
    email: "mehmet@example.com",
    role: "user",
    status: "active",
    bookings: 3,
  },
  {
    id: 2,
    name: "Ayşe K.",
    email: "ayse@example.com",
    role: "provider",
    status: "pending",
    bookings: 0,
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    bookings: 12,
  },
];

export default function AdminUserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with real API: getUsers().then(...)
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 400);
  }, []);

  const toggleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
    // call API: blockUser(userId)
  };

  const removeUser = (userId) => {
    if (
      !confirm(
        "Kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      )
    )
      return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    // call API: deleteUser(userId)
  };

  return (
    <div className="admin-panel card">
      <h2 className="admin-title">Kullanıcılar</h2>
      {loading ? (
        <div className="loading-spinner">Yükleniyor...</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ad</th>
                <th>E-posta</th>
                <th>Rol</th>
                <th>Randevular</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="mono">{u.role}</td>
                  <td>{u.bookings}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.status === "active"
                          ? "approved"
                          : u.status === "pending"
                          ? "pending"
                          : "rejected"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => alert(JSON.stringify(u, null, 2))}
                      >
                        Görüntüle
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => toggleBlock(u.id)}
                      >
                        {u.status === "active" ? "Engelle" : "Aktifleştir"}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeUser(u.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    Kayıtlı kullanıcı yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
