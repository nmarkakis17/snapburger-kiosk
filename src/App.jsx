// src/App.jsx
import React from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

// Pages (these files must exist)
import Registration from "./pages/Registration.jsx"
import Returning from "./pages/Returning.jsx"

// Simple landing page (inline)
function Landing() {
  const navigate = useNavigate()
  return (
    <div className="page" style={{ padding: 28 }}>
      <div className="card" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h1 style={{ margin: 0, color: "var(--blue)" }}>Welcome to SnapBurger</h1>
          <p style={{ margin: 8, color: "var(--sub)" }}>
            Where dining meets technology — earn <b style={{ color: "var(--orange)" }}>SnapCoins</b> and{" "}
            <b style={{ color: "var(--orange)" }}>SnapCharms</b> as you go!
          </p>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <button className="btn" onClick={() => navigate("/register")}>
            New Customer
          </button>
          <button className="btn" onClick={() => navigate("/returning")}>
            Returning Customer
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  // just under `export default function App() {`
if (typeof window === "undefined") return null; // SSR safety

  return (
    <>
      {/* —— Global styles —— */}
      <style>{`
        :root{
          --bg:#0b1220;
          --panel:#ffffff;
          --text:#0b1020;
          --blue:#0ea5e9;
          --orange:#f97316;
          --sub:#5f6b85;
          --border:rgba(10,15,30,.12);
          --radius:18px;
        }

        html { background: var(--bg); }
        body, #root { background: transparent; margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial; color:#eef2ff; }

        /* Subtle brand haze (no grid) */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1000px 700px at 15% 10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 85% 12%, rgba(249,115,22,.24), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.20) 60%),
            var(--bg);
          filter: saturate(1.06);
        }

        /* App layer sits above background */
        .page { position:relative; z-index:1; }

        /* Cards & buttons */
        .card{
          background: var(--panel);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
          box-shadow: 0 12px 28px rgba(0,0,0,.18);
        }
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:12px 16px; font-weight:800;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#001018;
          box-shadow: 0 10px 24px rgba(14,165,233,.28);
        }
        .btn:disabled{opacity:.6; cursor:not-allowed}

        /* Inputs: ensure full width (fixes “one-character” issue) */
        input, textarea, select {
          width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box;
          font: inherit;
        }

        /* Checkbox label alignment (used by Registration) */
        .check-row{
          display:flex; align-items:center; gap:8px;
          line-height:1.2;
        }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registration />} />
          {/* Your file is named Returning.jsx */}
          <Route path="/returning" element={<Returning />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
