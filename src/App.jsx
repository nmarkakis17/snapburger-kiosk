// src/App.jsx
import React, { useState } from 'react'

export default function App() {
  const [stage, setStage] = useState('landing')

  return (
    <>
      <div className="global-haze" aria-hidden="true" />

      {/* === 50 floating orbs === */}
      <div className="orbs" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
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
                <h2 style={{ marginTop: 0 }}>Menu</h2>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
              <div className="card">
                <h2 style={{ marginTop: 0 }}>Your Cart</h2>
                <button className="btn" onClick={() => setStage('landing')}>Back</button>
              </div>
            </section>
          )}

          <div style={{ color: '#fff', opacity: .9, textAlign: 'center', padding: 8 }}>
            SnapBurger: Where Dining Meets Technology
          </div>
        </div>
      </div>
    </>
  )
}
