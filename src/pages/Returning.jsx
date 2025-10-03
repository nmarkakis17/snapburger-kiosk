// src/pages/Returning.jsx
import React from "react"

export default function Returning() {
  const LOYALTY_IMG = "/assets/loyalty-card.png"
  const THEO_POINT_IMG = "/assets/theo-pointdown.png"

  return (
    <>
      <style>{`
        :root{
          --bg:#0b1220;
          --panel:#ffffff;
          --text:#0b1020;
          --blue:#0ea5e9;
          --orange:#f97316;
          --sub:#5f6b85;
          --border:rgba(10,15,30,.12);
          --radius:14px;
        }
        .page{ position:relative; z-index:1; padding:18px 12px; display:grid; place-items:center; }

        .wrap{
          width: min(800px, 94vw);
          display:grid;
          gap:16px;
        }

        .card{
          background:var(--panel);
          color:var(--text);
          border:1px solid var(--border);
          border-radius:var(--radius);
          padding:14px;
          box-shadow: 0 8px 18px rgba(0,0,0,.14);
        }

        .headline{
          font-size:18px;
          font-weight:800;
          text-align:center;
          margin-bottom:8px;
        }
        .headline span{ color:var(--orange); }

        .btn{
          cursor:pointer; border:none; border-radius:10px; padding:9px 14px; font-weight:700;
          background:linear-gradient(135deg, var(--blue), var(--orange)); color:#001018;
          box-shadow:0 6px 14px rgba(14,165,233,.25);
          text-decoration:none;
          font-size:14px;
        }

        input{
          width:100%; min-width:0; box-sizing:border-box;
          background:#fff; color:var(--text);
          border:1px solid var(--border); border-radius:10px;
          padding:7px 10px; font:inherit; font-size:14px;
        }
        .label{ font-size:12px; font-weight:700; color:var(--blue); margin-bottom:3px }

        .hero{
          display:grid; justify-items:center; gap:8px;
        }
        .hero img{
          width:min(360px, 86vw);
          height:auto; display:block; border-radius:12px;
          box-shadow:0 10px 20px rgba(0,0,0,.25);
        }

        .cols{
          display:grid; gap:14px; grid-template-columns: 1fr 1fr;
        }
        .mini-title{ margin:0 0 6px 0; color:var(--blue); font-size:15px; }
        .row{ display:flex; gap:8px; align-items:center }

        .scan{
          display:grid; gap:10px; justify-items:center; text-align:center;
        }
        .theo{
          width:95px; height:auto; display:block;
          filter: drop-shadow(0 5px 12px rgba(0,0,0,.25));
        }
        .scan-well{
          width: min(260px, 76%);
          height: 120px;
          border-radius: 12px;
          border:1px dashed var(--border);
          display:grid; place-items:center;
          background: #fafafa;
        }

        .form{
          display:grid; gap:8px;
        }

        @media (max-width: 760px){
          .cols{ grid-template-columns: 1fr; }
          .scan-well{ width:100%; }
        }
      `}</style>

      <div className="page">
        <div className="wrap">
          {/* Headline */}
          <div className="headline">
            Welcome back to <span>SnapBurger</span>! Scan your card or enter your information to continue.
          </div>

          {/* Loyalty card */}
          <div className="hero">
            <img src={LOYALTY_IMG} alt="SnapBurger Loyalty Card" />
          </div>

          {/* Two cards */}
          <div className="cols">
            {/* Left: Scan */}
            <div className="card scan">
              <h3 className="mini-title">Scan Your Loyalty Card Below</h3>
              <img className="theo" src={THEO_POINT_IMG} alt="Theo pointing down" />
              <div className="row" style={{ justifyContent: "center" }}>
                <button className="btn" onClick={() => alert("Scanner stub")}>Start Scan</button>
              </div>
            </div>

            {/* Right: Manual entry */}
            <div className="card form">
              <h3 className="mini-title">Enter Your Information</h3>
              <div>
                <div className="label">Phone number</div>
                <input placeholder="(555) 555-5555" />
              </div>
              <div>
                <div className="label">Email address</div>
                <input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <div className="label">Loyalty number</div>
                <input placeholder="SNAP-000000" />
              </div>

              <div className="row" style={{ justifyContent: "flex-end", marginTop: 6 }}>
                <a className="btn" href="/">Cancel</a>
                <button className="btn" onClick={() => alert("Continue stub")}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
