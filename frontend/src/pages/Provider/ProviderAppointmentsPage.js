// src/pages/ProviderAppointmentsPage.js
import React from "react";
import ProviderAppointmentList from "../components/provider/ProviderAppointmentList";

export default function ProviderAppointmentsPage() {
  return (
    <div className="container" style={{ padding: 20 }}>
      <h2 className="display-stoewer" style={{ fontSize: 24 }}>
        Gelen Randevular
      </h2>
      <div style={{ marginTop: 12 }}>
        <ProviderAppointmentList providerId={101} />
      </div>
    </div>
  );
}
