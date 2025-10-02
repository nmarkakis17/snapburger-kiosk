import React, { useMemo } from "react";

export default function Registration() {
  const lines = useMemo(() => {
    const COUNT = 36;
    const rnd = () => Math.random();
    return Array.from({ length: COUNT }).map(() => ({
      x: 20 + rnd() * 60,
      y: 10 + rnd() * 80,
      len: 140 + rnd() * 320,
      rot: -25 + rnd() * 50,
      delay: -rnd() * 6,
      dur: 1.6 + rnd() * 1.2,
      width: 1 + rnd() * 2,
    }));
  }, []);

  return (
    <div className="wrap">
      <style>{`
        :root {
          --blue:#0ea5e9; --orange:#f97316;
          --border:#1f2a44; --text:#0b1220; --bg:#0b1220;
        }
        html { background: var(--bg); }
        body, #root { background: transparent; margin:0; }

        /* BACKGROUND (z-index 0/1) */
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.85) 45%, transparent 55%);
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
        @keyframes blink { 0%,82%{opacity:0} 85%{opacity:.9} 88%{opacity:0} 96%{opacity:.5} 100%{opacity:0} }

        /* FOREGROUND (z-index 2) */
        .wrap{
          position:relative; z-index: 2;
          max-width:1440px; margin:0 auto; padding:28px;
          display:grid; gap:24px; grid-template-columns: 2fr 1fr;
          align-items:flex-start;
        }
        .panel{ background:#fff; border:1px solid var(--border); border-radius:18px; }
        .form-card{ padding:28px; display:grid; gap:18px; }
        h2{ margin:0; color:var(--blue); }

        .row{
          display:grid;
          grid-template-columns:1fr 1fr;
          column-gap: 96px;  /* plenty of space between columns */
          row-gap:20px;
        }
        .row-3{
          display:grid;
          grid-template-columns:1fr 1fr 1fr;
          column-gap: 80px;
          row-gap:20px;
        }

        label{ font-weight:700; color:var(--blue); }
        input, textarea{
          width:100%; padding:12px; border-radius:12px; border:1px solid var(--border);
          font-size:15px; color:var(--text);
        }
        textarea{ resize:vertical; min-height:80px; }

        .btn-row{ display:flex; gap:14px; justify-content:flex-end; margin-top:18px; }
        .btn{
          padding:12px 20px; border-radius:999px; border:none; font-weight:800; cursor:pointer;
          background:linear-gradient(135deg,var(--blue),var(--orange)); color:#fff;
        }

        .theo-box{
          background:#fff; border:1px solid var(--border); border-radius:18px;
          padding:14px; text-align:center; display:grid; gap:10px; justify-items:center;
        }
        .theo-box img{ width:190px; height:auto; }
        .theo-box p{
          font-size:18px; line-height:1.45; color:var(--blue);
          font-weight:800; margin:0;
          max-width: 360px;
        }

        @media(max-width:1100px){
          .row, .row-3{ column-gap:42px; }
        }
        @media(max-width:900px){
          .wrap{ grid-template-columns:1fr; }
          .row, .row-3{ grid-template-columns:1fr; column-gap:0; }
        }
      `}</style>

      {/* Background */}
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

      {/* Left: Registration form */}
      <div className="panel">
        <div className="form-card">
          <h2>Create Your SnapBurger Account</h2>

          <div className="row">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" placeholder="(555) 555-5555" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Street Address</label>
              <input type="text" placeholder="123 Main St" />
            </div>
            <div>
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>State</label>
              <input type="text" placeholder="State" />
            </div>
            <div>
              <label>Zip Code</label>
              <input type="text" placeholder="12345" />
            </div>
          </div>

          <div>
            <label>Allergies</label>
            <textarea placeholder="List any food allergies" />
          </div>

          <div className="row-3">
            <div>
              <label>Facebook</label>
              <input type="text" placeholder="@facebook" />
            </div>
            <div>
              <label>Instagram</label>
              <input type="text" placeholder="@instagram" />
            </div>
            <div>
              <label>X (Twitter)</label>
              <input type="text" placeholder="@handle" />
            </div>
          </div>

          <div className="row-3">
            <div>
              <label>TikTok</label>
              <input type="text" placeholder="@tiktok" />
            </div>
            <div>
              <label>YouTube</label>
              <input type="text" placeholder="Channel URL" />
            </div>
            <div />
          </div>

          <div className="btn-row">
            <a className="btn" href="/">Cancel</a>
            <button className="btn">Next</button>
          </div>
        </div>
      </div>

      {/* Right: Theo info card */}
      <div className="theo-box">
        <img src="/assets/theo-write.png" alt="Theo mascot" />
        <p>Register today to unlock rewards, get personalized deals, and join the SnapBurger community!</p>
      </div>
    </div>
  );
}
