import React from 'react'

export default function Returning(){
  return (
    <>
      <style>{`
        :root{
          --blue:#1da1ff; --orange:#f97316; --bg:#0b1220;
          --border:#1f2a44; --radius:18px;
        }
        html { background: var(--bg); }
        body, #root { background: transparent; margin:0; color:#eef2ff; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial; }

        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            var(--bg);
          filter: saturate(1.08);
        }

        .page{ position:relative; z-index:1 }
        .container{ max-width:1100px; margin:0 auto; padding:28px }

        .card{
          background:#fff;color:#0b1020;border:1px solid rgba(10,15,30,.1);
          border-radius:18px; padding:16px; box-shadow:0 14px 28px rgba(0,0,0,.25);
        }
        .grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:18px; align-items:start }

        .title{ font-weight:900; font-size:22px; color:var(--blue); margin:0 0 8px }
        .sub{ color:#51607a; margin:0 0 12px }

        .bigImg{ display:block; width:100%; max-width:520px; height:auto; margin:0 auto 16px; border-radius:14px; box-shadow: 0 12px 24px rgba(0,0,0,.35) }
        .box{ min-height: 220px }
        .row{ display:flex; align-items:center; gap:8px; margin-bottom:10px }
        .input{ width:100%; padding:10px 12px; border-radius:12px; border:1px solid #d1d8e6; }
        .btn{ cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:900;
              background:linear-gradient(135deg,var(--blue),var(--orange)); color:#0b0e14 }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <main className="page">
        <div className="container">
          <img className="bigImg" src="/assets/loyalty-card.png" alt="SnapBurger Loyalty Card" />

          <div className="grid-2">
            <div className="card box" style={{display:'grid', gap:12, justifyItems:'center', textAlign:'center'}}>
              <div className="title">Scan Your Loyalty Card Below</div>
              <img src="/assets/theo-point-down.png" alt="Theo pointing down" style={{ width:170, height:'auto' }} />
              <div className="sub">Place your card under the scanner</div>
              <button className="btn">Simulate Scan</button>
            </div>

            <div className="card box" style={{display:'grid', gap:10}}>
              <div className="title">Enter Your Information Below</div>
              <div className="row"><span style={{minWidth:110}}>Phone</span><input className="input" placeholder="(555) 555-5555" /></div>
              <div className="row"><span style={{minWidth:110}}>Email</span><input className="input" placeholder="you@example.com" /></div>
              <div className="row"><span style={{minWidth:110}}>Loyalty #</span><input className="input" placeholder="SB-XXXX-XXXX" /></div>
              <div style={{display:'flex', gap:10, justifyContent:'flex-end', marginTop:6}}>
                <a className="btn" href="/">Back</a>
                <button className="btn">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
