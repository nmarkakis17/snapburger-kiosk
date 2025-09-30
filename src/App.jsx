import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar.jsx"

export default function App() {
  return (
    <>
      <style>{`
        :root {
          --cyan:#06b6d4; --teal:#22d3ee; --blue:#0ea5e9;
          --orange:#f97316; --slate:#0f172a;
        }
        html { background:#0b1220; }
        body, #root { background: transparent; }

        /* ===== Haze background ===== */
        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%, rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            #0b1220;
          background-attachment: fixed, fixed, fixed, fixed, fixed, fixed;
          filter: saturate(1.08);
        }
        .global-haze::after{
          content:""; position:absolute; inset:0;
          background:
            linear-gradient(transparent 95%, rgba(255,255,255,.06) 95%) 0 0/ 100% 28px,
            linear-gradient(90deg, transparent 95%, rgba(255,255,255,.06) 95%) 0 0/ 28px 100%;
          mix-blend-mode: screen; opacity: .22;
        }

        /* ===== Floating orbs ===== */
        .orbs{
          position: fixed; inset: 0;
          z-index: 1; pointer-events: none;
        }
        .orbs span{
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: .35;
          background: radial-gradient(circle at 40% 40%, rgba(14,165,233,.9), rgba(14,165,233,0) 68%);
          animation: floatY 18s ease-in-out infinite alternate,
                     floatX 26s ease-in-out infinite alternate;
        }
        .orbs span:nth-child(2n){
          background: radial-gradient(circle at 40% 40%, rgba(249,115,22,.9), rgba(249,115,22,0) 68%);
        }

        /* Orb positions */
        .orbs span:nth-child(1){ top:6%; left:6%; }
        .orbs span:nth-child(2){ top:18%; right:8%; }
        .orbs span:nth-child(3){ bottom:14%; left:12%; }
        .orbs span:nth-child(4){ bottom:10%; right:14%; }
        .orbs span:nth-child(5){ top:50%; left:40%; }
        .orbs span:nth-child(6){ top:8%; right:35%; }
        .orbs span:nth-child(7){ bottom:6%; left:46%; }
        .orbs span:nth-child(8){ top:30%; left:16%; }

        @keyframes floatY { 0%{transform:translateY(0)} 100%{transform:translateY(-22px)} }
        @keyframes floatX { 0%{transform:translateX(0)} 100%{transform:translateX(18px)} }

        /* Page content above bg layers */
        .page { position: relative; z-index: 2; }
      `}</style>

      {/* Background layers */}
      <div className="global-haze" aria-hidden="true" />
      <div className="orbs" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      {/* Content */}
      <NavBar />
      <main className="page">
        <Outlet />
      </main>
    </>
  )
}
