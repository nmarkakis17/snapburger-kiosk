import React from "react";

export default function ReturningCustomer({ onCancel }) {
  return (
    <div style={{ padding: 28, maxWidth: 900, margin: "0 auto" }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        boxShadow: "0 10px 30px rgba(0,0,0,.15)"
      }}>
        <img src="/assets/loyalty-card.png" alt="Loyalty Card"
             style={{ maxWidth: 300, margin: "0 auto 20px", display: "block" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {/* Left: Theo pointing down */}
          <div style={{ textAlign: "center" }}>
            <img src="/assets/theo-pointing.png" alt="Theo Pointing"
                 style={{ maxWidth: 160, margin: "0 auto" }} />
            <h3 style={{ color: "var(--blue)" }}>Scan Your Loyalty Card Below</h3>
          </div>

          {/* Right: Info entry */}
          <div>
            <h3 style={{ color: "var(--blue)" }}>Enter Your Information Below</h3>
            <input type="text" placeholder="Phone Number" style={{ width:"100%", marginBottom:10 }} />
            <input type="email" placeholder="Email Address" style={{ width:"100%", marginBottom:10 }} />
            <input type="text" placeholder="Loyalty Number" style={{ width:"100%", marginBottom:10 }} />
          </div>
        </div>

        <button onClick={onCancel}
                style={{
                  marginTop:20,
                  background:"linear-gradient(135deg,var(--blue),var(--orange))",
                  color:"#fff", border:"none",
                  padding:"10px 20px", borderRadius:10,
                  fontWeight:800, cursor:"pointer"
                }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

