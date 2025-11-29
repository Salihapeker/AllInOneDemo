import React from "react";
import { Link } from "react-router-dom";
import "../../styles/globals.css";

/*
  Footer
  - Neutral footer with brand accent and quick links
  - Fixed visual style that fits the poster palette (no heavy blue)
*/

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 48,
        borderTop: "1px solid rgba(47,61,70,0.04)",
        background:
          "linear-gradient(180deg, rgba(249,241,241,0.9), transparent)",
        padding: "28px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          gap: 18,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            className="brand-tile"
            style={{ width: 44, height: 44, fontSize: 18 }}
          >
            4
          </div>
          <div>
            <div className="display-stoewer" style={{ fontSize: 16 }}>
              ALL IN ONE
            </div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              all in one for you
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <Link
            to="/terms"
            className="text-muted"
            style={{ textDecoration: "none" }}
          >
            Kullanım Şartları
          </Link>
          <Link
            to="/privacy"
            className="text-muted"
            style={{ textDecoration: "none" }}
          >
            Gizlilik
          </Link>
          <Link
            to="/contact"
            className="text-muted"
            style={{ textDecoration: "none" }}
          >
            İletişim
          </Link>
        </div>

        <div className="text-muted" style={{ fontSize: 13 }}>
          © {new Date().getFullYear()} All In One — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
