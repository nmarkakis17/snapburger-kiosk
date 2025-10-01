// src/App.jsx
import React, { useMemo, useState } from 'react'

const ORB_COUNT = 75  // tweak to taste (50–100 looks like the site)

export default function App(){
  const [stage, setStage] = useState('landing') // 'landing' | 'menu'

  // Generate a stable set of randomized fireflies once
  const orbs = useMemo(() => {
    const r = Math.random
    return Array.from({ length: ORB_COUNT }, () => {
      // small, fast fireflies
      const size = 8 + r() * 6          // 8–14px
      const blur = 6 + r() * 5          // 6–11px
      const op = 0.35 + r() * 0.25      // .35–.60
      const amp = 14 + r() * 26         // 14–40px travel amplitude
      const dx0 = (r() * 2 - 1) * amp   // -amp..amp
      const dy0 = (r() * 2 - 1) * amp
      const dx1 = (r() * 2 - 1) * amp
      const dy1 = (r() * 2 - 1) * amp
      const dur = 1.4 + r() * 1.6       // 1.4–3.0s (pretty zippy)
      const delay = -r() * 3            // negative = desync at start
      return {
        x: r() * 100,
        y: r() * 100,
        size, blur, op,
        dx0, dy0, dx1, dy1,
        dur, delay,
      }
    })
  }, [])

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220; --sb-panel:#11172b; --sb-panel-2:#121a33;
          --sb-text:#eef2ff; --sb-subtext:#b8c2ff;
          --sb-accent:#ff7a18; --sb-accent-2:#1da1ff;
          --sb-border:#1f2a44; --radius:18px; --shadow:0 10px 30px rgba(0,0,0,.35);
        }
        html, body, #root { height: 100%; margin:0 }
        html { background:#0b1220; }
        body, #root { background: transparent; }

        /* ===== Haze (like main site) ===== */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            #0b1220;
          background-attachment: fixed,fixed,fixed,fixed,fixed,fixed;
          filter: saturate(1.05);
        }
        .global-haze::after{
          content:""; position:absolute; inset:0;
          background:
            linear-gradient(transparent calc(100% - 1px), rgba(255,255,255,.10) 0) 0 0/100% 28px,
            linear-gradient(90deg, transparent calc(100% - 1px), rgba(255,255,255,.10) 0) 0 0/28px 100%;
          mix-blend-mode: screen; opacity:.35;
        }

        /* ===== Firefly orbs (many, tiny, fast) ===== */
        .sb-orbs{
          position:fixed; inset:0; z-index:1; pointer-events:none; overflow:hidden;
          /* keep the layer visible even over white cards */
          mix-blend-mode: screen;
        }
        .sb-orb{
          position:absolute;
          left:var(--x); top:var(--y);
          width:var(--size); height:var(--size);
          border-radius:50%;
          filter: blur(var(--blur));
          opacity: var(--op);
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.95), rgba(255,255,255,0) 60%);
          transform: translate(-50%,-50%);
          animation:
            move var(--dur) ease-in-out var(--delay) infinite alternate,
            twinkle calc(var(--dur) * .9) ease-in-out var(--delay) infinite alternate;
        }
        @keyframes move {
          0%   { transform: translate(calc(-50% + var(--dx0)), calc(-50% + var(--dy0))); }
          100% { transform: translate(calc(-50% + var(--dx1)), calc(-50% + var(--dy1))); }
        }
        @keyframes twinkle {
          0%   { opacity: calc(var(--op) * .8); }
          100% { opacity: calc(var(--op) * 1.15); }
        }

        /* ===== Foreground layout + cards ===== */
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; display:grid; gap:22px }
        .grid-2{ display:grid; gap:22px; grid-template-columns:1fr 1fr }
        .card{
          background:#ffffff; color:#0b1020;
          border:1px solid rgba(10,15,30,.10);
          border-radius:var(--radius);
          padding:16px; box-shadow:0 12px 28px rgba(0,0,0,.18);
        }
        .row{display:flex;align-items:center;gap:10px}
        .space{display:flex;justify-content:space-between;align-items:center;gap:10px}
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:800;
          background: linear-gradient(135deg, var(--sb-accent), #ff9650); color:#000;
        }
        h1, h2 { color: var(--sb-accent-2); }

        /* ===== Tower + overlay pills ===== */
        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px, 92vw); filter: drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower > img{ display:block; width:100%; height:auto; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .tower-overlay .pill-btn{ pointer-events:auto; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, #0ea5e9, #f97316);
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

        @media (max-width:420px){
          .btn-first  { top: 24%; }
          .btn-return { top: 35.5%; }
          .tagline-box{ bottom: 7%; }
        }
      `}</style>

      {/* Back layers */}
      <div className="global-haze" aria-hidden="true" />
      <div className="sb-orbs" aria-hidden="true">
        {orbs.map((o, i) => (
          <span
            key={i}
            className="sb-orb"
            style={{
              '--x': `${o.x}%`,
              '--y': `${o.y}%`,
              '--size': `${o.size}px`,
              '--blur': `${o.blur}px`,
              '--op': o.op,
              '--dx0': `${o.dx0}px`,
              '--dy0': `${o.dy0}px`,
              '--dx1': `${o.dx1}px`,
              '--dy1': `${o.dy1}px`,
              '--dur': `${o.dur}s`,
              '--delay': `${o.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                {/* Make sure this exists: /public/assets/kiosk-main.png */}
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first"  onClick={() => setStage('menu')}>
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
                <h2 style={{marginTop:0}}>Menu</h2>
                <p className="meta">Demo menu goes here…</p>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
              <div className="card">
                <h2 style={{marginTop:0}}>Your Cart</h2>
                <p className="meta">Cart UI goes here…</p>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
            </section>
          )}

          <div style={{color:'#fff', opacity:.9, textAlign:'center', padding:8}}>
            SnapBurger: Where Dining Meets Technology
          </div>
        </div>
      </div>
    </>
  )
}
