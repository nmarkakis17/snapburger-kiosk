import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220;
          --blue:#0ea5e9; --orange:#f97316;
          --text:#eef2ff; --sub:#b8c2ff;
          --border:#1f2a44; --radius:18px;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; color:var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial; }

        /* Soft blue→orange haze (no grid, no lines) */
        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            var(--sb-bg);
          filter: saturate(1.08);
        }

        .page{ position: relative; z-index: 1; }
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
          cursor:pointer; transition: transform .08s ease, box-shadow .16s ease, filter .16s ease; text-align:center; text-decoration:none;
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

        .footer{ opacity:.9; text-align:center; padding:8px; color:#fff }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <main className="page">
        <div className="container">
          <section className="tower-wrap">
            <div className="tower">
              <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
              <div className="tower-overlay">
                <Link className="pill-btn btn-first"  to="/register">First-Time Customer</Link>
                <Link className="pill-btn btn-return" to="/returning">Returning Customer</Link>
                <div className="tagline-box">Where Dining Meets Technology</div>
              </div>
            </div>
          </section>

          <div className="footer">SnapBurger: Where Dining Meets Technology</div>
        </div>
      </main>
    </>
  )
}
