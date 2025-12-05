import React from "react";

/**
 * LoadingSpinner Component
 * Displays a loading spinner while data is being fetched
 */
export default function LoadingSpinner({ size = "medium", message = "" }) {
  const sizeClasses = {
    small: { spinner: "24px", container: "100px" },
    medium: { spinner: "40px", container: "200px" },
    large: { spinner: "60px", container: "300px" },
  };

  const dimensions = sizeClasses[size] || sizeClasses.medium;

  return (
    <div
      className="loading-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: dimensions.container,
        gap: "16px",
      }}
    >
      <div
        className="loading-spinner"
        style={{
          width: dimensions.spinner,
          height: dimensions.spinner,
        }}
      />
      {message && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            margin: 0,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
