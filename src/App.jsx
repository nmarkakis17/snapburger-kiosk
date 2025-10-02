// src/App.jsx
import React, { useMemo, useState } from 'react'

export default function App() {
  // —— Simple stage router: 'landing' | 'register' | 'returning' | 'menu'
  const [stage, setStage] = useState('landing')

  // ===== Registration state =====
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    birthday: '',
    allergies: '',
    preferences: '',
    socials: '',
    referral: '',
    marketingOptIn: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const resetRegistration = () => {
    setStep(1)
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      birthday: '',
      allergies: '',
      preferences: '',
      socials: '',
      referral: '',
      marketingOptIn: true,
    })
  }

  // (Optional) tiny sparkles so the background feels alive
  const sparks = useMemo(
    () => Array.from({ length: 28 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 2 + Math.random() * 2,
      delay: -Math.random() * 6,
      dur: 3 + Math.random() * 3,
    })),
    []
  )

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220; --blue:#0ea5e9; --orange:#f97316;
          --panel:#0b1220; --card:#ffffff; --ink:#0b1020;
          --text:#eef2ff; --muted:#b8c2ff; --border:#1f2a44; --radius:18px;
        }

        html, body, #root { height:100%; }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; color:var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Roboto, "Helvetica Neue", Arial; }

        /* ===== Glowing haze background (like your site) ===== */
        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            var(--sb-bg);
          filter: saturate(1.06);
        }

        /* faint “spark” dots drifting (subtle) */
        @property --tx { syntax:'<length>'; inherits:false; initial-value:0px; }
        @property --ty { syntax:'<length>'; inherits:false; initial-value:0px; }
        .sparks{ position:fixed; inset:0; z-index:0; pointer-events:none; }
        .spark{
          position:absolute;
          left: var(--x); top: var(--y);
          width: var(--d); height: var(--d);
          border-radius:50%;
          background: rgba(255,255,255,.6);
          box-shadow: 0 0 10px rgba(255,255,255,.45), 0 0 22px rgba(14,165,233,.35);
          transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)));
          animation:
            driftX var(--dur) ease-in-out var(--delay) infinite alternate,
            driftY calc(var(--dur) * .9) ease-in-out var(--delay) infinite alternate,
            pulse 1.6s ease-in-out var(--delay) infinite alternate;
          opacity:.65;
        }
        @keyframes driftX { to { --tx: 18px; } }
        @keyframes driftY { to { --ty: -14px; } }
        @keyframes pulse { 0%{opacity:.55} 100%{opacity:.9} }

        /* ===== Foreground layout ===== */
        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; display:grid; gap:22px; }

        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px, 92vw); filter: drop-shadow(0 18px 40px rgba(0,0,0,.45)); }
        .tower > img{ display:block; width:100%; height:auto; border-radius:22px; }
        .tower-overlay{ position:absolute; inset:0; pointer-events:none; }
        .tower-overlay .pill-btn{ pointer-events:auto; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:22px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          box-shadow: 0 10px 30px rgba(14,165,233,.28), inset 0 0 0 1px rgba(255,255,255,.22);
          cursor:pointer; transition: transform .08s ease, filter .12s ease;
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

        @media (max-width:420px){
          .btn-first  { top: 24%; }
          .btn-return { top: 35.5%; }
          .tagline-box{ bottom: 7%; }
        }

        /* ===== Generic cards / buttons ===== */
        .grid-2{ display:grid; gap:22px; grid-template-columns:1fr 1fr; }
        .card{
          background: var(--card); color: var(--ink);
          border:1px solid rgba(10,15,30,.10);
          border-radius: var(--radius); padding:18px;
          box-shadow: 0 12px 28px rgba(0,0,0,.18);
        }
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:800;
          background: linear-gradient(135deg, var(--orange), #ff9b53); color:#000;
        }
        .ghost{ background: rgba(255,255,255,.9); color:#111; border:1px solid #eee; }

        /* ===== Registration layout ===== */
        .reg-wrap{ display:flex; justify-content:center; }
        .reg-card{
          width:min(720px, 95vw);
          background: var(--card); color: var(--ink);
          border:1px solid rgba(10,15,30,.10);
          border-radius: 22px; box-shadow:0 12px 30px rgba(0,0,0,.2);
          overflow:hidden;
        }
        .reg-header{
          display:flex; gap:14px; align-items:center;
          background: linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.18));
          border-bottom:1px solid rgba(10,15,30,.12);
          padding:14px 16px;
        }
        .reg-header img{ width:64px; height:64px; object-fit:contain; filter: drop-shadow(0 6px 16px rgba(14,165,233,.35)); }
        .reg-title{ margin:0; font-size:22px; color:#0f172a; }
        .reg-sub{ margin:0; color:#4b5563; font-weight:600 }

        .reg-body{ padding:16px; display:grid; gap:12px; }
        .row{ display:grid; gap:12px; grid-template-columns:1fr 1fr; }
        .row-3{ display:grid; gap:12px; grid-template-columns:2fr 1fr 1fr; }
        .full{ grid-column: 1 / -1; }
        label{ font-size:12px; color:#51607a; font-weight:700; }
        input, textarea, select{
          width:100%; padding:10px 12px; border-radius:12px;
          border:1px solid var(--border); background:#f9fbff; color:#0b1020;
        }
        textarea{ min-height:88px; resize:vertical; }
        .nav{ display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:6px; }
        .small{ font-size:12px; color:#64748b; }

        .stepper{
          display:flex; gap:8px; align-items:center;
          padding:10px 16px; border-top:1px solid rgba(10,15,30,.1);
          background:#fff;
        }
        .dot{ width:10px; height:10px; border-radius:50%; background:#e5e7eb; }
        .dot.active{ background: linear-gradient(135deg, var(--blue), var(--orange)); }

        .footer{ text-align:center; opacity:.9; padding:10px; }
      `}</style>

      {/* Background */}
      <div className="global-haze" aria-hidden="true" />
      <div className="sparks" aria-hidden="true">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="spark"
            style={{
              '--x': `${s.x}%`,
              '--y': `${s.y}%`,
              '--d': `${s.d}px`,
              '--delay': `${s.delay}s`,
              '--dur': `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="page">
        <div className="container">
          {/* ——— Landing ——— */}
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => { resetRegistration(); setStage('register') }}>
                    First-Time Customer
                  </button>
                  <button className="pill-btn btn-return" onClick={() => setStage('returning')}>
                    Returning Customer
                  </button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}

          {/* ——— Registration ——— */}
          {stage === 'register' && (
            <section className="reg-wrap">
              <div className="reg-card">
                <div className="reg-header">
                  <img src="/assets/theo-write.png" alt="Theo writing" />
                  <div>
                    <h3 className="reg-title">Join SnapBurger Rewards</h3>
                    <p className="reg-sub">Earn points, unlock perks, and personalize your experience.</p>
                  </div>
                </div>

                <div className="reg-body">
                  {step === 1 && (
                    <>
                      <div className="row">
                        <div>
                          <label>Name</label>
                          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
                        </div>
                        <div>
                          <label>Birthday</label>
                          <input name="birthday" value={form.birthday} onChange={handleChange} placeholder="MM/DD" />
                        </div>
                      </div>
                      <div className="row">
                        <div>
                          <label>Email Address</label>
                          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <input name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 555-5555" />
                        </div>
                      </div>
                      <div className="nav">
                        <button className="ghost" onClick={() => setStage('landing')}>Back</button>
                        <button className="btn" onClick={() => setStep(2)}>Next</button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="full">
                        <label>Street Address</label>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="123 Burger Lane" />
                      </div>
                      <div className="row-3">
                        <div>
                          <label>City</label>
                          <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                        </div>
                        <div>
                          <label>State</label>
                          <input name="state" value={form.state} onChange={handleChange} placeholder="ST" />
                        </div>
                        <div>
                          <label>ZIP</label>
                          <input name="zip" value={form.zip} onChange={handleChange} placeholder="12345" />
                        </div>
                      </div>
                      <div className="nav">
                        <button onClick={() => setStep(1)}>Back</button>
                        <button className="btn" onClick={() => setStep(3)}>Next</button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="row">
                        <div className="full">
                          <label>Allergies / Dietary Notes</label>
                          <textarea name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g., peanuts, gluten-free, vegetarian" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="full">
                          <label>Flavor Preferences</label>
                          <textarea name="preferences" value={form.preferences} onChange={handleChange} placeholder="Spicy? Extra crispy? No pickles?" />
                        </div>
                      </div>
                      <div className="nav">
                        <button onClick={() => setStep(2)}>Back</button>
                        <button className="btn" onClick={() => setStep(4)}>Next</button>
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="row">
                        <div className="full">
                          <label>Social Media (for extra rewards)</label>
                          <input name="socials" value={form.socials} onChange={handleChange} placeholder="@handle(s)" />
                        </div>
                      </div>
                      <div className="row">
                        <div>
                          <label>Referral Code (optional)</label>
                          <input name="referral" value={form.referral} onChange={handleChange} placeholder="ABC123" />
                        </div>
                        <div style={{display:'flex', alignItems:'flex-end', gap:8}}>
                          <input id="mkt" type="checkbox" name="marketingOptIn" checked={form.marketingOptIn} onChange={handleChange} />
                          <label htmlFor="mkt" className="small">Send me points boosts & SnapBurger news</label>
                        </div>
                      </div>
                      <div className="nav">
                        <button onClick={() => setStep(3)}>Back</button>
                        <button className="btn" onClick={() => setStep(5)}>Review</button>
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <div className="full">
                        <label>Review</label>
                        <div className="card" style={{background:'#f7fafc', borderRadius:12}}>
                          <pre style={{margin:0, whiteSpace:'pre-wrap'}}>{JSON.stringify(form, null, 2)}</pre>
                        </div>
                      </div>
                      <div className="nav">
                        <button onClick={() => setStep(4)}>Back</button>
                        <button
                          className="btn"
                          onClick={() => {
                            // TODO: send to Supabase or your API
                            alert('Registered! (stub)')
                            setStage('menu')
                          }}
                        >
                          Finish & Continue
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* stepper dots */}
                <div className="stepper">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={`dot ${step===n?'active':''}`} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ——— Returning (placeholder) ——— */}
          {stage === 'returning' && (
            <section className="grid-2">
              <div className="card">
                <h2 style={{marginTop:0}}>Returning Customer</h2>
                <p className="muted">Sign in with your email or phone (stub for now).</p>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
            </section>
          )}

          {/* ——— Menu (placeholder) ——— */}
          {stage === 'menu' && (
            <section className="grid-2">
              <div className="card">
                <h2 style={{marginTop:0}}>Menu</h2>
                <p className="muted">Your real menu would be loaded here…</p>
                <button className="btn" onClick={() => setStage('landing')}>Back to Start</button>
              </div>
              <div className="card">
                <h2 style={{marginTop:0}}>Cart</h2>
                <p className="muted">Cart UI placeholder…</p>
                <button className="btn">Place Order</button>
              </div>
            </section>
          )}

          <div className="footer">SnapBurger · Where Dining Meets Technology</div>
        </div>
      </div>
    </>
  )
}
