// src/App.jsx
import React, { useMemo } from 'react'


const ORB_COUNT = 90 // change to ~75 if you want

export default function App(){
  // Generate a stable set of random orbs once
  const orbs = useMemo(() => {
    const rnd = () => Math.random()
    return Array.from({ length: ORB_COUNT }).map(() => ({
      x: rnd() * 100,             // initial left % of viewport
      y: rnd() * 100,             // initial top  % of viewport
      size: 9 + rnd() * 6,        // 9–15px
      blur: 8 + rnd() * 6,        // 8–14px
      op: 0.35 + rnd() * 0.25,    // 0.35–0.60
      dx: 14 + rnd() * 18,        // horizontal drift 14–32px
      dy: 14 + rnd() * 18,        // vertical drift   14–32px
      durX: 2.2 + rnd() * 2.0,    // 2.2–4.2s
      durY: 2.0 + rnd() * 2.0,    // 2.0–4.0s
      delay: -rnd() * 3           // negative stagger so they start offset
    }))
  }, [])

  return (
    <>
      <style>{`
        :root {
          --cyan:#06b6d4; --teal:#22d3ee; --blue:#0ea5e9; --orange:#f97316; --slate:#0f172a;
        }
        html { background:#0b1220; }
        body, #root { background: transparent; }

        /* Site-wide blue→orange haze (unchanged) */
        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%, rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            #0b1220;
          background-attachment: fixed,fixed,fixed,fixed,fixed,fixed;
          filter: saturate(1.08);
        }
        .global-haze::after{
          content:""; position:absolute; inset:0;
          background:
            linear-gradient(transparent 95%, rgba(255,255,255,.06) 95%) 0 0/ 100% 28px,
            linear-gradient(90deg, transparent 95%, rgba(255,255,255,.06) 95%) 0 0/ 28px 100%;
          mix-blend-mode: screen; opacity: .22;
        }

        /* ====== Firefly orbs (unique classes to avoid conflicts) ====== */
        .sb-orbs{
          position: fixed; inset: 0;
          z-index: 1;              /* haze:0, orbs:1, app:2 */
          pointer-events: none;
          overflow: hidden;
        }

        /* Enable animatable custom properties for X/Y drift */
        @property --tx { syntax: '<length>'; inherits: false; initial-value: 0px; }
        @property --ty { syntax: '<length>'; inherits: false; initial-value: 0px; }

        .sb-orb{
          position: absolute;
          left: var(--x);
          top:  var(--y);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          filter: blur(var(--blur));
          opacity: var(--op);
          mix-blend-mode: screen;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.95), rgba(255,255,255,0) 60%);
          transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)));

          /* independent X/Y motion + twinkle */
          animation:
            sb-tx var(--durX) ease-in-out var(--delay) infinite alternate,
            sb-ty var(--durY) ease-in-out var(--delay) infinite alternate,
            sb-twinkle calc(var(--durX) * .75) ease-in-out var(--delay) infinite alternate;
        }

        @keyframes sb-tx { to { --tx: var(--dx); } }
        @keyframes sb-ty { to { --ty: var(--dy); } }
        @keyframes sb-twinkle {
          0%   { opacity: calc(var(--op) * .85); }
          100% { opacity: calc(var(--op) * 1.15); }
        }

        /* All routed content sits above */
        .page { position: relative; z-index: 2; }

        /* Mobile CTA (unchanged) */
        .mobile-cta{ display:none; }
        @media (max-width: 640px){
          nav{ display:flex; gap:8px; overflow-x:auto; padding:0 8px; -webkit-overflow-scrolling:touch }
          .navlink{ padding:10px 12px; font-weight:800; min-width:max-content }
          .hero{ padding:16px }
          .logo{ width:min(160px, 60vw) }
          .title{ font-size: clamp(24px, 7vw, 36px) }
          .subtitle{ font-size: clamp(14px, 4vw, 18px) }
          .ctaRow .btn{ width:100%; justify-content:center }
          .stats{ grid-template-columns: 1fr }
          .cards{ grid-auto-flow: column; grid-template-columns: repeat(4, 80vw); overflow-x:auto; scroll-snap-type:x proximity; gap:12px; padding-bottom:6px }
          .card{ scroll-snap-align:center }
          .step-img{ height: clamp(140px, 45vw, 220px) }
          .gallery{ grid-template-columns: 1fr }
          .gallery img{ height: clamp(200px, 60vw, 320px) }
          .pulse{ width:104px; height:104px }
          .mobile-cta{
            position:fixed; left:12px; right:12px;
            bottom: calc(12px + env(safe-area-inset-bottom));
            background: linear-gradient(135deg, #0ea5e9, #f97316);
            color:#fff; text-align:center; font-weight:900;
            padding:14px 16px; border-radius:999px; z-index:1000;
            box-shadow:0 10px 30px rgba(14,165,233,.28)
          }
        }
      `}</style>

      {/* Haze behind all content */}
      <div className="global-haze" aria-hidden="true" />

      {/* Fireflies layer */}
      <div className="sb-orbs" aria-hidden="true">
        {orbs.map((o, i) => (
          <span
            key={i}
            className="sb-orb"
            style={{
              // CSS custom props per orb
              '--x': `${o.x}%`,
              '--y': `${o.y}%`,
              '--size': `${o.size}px`,
              '--blur': `${o.blur}px`,
              '--op': o.op,
              '--dx': `${o.dx}px`,
              '--dy': `${o.dy}px`,
              '--durX': `${o.durX}s`,
              '--durY': `${o.durY}s`,
              '--delay': `${o.delay}s`,
            }}
          />
        ))}
      </div>

      </main>
      <a href="/menu" className="mobile-cta">Order Now</a>
    </>
  )
}
