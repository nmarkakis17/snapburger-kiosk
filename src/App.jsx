// src/App.jsx
import React, { useState, useMemo } from 'react'

export default function App() {
  const [stage, setStage] = useState('landing')

  // streak lines
  const lines = useMemo(() => {
    const rnd = (min, max) => min + Math.random() * (max - min)
    return Array.from({ length: 30 }).map(() => ({
      top: rnd(10, 90),
      left: rnd(-100, 100),   // you already liked this range
      width: rnd(120, 220),
      angle: rnd(-80, 80),
      delay: rnd(0, 5),
      duration: rnd(2, 4)
    }))
  }, [])

  return (
    <>
      <style>{`
        :root { --electric: #22d3ee; }
        html { background:#0b1220; }
        body, #root { margin:0; background:transparent; }

        /* === PURE glowing haze (no grid lines) === */
        .global-haze {
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(900px 700px at 40% 40%, rgba(34,211,238,.25), transparent 70%),
            radial-gradient(900px 700px at 60% 60%, rgba(249,115,22,.20), transparent 70%),
            #0b1220;
          filter: saturate(1.2);
        }

        /* electric streaks */
        .electric-line {
          position:absolute;
          height:2px;
          background:linear-gradient(90deg, transparent, var(--electric), transparent);
          opacity:0.9;
          animation: dashLine var(--dur) linear var(--delay) infinite,
                     blink .6s ease-in-out infinite alternate;
          transform:rotate(var(--angle)) translateX(0);
        }
        @keyframes dashLine {
          0%   { transform: rotate(var(--angle)) translateX(0); opacity:0; }
          10%  { opacity:1; }
          50%  { opacity:0.9; }
          100% { transform: rotate(var(--angle)) translateX(-140%); opacity:0; }
        }
        @keyframes blink {
          0%{opacity:0.6} 100%{opacity:1}
        }

        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; color:#fff; }

        /* kiosk */
        .tower-wrap{ display:flex; justify-content:center; padding:20px 0; }
        .tower{ position:relative; width:min(460px,92vw); }
        .tower img{ width:100%; border-radius:22px; display:block; }
        .tower-overlay{ position:absolute; inset:0; }
        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:20px 0; border-radius:9999px;
          border:none; font-weight:900; font-size:18px; color:#0b0e14;
          background:linear-gradient(135deg,#0ea5e9,#f97316);
          cursor:pointer;
        }
        .btn-first{ top:27%; }
        .btn-return{ top:37%; }
        .tagline-box{
          position:absolute; bottom:8%; left:8%; width:84%;
          text-align:center; font-weight:800;
          padding:14px; border-radius:14px;
          background:rgba(11,18,32,.85); border:1px solid rgba(29,161,255,.35);
        }

        /* menu */
        .grid-2{ display:grid; gap:22px; grid-template-columns:1fr 1fr; }
        .card{
          background:#fff; color:#0b1020;
          border-radius:18px; padding:16px;
        }
      `}</style>

      {/* glowing haze */}
      <div className="global-haze" aria-hidden="true"/>

      {/* streaks */}
      {lines.map((l,i)=>(
        <div key={i}
          className="electric-line"
          style={{
            top:`${l.top}%`,
            left:`${l.left}%`,
            width:`${l.width}px`,
            '--angle': `${l.angle}deg`,
            '--dur': `${l.duration}s`,
            '--delay': `${l.delay}s`
          }}/>
      ))}

      {/* page */}
      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk"/>
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage('menu')}>
                    First-Time Customer
                  </button>
                  <button className="pill-btn btn-return" onClick={() => setStage('menu')}>
                    Returning Customer
                  </button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}
          {stage === 'menu' && (
            <section className="grid-2">
              <div className="card">
                <h2>Menu</h2>
                <p>Demo menu goes here…</p>
                <button onClick={() => setStage('landing')}>Back</button>
              </div>
              <div className="card">
                <h2>Your Cart</h2>
                <p>Cart UI goes here…</p>
                <button onClick={() => setStage('landing')}>Back</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
