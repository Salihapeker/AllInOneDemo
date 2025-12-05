import React from "react";
import { Link } from "react-router-dom";

/**
 * EmptyState Component
 * Displays when there's no data to show
 */
export default function EmptyState({
  icon = "📭",
  title = "Veri bulunamadı",
  message = "Henüz gösterilecek bir şey yok.",
  actionLabel = null,
  actionLink = null,
  onAction = null,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          marginBottom: "20px",
          opacity: 0.8,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          marginBottom: actionLabel ? "24px" : "0",
          maxWidth: "400px",
          lineHeight: "1.6",
        }}
      >
        {message}
      </p>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
