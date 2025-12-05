import React from "react";

/**
 * ErrorMessage Component
 * Displays error messages from API calls
 */
export default function ErrorMessage({
  message = "Bir hata oluştu.",
  title = "Hata",
  onRetry = null,
  variant = "error", // error, warning, info
}) {
  const variantStyles = {
    error: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "var(--error)",
      icon: "❌",
      color: "var(--error)",
    },
    warning: {
      background: "rgba(245, 158, 11, 0.1)",
      border: "var(--warning)",
      icon: "⚠️",
      color: "var(--warning)",
    },
    info: {
      background: "rgba(59, 130, 246, 0.1)",
      border: "var(--info)",
      icon: "ℹ️",
      color: "var(--info)",
    },
  };

  const style = variantStyles[variant] || variantStyles.error;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: style.background,
          borderLeft: `4px solid ${style.border}`,
          borderRadius: "12px",
          padding: "24px 32px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
          }}
        >
          {style.icon}
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
            marginBottom: onRetry ? "20px" : "0",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-primary"
            style={{
              marginTop: "8px",
            }}
          >
            🔄 Tekrar Dene
          </button>
        )}
      </div>
    </div>
  );
}
