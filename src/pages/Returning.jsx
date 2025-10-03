// src/pages/Returning.jsx
import React from "react"

export default function Returning() {
  return (
    <div className="page" style={{ padding: 28 }}>
      <div className="card" style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Returning Customer</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <img src="/assets/theo-point.png" alt="Theo pointing" style={{ width: 120, marginBottom: 12 }} />
            <p style={{ fontWeight: 600 }}>Scan your loyalty card below</p>
            <img src="/assets/loyalty-card.png" alt="Loyalty card" style={{ width: "100%", maxWidth: 240 }} />
          </div>
          <div className="card">
            <p style={{ fontWeight: 600, marginTop: 0 }}>Or enter your information:</p>
            <input placeholder="Phone Number" style={{ marginBottom: 12 }} />
            <input placeholder="Email Address" style={{ marginBottom: 12 }} />
            <input placeholder="Loyalty Number" style={{ marginBottom: 12 }} />
            <button className="btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
