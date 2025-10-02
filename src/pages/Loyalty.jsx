import React from "react";
import LoyaltyCard from "../components/LoyaltyCard.jsx";

export default function Loyalty() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b1220" }}>
      <style>{`
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.24), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.26), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.22), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.14), rgba(249,115,22,.14) 60%),
            #0b1220;
          filter:saturate(1.05);
        }
        .wrap{
          position:relative; z-index:1;
          display:grid; place-items:center;
          padding: 60px 20px;
        }
        h1{
          color:#0ea5e9; margin: 0 0 16px; font-size: 28px; text-align:center; font-weight:900;
        }
        p{ color:#b8c2ff; text-align:center; margin:0 0 26px; }
      `}</style>

      <div className="global-haze" aria-hidden="true" />
      <div className="wrap">
        <div>
          <h1>Your SnapBurger Loyalty</h1>
          <p>Show this at the kiosk, earn SnapCoins & collect SnapCharms.</p>
        </div>

        <LoyaltyCard
          name="Theo SnapBurger"
          memberId="SB-0001-TH"
          coins={2150}
          charms={5}
          // qrData="https://snapburger.netlify.app/member/SB-0001-TH"
          size="lg"
        />
      </div>
    </div>
  );
}
