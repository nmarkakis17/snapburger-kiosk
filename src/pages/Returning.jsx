import React, { useState } from "react"

export default function Returning(){
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loyalty, setLoyalty] = useState("")

  return (
    <>
      <style>{`
        .wrap{ max-width:1100px; margin:0 auto; display:grid; gap:22px; }
        .hero-card{ background:#fff; color:#0b1020; border:1px solid rgba(10,15,30,.12); border-radius:18px; padding:16px; box-shadow:0 12px 28px rgba(0,0,0,.18); }
        .grid-2{ display:grid; gap:22px; grid-template-columns: 1fr 1fr; }
        .card{ background:#fff; color:#0b1020; border:1px solid rgba(10,15,30,.12); border-radius:18px; padding:16px; box-shadow:0 12px 28px rgba(0,0,0,.18); }
        .title{ margin:0 0 8px; color:#0ea5e9; }
        .row{ display:grid; gap:10px; }
        input{ width:100%; padding:10px 12px; border:1px solid rgba(10,15,30,.12); border-radius:12px; background:#f8f9ff; color:#0b1020; }
        .btn{ cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:800; background:linear-gradient(135deg, #0ea5e9, #f97316); color:#001018; }
        .btn.ghost{ background:#0c1326; color:#fff; border:1px solid rgba(10,15,30,.12); }
      `}</style>

      <div className="page container">
        <div className="wrap">
          {/* Loyalty card preview */}
          <div className="hero-card" style={{ textAlign:"center" }}>
            {/* Place your generated card: /public/assets/loyalty-card.png */}
            <img src="/assets/loyalty-card.png" alt="SnapBurger Loyalty Card" style={{ width:"min(780px, 96%)", height:"auto" }} />
          </div>

          <div className="grid-2">
            {/* Left: Scan box with Theo pointing down */}
            <div className="card" style={{ display:"grid", gap:12, justifyItems:"center" }}>
              <h3 className="title">Scan Your Loyalty Card Below</h3>
              {/* Theo pointing down: /public/assets/theo-point.png */}
              <img src="/assets/theo-point.png" alt="Theo pointing down" style={{ maxWidth:260 }} />
              <div className="row" style={{ textAlign:"center", color:"#5f6b85" }}>
                Place your card near the scanner to sign in instantly.
              </div>
              <button className="btn ghost" onClick={()=>window.history.back()}>Back</button>
            </div>

            {/* Right: Manual entry */}
            <div className="card" style={{ display:"grid", gap:12 }}>
              <h3 className="title">Enter Your Information Below</h3>
              <div className="row">
                <label className="label" style={{ color:"#5f6b85" }}>Phone Number</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(555) 555-5555" />
              </div>
              <div className="row">
                <label className="label" style={{ color:"#5f6b85" }}>Email Address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="row">
                <label className="label" style={{ color:"#5f6b85" }}>Loyalty Number</label>
                <input value={loyalty} onChange={(e)=>setLoyalty(e.target.value)} placeholder="e.g. 000123456" />
              </div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <a href="/" className="btn ghost">Cancel</a>
                <button className="btn" onClick={()=>alert("Signed in (demo)")}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
