import React from "react";

/**
 * SnapBurger Loyalty Card
 * - Brand gradient + subtle SVG "circuit" background
 * - SnapCoins & SnapCharms badges
 * - Dynamic QR code (qrserver)
 *
 * Props (all optional):
 *   name: string                => default "Theo SnapBurger"
 *   memberId: string            => default "SB-0001-TH"
 *   coins: number               => default 1500
 *   charms: number              => default 3
 *   qrData: string              => default `snapburger://member/SB-0001-TH`
 *   size: "lg" | "md" | "sm"    => default "lg"  (affects pixel dimensions)
 */
export default function LoyaltyCard({
  name = "Theo SnapBurger",
  memberId = "SB-0001-TH",
  coins = 1500,
  charms = 3,
  qrData,
  size = "lg",
}) {
  const qrPayload = qrData || `snapburger://member/${memberId}`;

  // sizing preset
  const SIZES = {
    lg: { w: 760, h: 440, radius: 28, qr: 156, pad: 26, logo: 28, text: 18 },
    md: { w: 620, h: 360, radius: 24, qr: 136, pad: 22, logo: 24, text: 16 },
    sm: { w: 520, h: 300, radius: 20, qr: 120, pad: 18, logo: 22, text: 15 },
  };
  const SZ = SIZES[size] || SIZES.lg;

  // inline SVGs (brand “coin” + “charm” + tiny PCB traces)
  const CoinSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD54F" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#gold)" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#92400E" strokeOpacity=".28" />
      <path d="M9 12h6M12 9v6" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  const CharmSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="charm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <path d="M12 3l3.09 6.26L22 10.27l-5 4.9L18.18 22 12 18.8 5.82 22 7 15.17l-5-4.9 6.91-1.01L12 3z"
            fill="url(#charm)" stroke="#0ea5e9" strokeOpacity=".3"/>
    </svg>
  );

  const CircuitBG = () => (
    <svg
      width="100%" height="100%" viewBox="0 0 760 440" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, opacity: 0.35, mixBlendMode: "screen" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity=".45" />
          <stop offset="1" stopColor="#f97316" stopOpacity=".45" />
        </linearGradient>
      </defs>
      {/* a few angled traces */}
      <g stroke="url(#pcb)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M20 120 L200 80 L320 140 L520 90 L740 140" />
        <path d="M40 260 L180 220 L340 280 L520 230 L700 300" />
        <path d="M60 360 L220 320 L380 360 L540 320 L720 360" />
        {/* short vertical vias */}
        <path d="M200 80 L200 115" />
        <path d="M340 280 L340 240" />
        <path d="M540 90 L540 130" />
      </g>
      {/* tiny glowing nodes */}
      <g fill="#22d3ee">
        <circle cx="200" cy="80" r="3" opacity=".8" />
        <circle cx="340" cy="280" r="3" opacity=".8" />
        <circle cx="540" cy="90" r="3" opacity=".8" />
      </g>
    </svg>
  );

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=${SZ.qr}x${SZ.qr}&data=${encodeURIComponent(
    qrPayload
  )}`;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        .sb-card{
          position: relative;
          width: ${SZ.w}px; height: ${SZ.h}px;
          border-radius: ${SZ.radius}px;
          background: linear-gradient(135deg, #0ea5e9, #f97316);
          box-shadow: 0 24px 60px rgba(14,165,233,.28);
          overflow: hidden;
          color:#001018;
          user-select:none;
        }
        .sb-card::before{
          content:""; position:absolute; inset:-15%;
          background:
            radial-gradient(700px 420px at 12% -10%, rgba(34,211,238,.30), transparent 60%),
            radial-gradient(700px 420px at 92% 0%,   rgba(249,115,22,.26), transparent 60%);
          filter:saturate(1.05);
          opacity:.9;
        }
        .sb-inner{
          position:relative; z-index:2;
          display:grid; grid-template-columns: 1.2fr .9fr; gap:${SZ.pad}px;
          padding:${SZ.pad}px;
          height:100%;
        }
        .sb-left{
          display:flex; flex-direction:column; justify-content:space-between;
          background: rgba(255,255,255,.92);
          border:1px solid rgba(255,255,255,.65);
          border-radius:${SZ.radius - 8}px;
          padding:${SZ.pad}px;
          box-shadow: inset 0 0 0 1px rgba(14,165,233,.08);
        }
        .sb-title{
          display:flex; align-items:center; gap:10px;
          color:#0ea5e9; font-weight:900; letter-spacing:.2px;
          font-size:${SZ.text + 2}px; margin:0 0 2px;
        }
        .sb-sub{ margin:0; color:#0f172a; opacity:.7; font-weight:700; }
        .sb-row{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .sb-kv{ color:#0ea5e9; font-weight:900; }
        .sb-val{ color:#0f172a; font-weight:900; }
        .sb-badges{ display:flex; gap:12px; align-items:center; }
        .chip{
          display:inline-flex; align-items:center; gap:6px;
          background:#fff; border:1px solid #dbeafe; color:#0f172a;
          padding:8px 10px; border-radius:999px; font-weight:900; font-size:${SZ.text - 2}px;
          box-shadow: 0 8px 18px rgba(14,165,233,.18);
        }
        .sb-right{
          display:grid; place-items:center;
          background: rgba(255,255,255,.10);
          border-radius:${SZ.radius - 8}px;
          position:relative; overflow:hidden;
          border:1px solid rgba(255,255,255,.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
        }
        .qr{
          background:#fff; padding:10px; border-radius:14px; border:1px solid #e5e7eb;
          box-shadow: 0 10px 24px rgba(0,0,0,.15);
        }
        .member{
          margin-top:10px; text-align:center; color:#001018; font-weight:900;
          background: rgba(255,255,255,.88); padding:8px 10px; border-radius:10px;
          border:1px solid rgba(0,0,0,.06);
          font-size:${SZ.text - 2}px;
        }
        .theo-wrap{
          position:absolute; right:-12px; bottom:-6px; z-index:3;
          transform: rotate(-2deg);
          pointer-events:none;
        }
        .theo{
          width:${Math.round(SZ.w * 0.42)}px; height:auto;
          filter: drop-shadow(0 18px 30px rgba(0,0,0,.35));
        }
      `}</style>

      <div className="sb-card" role="img" aria-label="SnapBurger Loyalty Card">
        {/* subtle circuit overlay */}
        <CircuitBG />

        <div className="sb-inner">
          <div className="sb-left">
            <div>
              <h3 className="sb-title">
                <img src="/favicon.svg" width={SZ.logo} height={SZ.logo} alt="" />
                SnapBurger Loyalty
              </h3>
              <p className="sb-sub">Where dining meets technology</p>
            </div>

            <div className="sb-badges">
              <span className="chip"><CoinSVG/> {coins.toLocaleString()} SnapCoins</span>
              <span className="chip"><CharmSVG/> {charms} SnapCharms</span>
            </div>

            <div className="sb-row">
              <div className="sb-kv">Member</div>
              <div className="sb-val">{name}</div>
            </div>
            <div className="sb-row">
              <div className="sb-kv">ID</div>
              <div className="sb-val">{memberId}</div>
            </div>
          </div>

          <div className="sb-right">
            <img className="qr" src={qrURL} alt="Member QR code" width={SZ.qr} height={SZ.qr} />
            <div className="member">{memberId}</div>
          </div>
        </div>

        {/* Theo “holding” the card — replace with /assets/theo-hold.png if you have it */}
        <div className="theo-wrap">
          <img
            className="theo"
            src="/assets/theo-hold.png"
            onError={(e) => (e.currentTarget.src = "/assets/theo-write.png")}
            alt="Theo holding the card"
          />
        </div>
      </div>
    </div>
  );
}
