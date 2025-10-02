import React, { useMemo } from "react";
import { Link } from "react-router-dom";

function BackgroundPulse() {
  const lines = useMemo(() => {
    const COUNT = 34;
    const rnd = () => Math.random();
    return Array.from({ length: COUNT }).map(() => ({
      x: 20 + rnd() * 60,             // center-weighted (20–80%)
      y: 8 + rnd() * 84,              // avoid extreme edges
      len: 120 + rnd() * 300,
      rot: -25 + rnd() * 50,
      delay: -rnd() * 6,
      dur: 1.6 + rnd() * 1.2,
      width: 1 + rnd() * 2,
    }));
  }, []);

  return (
    <>
      <style>{`
        :root { --blue:#0ea5e9; --orange:#f97316; --bg:#0b1220; --border:#1f2a44; }
        html { background: var(--bg); }
        body, #root { background: transparent; margin:0; }

        /* Haze */
        .bg-haze {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.25), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.28), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.22), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.18) 60%),
            var(--bg);
          filter: saturate(1.05);
        }

        /* Custom property to move the highlight smoothly */
        @property --sweep { syntax: '<length>'; inherits: false; initial-value: 0px; }

        .bg-lines { position: fixed; inset: 0; z-index: 1; pointer-events:none; overflow:hidden; }
        .bg-line {
          position: absolute;
          left: var(--x); top: var(--y);
          width: var(--len); height: var(--thick);
          transform: translate(-50%, -50%) rotate(var(--rot));
          border-radius: 999px;
          background:
            linear-gradient(90deg,
              transparent 0,
              rgba(255,255,255,0.08) 20%,
              rgba(255,255,255,0.15) 50%,
              rgba(255,255,255,0.08) 80%,
              transparent 100%);
          filter: drop-shadow(0 0 10px rgba(14,165,233,.15));
          opacity: .85;
          isolation:isolate;
        }
        .bg-line::after{
          content:""; position:absolute; inset:0;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,.85) 45%, transparent 55%);
          mix-blend-mode: screen;
          transform: translateX(calc(var(--sweep) * -1));
          animation: sweep var(--dur) cubic-bezier(.55,.1,.35,.9) var(--delay) infinite;
          will-change: transform;
        }
        .bg-line::before{
          content:""; position:absolute; inset:-6px -10px;
          background:
            radial-gradient(20px 10px at 20% 50%, rgba(14,165,233,.45), transparent 60%),
            radial-gradient(14px 8px at 70% 50%, rgba(249,115,22,.35), transparent 60%);
          opacity: 0;
          animation: blink var(--dur) ease-in-out calc(var(--delay) * 1.1) infinite;
        }
        @keyframes sweep { from { --sweep:-120%; } to { --sweep:120%; } }
        @keyframes blink {
          0%, 82% { opacity: 0; }
          85% { opacity: .9; }
          88% { opacity: 0; }
          96% { opacity: .5; }
          100% { opacity: 0; }
        }

        /* Foreground */
        .page { position: relative; z-index: 2; }
        .container { max-width: 1200px; margin: 0 auto; padding: 28px; }

        /* Tower + buttons */
        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px, 92vw); filter: drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower > img{ display:block; width:100%; height:auto; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:26px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          box-shadow: 0 10px 30px rgba(14,165,233,.28), inset 0 0 0 1px rgba(255,255,255,.22);
          cursor:pointer; transition: transform .08s ease, box-shadow .16s ease, filter .16s ease;
          pointer-events:auto; text-align:center; text-decoration:none;
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

      <div className="bg-haze" aria-hidden="true" />
      <div className="bg-lines" aria-hidden="true">
        {lines.map((l, i) => (
          <span
            key={i}
            className="bg-line"
            style={{
              '--x': `${l.x}%`,
              '--y': `${l.y}%`,
              '--len': `${l.len}px`,
              '--rot': `${l.rot}deg`,
              '--delay': `${l.delay}s`,
              '--dur': `${l.dur}s`,
              '--thick': `${l.width}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <BackgroundPulse />

      <div className="page">
        <div className="container">
          <section className="tower-wrap">
            <div className="tower">
              {/* Ensure this exists in /public/assets/ */}
              <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
              <div className="tower-overlay">
                <Link className="pill-btn btn-first"  to="/register">First-Time Customer</Link>
                <Link className="pill-btn btn-return" to="/register">Returning Customer</Link>
                <div className="tagline-box">Where Dining Meets Technology</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
