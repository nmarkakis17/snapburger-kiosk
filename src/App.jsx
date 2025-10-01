// src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [stage, setStage] = useState("landing"); // 'landing' | 'menu'

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220; --blue:#0ea5e9; --orange:#f97316;
        }
        html, body, #root { height: 100%; margin:0; }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; }

        /* ===== Animated Circuit Background ===== */
        .circuit-bg{
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
              90deg,
              rgba(14,165,233,0.08) 0px,
              rgba(14,165,233,0.08) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(14,165,233,0.08) 0px,
              rgba(14,165,233,0.08) 1px,
              transparent 1px,
              transparent 40px
            );
          z-index:0;
        }

        /* glowing animated pulse */
        .circuit-pulse {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%; left: -50%;
          background: radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%);
          animation: pulse 6s linear infinite;
          mix-blend-mode: screen;
        }
        @keyframes pulse {
          0%   { transform: rotate(0deg) scale(1); opacity:0.6; }
          50%  { transform: rotate(180deg) scale(1.2); opacity:0.2; }
          100% { transform: rotate(360deg) scale(1); opacity:0.6; }
        }

        /* ===== Foreground layout ===== */
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; }

        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px, 92vw); filter: drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower > img{ display:block; width:100%; height:auto; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .tower-overlay .pill-btn{ pointer-events:auto; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          box-shadow: 0 10px 30px rgba(14,165,233,.28), inset 0 0 0 1px rgba(255,255,255,.22);
          cursor:pointer; transition: transform .08s ease, box-shadow .16s ease, filter .16s ease;
        }
        .pill-btn:hover{ transform:translateX(-50%) translateY(-1px); filter:saturate(1.06) }
        .btn-first  { top: 27%; }
        .btn-return { top: 37%; }

        .tagline-box{
          position:absolute; left:8%; width:84%; bottom:7.5%;
          padding:14px 16px; border-radius:14px;
          background: rgba(11,18,32,.88); color:#fff; font-weight:800; text-align:center;
          border:1px solid rgba(29,161,255,.35);
          box-shadow: 0 6px 18px rgba(0,0,0,.35), inset 0 0 10px rgba(29,161,255,.18);
          backdrop-filter: blur(2px); pointer-events:none;
        }
      `}</style>

      {/* Background */}
      <div className="circuit-bg">
        <div className="circuit-pulse"></div>
      </div>

      {/* Foreground */}
      <div className="page">
        <div className="container">
          {stage === "landing" && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage("menu")}>
                    First-Time Customer
                  </button>
                  <button className="pill-btn btn-return" onClick={() => setStage("menu")}>
                    Returning Customer
                  </button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}

          {stage === "menu" && (
            <section>
              <h2 style={{ color: "#fff" }}>Menu Placeholder</h2>
              <button className="pill-btn" onClick={() => setStage("landing")} style={{ top:"20%" }}>
                Back
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
