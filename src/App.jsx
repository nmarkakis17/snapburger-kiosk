import React, { useState } from 'react'

export default function App() {
  const [stage, setStage] = useState('landing') // 'landing' | 'menu'

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b0f1e;
          --blue:#0ea5e9; --orange:#f97316;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; }

        /* Back-most haze layer (nice but not critical) */
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
        .global-haze::after{
          content:""; position:absolute; inset:0;
          background:
            linear-gradient(transparent calc(100% - 1px), rgba(255,255,255,.10) 0) 0 0/100% 28px,
            linear-gradient(90deg, transparent calc(100% - 1px), rgba(255,255,255,.10) 0) 0 0/28px 100%;
          mix-blend-mode: screen; opacity:.55;
        }

        /* Content sits above haze */
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; }

        /* Tower + overlay pills */
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
        .btn-first  { top:27%; }
        .btn-return { top:37%; }

        .tagline-box{
          position:absolute; left:8%; width:84%; bottom:7.5%;
          padding:14px 16px; border-radius:14px;
          background: rgba(11,18,32,.88); color:#fff; font-weight:800; text-align:center;
          border:1px solid rgba(29,161,255,.35);
          box-shadow: 0 6px 18px rgba(0,0,0,.35), inset 0 0 10px rgba(29,161,255,.18);
          backdrop-filter: blur(2px); pointer-events:none;
        }

        @media (max-width:420px){
          .btn-first  { top:24%; }
          .btn-return { top:35.5%; }
          .tagline-box{ bottom:7%; }
        }

        /* Demo cards for the "menu" stage */
        .grid-2{ display:grid; gap:22px; grid-template-columns:1fr 1fr; }
        .card{
          background:#ffffff; color:#0b1020;
          border:1px solid rgba(10,15,30,.10);
          border-radius:18px; padding:16px;
          box-shadow:0 12px 28px rgba(0,0,0,.18);
        }
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:700;
          background: linear-gradient(135deg, var(--orange), #ff9b53); color:#000;
        }

        /* ========= NUCLEAR DEBUG ORBS =========
           Force them ABOVE EVERYTHING, no blend, no blur, solid colors.
           If you don't see these, something is covering the whole page. */
        .orbs-debug{
          position:fixed; inset:0;
          z-index: 2147483647; /* max int-ish */
          pointer-events:none;
        }
        .orbs-debug span{
          position:absolute; border-radius:50%;
          width: 420px; height: 420px;
          background: rgba(0,255,0,0.45); /* solid green disk */
          /* no blur, no blend, just obvious */
        }
        .orbs-debug span:nth-child(2){ background: rgba(255,0,0,0.45); }
        .orbs-debug span:nth-child(3){ background: rgba(0,128,255,0.45); }
        .orbs-debug span:nth-child(4){ background: rgba(255,165,0,0.45); }

        .orbs-debug span:nth-child(1){ top:6%; left:6%; }
        .orbs-debug span:nth-child(2){ top:18%; right:8%; }
        .orbs-debug span:nth-child(3){ bottom:14%; left:12%; }
        .orbs-debug span:nth-child(4){ bottom:10%; right:14%; }
      `}</style>

      {/* Back layer */}
      <div className="global-haze" aria-hidden="true" />

      {/* Foreground content */}
      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
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

      {/* ====== NUCLEAR DEBUG ORBS (rendered last so they're most on top) ====== */}
      <div className="orbs-debug" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
    </>
  )
}
