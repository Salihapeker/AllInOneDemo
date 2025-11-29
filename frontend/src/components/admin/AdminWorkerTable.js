import React, { useEffect, useState } from "react";
import "./../../styles/admin.css";
// If you have api: import { getWorkerApplications, approveWorker, rejectWorker } from '../../services/api';

const mockApplicants = [
  {
    id: 101,
    name: "Ali U.",
    email: "ali@example.com",
    category: "Tesisatçı",
    status: "pending",
    region: "Berlin",
    documents: ["cv.pdf"],
  },
  {
    id: 102,
    name: "Fatma G.",
    email: "fatma@example.com",
    category: "Elektrikçi",
    status: "pending",
    region: "Hamburg",
    documents: ["cert.pdf"],
  },
];

export default function AdminWorkerTable() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // replace with real API
    setTimeout(() => {
      setApps(mockApplicants);
      setLoading(false);
    }, 400);
  }, []);

  const updateStatus = (id, newStatus) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    // call API: approveWorker(id) or rejectWorker(id)
  };

  return (
    <div className="admin-panel card">
      <h2 className="admin-title">Çalışan Başvuruları</h2>
      {loading ? (
        <div className="loading-spinner">Yükleniyor...</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ad</th>
                <th>Kategori</th>
                <th>Bölge</th>
                <th>Belgeler</th>
                <th>Durum</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <td>
                    {a.name} <div className="muted mono">{a.email}</div>
                  </td>
                  <td>{a.category}</td>
                  <td>{a.region}</td>
                  <td>{a.documents.join(", ")}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "approved"
                          ? "approved"
                          : a.status === "pending"
                          ? "pending"
                          : "rejected"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          alert(
                            "Başvuru detayı:\n" + JSON.stringify(a, null, 2)
                          )
                        }
                      >
                        Detay
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateStatus(a.id, "approved")}
                      >
                        Onayla
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => updateStatus(a.id, "rejected")}
                      >
                        Red
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    Başvuru yok.
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
