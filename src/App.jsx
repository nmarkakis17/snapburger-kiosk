// src/App.jsx
import React, { useMemo, useState } from "react";

export default function App() {
  const [stage, setStage] = useState("landing");

  // Generate ~30 random electric lines once
  const lines = useMemo(() => {
    const rnd = (min, max) => min + Math.random() * (max - min);
    return Array.from({ length: 30 }).map(() => ({
      top: rnd(0, 100),        // % from top
      left: rnd(-50, 50),      // start offset
      width: rnd(120, 220),    // line length in vw
      angle: rnd(-60, 60),     // tilt degrees
      delay: rnd(0, 5),        // animation start offset
      duration: rnd(2, 5)      // animation speed
    }));
  }, []);

  return (
    <>
      <style>{`
        :root {
          --sb-bg:#0b1220;
          --blue:#0ea5e9;
          --orange:#f97316;
          --electric:#00f7ff;
        }
        html, body, #root { height:100%; margin:0; }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; }

        /* ===== Circuit grid background ===== */
        .circuit-bg {
          position: fixed; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(0,247,255,0.15) 0 2px, transparent 2px 40px),
            repeating-linear-gradient(0deg, rgba(0,247,255,0.15) 0 2px, transparent 2px 40px),
            var(--sb-bg);
          z-index:0; overflow:hidden;
        }

        /* Spinning haze */
        .pulse {
          position:absolute; width:300%; height:300%; top:-100%; left:-100%;
          background: conic-gradient(from 0deg, rgba(14,165,233,.3), rgba(249,115,22,.4), rgba(14,165,233,.3));
          mix-blend-mode: screen;
          animation: spinPulse 12s linear infinite;
        }
        @keyframes spinPulse {
          0%{transform:rotate(0deg) scale(1)}
          50%{transform:rotate(180deg) scale(1.2)}
          100%{transform:rotate(360deg) scale(1)}
        }

        /* ===== Electric line style ===== */
        .electric-line {
          position:absolute;
          height:2px;
          background:linear-gradient(90deg, transparent, var(--electric), transparent);
          opacity:0.8;
          animation: dashLine var(--dur) linear var(--delay) infinite, blink .8s ease-in-out infinite alternate;
          transform:rotate(var(--angle)) translateX(0);
        }

        @keyframes dashLine {
          0% { transform: rotate(var(--angle)) translateX(0); opacity:0; }
          10%{ opacity:1; }
          50%{ opacity:0.9; }
          100%{ transform: rotate(var(--angle)) translateX(100%); opacity:0; }
        }
        @keyframes blink {
          from { opacity:0.4; }
          to   { opacity:1; }
        }

        /* ===== Foreground content ===== */
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; }
        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px,92vw); filter:drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower > img{ display:block; width:100%; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .tower-overlay .pill-btn{ pointer-events:auto; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          box-shadow: 0 10px 30px rgba(14,165,233,.4), inset 0 0 0 1px rgba(255,255,255,.22);
          cursor:pointer;
        }
        .btn-first  { top:27%; }
        .btn-return { top:37%; }
        .tagline-box{
          position:absolute; left:8%; width:84%; bottom:7.5%;
          padding:14px 16px; border-radius:14px;
          background: rgba(11,18,32,.85); color:#fff; font-weight:800; text-align:center;
          border:1px solid rgba(29,161,255,.5);
          box-shadow:0 6px 18px rgba(0,0,0,.5), inset 0 0 14px rgba(29,161,255,.3);
        }
      `}</style>

      {/* Background */}
      <div className="circuit-bg">
        <div className="pulse"></div>
        {lines.map((line, i) => (
          <div
            key={i}
            className="electric-line"
            style={{
              top: `${line.top}%`,
              left: `${line.left}%`,
              width: `${line.width}vw`,
              '--angle': `${line.angle}deg`,
              '--delay': `${line.delay}s`,
              '--dur': `${line.duration}s`
            }}
          />
        ))}
      </div>

      {/* Foreground */}
      <div className="page">
        <div className="container">
          {stage === "landing" && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk"/>
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage("menu")}>First-Time Customer</button>
                  <button className="pill-btn btn-return" onClick={() => setStage("menu")}>Returning Customer</button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
