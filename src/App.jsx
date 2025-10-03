// src/App.jsx
import React, { useState } from "react";
import Registration from "./pages/Registration.jsx"; // ✅ import registration

export default function App() {
  const [stage, setStage] = useState("landing"); // landing | menu | register | returning

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220;
          --blue:#0ea5e9; --orange:#f97316;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; }

        /* ===== Background haze (unchanged) ===== */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            var(--sb-bg);
          filter: saturate(1.05);
        }
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; }

        /* Tower */
        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px, 92vw); }
        .tower > img{ display:block; width:100%; border-radius:22px; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          cursor:pointer;
        }
        .btn-first  { top: 27%; }
        .btn-return { top: 37%; }

        .tagline-box{
          position:absolute; left:8%; width:84%; bottom:7.5%;
          padding:14px 16px; border-radius:14px;
          background: rgba(11,18,32,.88); color:#fff; font-weight:800; text-align:center;
          border:1px solid rgba(29,161,255,.35);
        }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <div className="page">
        <div className="container">
          {stage === "landing" && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage("register")}>
                    First-Time Customer
                  </button>
                  <button className="pill-btn btn-return" onClick={() => setStage("returning")}>
                    Returning Customer
                  </button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}

          {stage === "register" && (
            <Registration onCancel={() => setStage("landing")} />
          )}

          {stage === "returning" && (
            <section style={{ textAlign: "center", color: "#fff" }}>
              <h2>Returning Customer</h2>
              <p>(placeholder until we drop in your returning customer page)</p>
              <button
                style={{ marginTop: "20px", background: "var(--blue)", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}
                onClick={() => setStage("landing")}
              >
                Back to Home
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
