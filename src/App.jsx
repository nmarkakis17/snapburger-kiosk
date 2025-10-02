// src/App.jsx
import React, { useState } from 'react'
import Registration from './Registration.jsx'

export default function App() {
  const [stage, setStage] = useState('landing') 
  // landing | new | returning | menu

  return (
    <>
      <style>{`
        :root { --blue:#0ea5e9; --orange:#f97316; --sb-bg:#0b1220; }
        html { background: var(--sb-bg); }
        body,#root { margin:0; background:transparent; }

        .page{ position:relative; z-index:2; }
        .container{ max-width:1100px; margin:0 auto; padding:28px; color:white; }

        .tower-wrap{ display:flex; justify-content:center; padding:8px 0; }
        .tower{ position:relative; width:min(460px,92vw); }
        .tower > img{ width:100%; border-radius:22px; }

        .pill-btn{
          position:absolute; left:50%; transform:translateX(-50%);
          width:70%; padding:22px 0; border-radius:9999px; border:none;
          font-weight:900; font-size:18px; color:#0b0e14;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          cursor:pointer;
        }
        .btn-first{ top:28%; }
        .btn-return{ top:38%; }

        /* Returning layout */
        .returning-wrap{
          display:flex; flex-direction:column; align-items:center; gap:24px;
        }
        .returning-card{
          width:min(500px,90vw); box-shadow:0 10px 25px rgba(0,0,0,.45);
          border-radius:18px; overflow:hidden;
        }
        .returning-card img{ width:100%; display:block; }

        .returning-options{
          display:grid; grid-template-columns:1fr 1fr; gap:24px;
          width:100%; max-width:900px;
        }
        .option-box{
          background:white; color:#0b1220;
          border-radius:16px; padding:20px; text-align:center;
          box-shadow:0 8px 18px rgba(0,0,0,.25);
        }
        .option-box h2{ margin:0 0 12px; color:var(--blue); }
        .option-box img{ width:120px; margin:0 auto 12px; display:block; }

        .input-group{ display:flex; flex-direction:column; gap:12px; margin-top:8px; }
        .input-group input{
          padding:10px 14px; border:1px solid #ccc; border-radius:12px;
        }
      `}</style>

      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk"/>
                <button className="pill-btn btn-first" onClick={() => setStage('new')}>
                  First-Time Customer
                </button>
                <button className="pill-btn btn-return" onClick={() => setStage('returning')}>
                  Returning Customer
                </button>
              </div>
            </section>
          )}

          {stage === 'new' && <Registration onBack={() => setStage('landing')} />}

          {stage === 'returning' && (
            <section className="returning-wrap">
              <div className="returning-card">
                <img src="/assets/loyalty-card.png" alt="Loyalty Card"/>
              </div>
              <div className="returning-options">
                <div className="option-box">
                  <h2>Scan Your Loyalty Card Below</h2>
                  <img src="/assets/theo-point.png" alt="Theo Pointing"/>
                </div>
                <div className="option-box">
                  <h2>Enter Your Information Below</h2>
                  <div className="input-group">
                    <input type="text" placeholder="Phone Number"/>
                    <input type="email" placeholder="Email Address"/>
                    <input type="text" placeholder="Loyalty Number"/>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
