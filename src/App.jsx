import React from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Registration from "./pages/Registration.jsx"
import Returning from "./pages/Returning.jsx"

/** Simple landing with tower hero + route buttons */
function Landing() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <section className="tower-wrap">
        <div className="tower">
          {/* Make sure this exists: /public/assets/kiosk-main.png (or your kiosk image) */}
          <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
          <div className="tower-overlay">
            <button className="pill-btn btn-first" onClick={() => navigate("/register")}>
              First-Time Customer
            </button>
            <button className="pill-btn btn-return" onClick={() => navigate("/returning")}>
              Returning Customer
            </button>
            <div className="tagline-box">Where Dining Meets Technology</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function App(){
  return (
    <>
      {/* Global brand haze and shared UI styles */}
      <style>{`
        :root{
          --bg:#0b1220; --panel:#ffffff; --text:#0b1020;
          --blue:#0ea5e9; --orange:#f97316; --sub:#5f6b85;
          --border:rgba(10,15,30,.12); --radius:18px;
        }
        html{ background:var(--bg); }
        body,#root{ margin:0; background:transparent; color:#eef2ff; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial; }

        /* Subtle glow haze (no grid) */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1000px 700px at 15% 10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 85% 12%, rgba(249,115,22,.24), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.20) 60%),
            var(--bg);
          filter:saturate(1.06);
        }

        .page{ position:relative; z-index:1; padding:28px; }
        .container{ max-width:1100px; margin:0 auto; }
        .card{
          background:var(--panel); color:var(--text);
          border:1px solid var(--border); border-radius:var(--radius);
          padding:18px; box-shadow:0 12px 28px rgba(0,0,0,.18);
        }
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:12px 16px; font-weight:800;
          background:linear-gradient(135deg, var(--blue), var(--orange)); color:#001018;
          box-shadow:0 10px 24px rgba(14,165,233,.28);
        }
        .btn.ghost{
          background:#0c1326; color:#fff; border:1px solid var(--border);
        }
        .btn:disabled{ opacity:.6; cursor:not-allowed }

        /* ===== Tower hero with overlay pills ===== */
        .tower-wrap{ display:flex; justify-content:center; }
        .tower{ position:relative; width:min(460px, 92vw); filter:drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower>img{ display:block; width:100%; height:auto; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .tower-overlay .pill-btn{ pointer-events:auto; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          box-shadow: 0 10px 30px rgba(14,165,233,.28), inset 0 0 0 1px rgba(255,255,255,.22);
          cursor:pointer; transition: transform .08s ease, filter .16s ease;
        }
        .pill-btn:hover{ transform:translateX(-50%) translateY(-1px); filter:saturate(1.06) }
        .btn-first{ top:27%; }
        .btn-return{ top:37%; }

        .tagline-box{
          position:absolute; left:8%; width:84%; bottom:7.5%;
          padding:14px 16px; border-radius:14px;
          background: rgba(11,18,32,.88); color:#fff; font-weight:800; text-align:center;
          border:1px solid rgba(29,161,255,.35);
          box-shadow: 0 6px 18px rgba(0,0,0,.35), inset 0 0 10px rgba(29,161,255,.18);
          backdrop-filter: blur(2px);
        }

        /* Inputs: ensure normal sizing */
        input, textarea, select{ width:100%; min-width:0; box-sizing:border-box; font:inherit; }

        /* Small utility spacing for forms */
        .grid-2{ display:grid; gap:22px; grid-template-columns:1fr 1fr; }
        .row{ display:flex; align-items:center; gap:10px; }
        .kv{ display:grid; gap:6px; }
        .label{ font-size:12px; color:var(--sub) }

        /* Link row (optional top nav) */
        .top-nav{
          display:flex; gap:10px; justify-content:center; margin-bottom:16px;
        }
        .top-nav a{ color:#cfe9ff; text-decoration:none; font-weight:700 }
        .top-nav a:hover{ text-decoration:underline }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      {/* (Optional tiny text links to hop between pages while testing) */}
      <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/returning">Returning</Link>
      </div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/returning" element={<Returning />} />
      </Routes>
    </>
  )
}

