// src/App.jsx
import React, { useState, useEffect } from 'react'

export default function App() {
  const [stage, setStage] = useState('landing')

  useEffect(() => {
    const spans = document.querySelectorAll('.orbs span')
    spans.forEach((el) => {
      // force our animation on
      el.style.animation = 'orbY 14s ease-in-out infinite alternate, orbX 20s ease-in-out infinite alternate'
      el.style.animationPlayState = 'running'
    })
    // Safari / reflow nudge to restart animations if they were stuck
    requestAnimationFrame(() => {
      spans.forEach((el) => {
        const a = el.style.animation
        el.style.animation = 'none'
        // trigger reflow
        void el.offsetWidth
        el.style.animation = a
      })
    })
  }, [])

  return (
    <>
      {/* keep whatever you already have here */}
      <div className="global-haze" aria-hidden="true" />
      <div className="orbs" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        {/* add more if you like */}
      </div>

      <div className="page">
        <div className="container">
          {stage === 'landing' && (
            <section className="tower-wrap">
              <div className="tower">
                <img src="/assets/kiosk-main.png" alt="SnapBurger Kiosk" />
                <div className="tower-overlay">
                  <button className="pill-btn btn-first" onClick={() => setStage('menu')}>First-Time Customer</button>
                  <button className="pill-btn btn-return" onClick={() => setStage('menu')}>Returning Customer</button>
                  <div className="tagline-box">Where Dining Meets Technology</div>
                </div>
              </div>
            </section>
          )}

          {stage === 'menu' && (
            <section className="grid-2">
              <div className="card"><h2 style={{marginTop:0}}>Menu</h2></div>
              <div className="card"><h2 style={{marginTop:0}}>Your Cart</h2></div>
            </section>
          )}

          <div style={{color:'#fff', opacity:.9, textAlign:'center', padding:8}}>
            SnapBurger: Where Dining Meets Technology
          </div>
        </div>
      </div>
    </>
  )
}
