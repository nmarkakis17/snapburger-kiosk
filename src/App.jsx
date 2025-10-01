// src/App.jsx
import React, { useState } from 'react'

export default function App() {
  const [stage, setStage] = useState('landing') // 'landing' | 'menu'

  return (
    <>
      {/* Background layers */}
      <div className="global-haze" aria-hidden="true" />
      <div className="orbs" aria-hidden="true">
        {/* Subtle, floating orbs like the main site */}
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>

      {/* Foreground content */}
      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img
                  src="/assets/kiosk-main.png"
                  alt="SnapBurger Kiosk"
                />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage('menu')}>
                    First-Time Customer
                  </button>
                  <button className="pill-btn btn-return" onClick={() => setStage('menu')}>
                    Returning Customer
                  </button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}

          {stage === 'menu' && (
            <section className="grid-2">
              <div className="card">
                <h2 style={{marginTop:0}}>Menu</h2>
                <p className="meta">Demo menu goes here…</p>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
              <div className="card">
                <h2 style={{marginTop:0}}>Your Cart</h2>
                <p className="meta">Cart UI goes here…</p>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
            </section>
          )}

          <div className="footer">SnapBurger: Where Dining Meets Technology</div>
        </div>
      </div>
    </>
  )
}
