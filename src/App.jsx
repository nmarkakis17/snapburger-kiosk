<header className="hero">
  <div className="hero-stage">
    <div style={{position:'relative', zIndex:1}}>
      <h1>SnapBurger · Theo Kiosk</h1>
      <p>Order with Theo · Earn SnapCoins · Watch the SnapBoard light up</p>
      <div style={{marginTop:12, display:'flex', gap:10}}>
        <span className="badge">MVP</span>
        <span className="badge">Realtime</span>
        <span className="badge">Supabase</span>
      </div>
    </div>

    <div className="brand-images" style={{zIndex:1}}>
      <span className="brand-chip badge">Powered by Theo</span>

      <span className="brand-chip small">
        <img src="/assets/logo.png" alt="SnapBurger logo" />
        <b>SnapBurger</b>
      </span>

      <span className="brand-chip">
        <img src="/assets/theo.png" alt="Theo mascot" />
        <div style={{display:'grid', lineHeight:1.1}}>
          <b>Theo</b><small style={{color:'var(--sb-subtext)'}}>your AI host</small>
        </div>
      </span>

      <span className="brand-chip">
        <img src="/assets/burger.png" alt="Signature burger" />
        <div style={{display:'grid', lineHeight:1.1}}>
          <b>Byte Burger</b><small style={{color:'var(--sb-subtext)'}}>fan favorite</small>
        </div>
      </span>

      <span className="brand-chip small">
        <img src="/assets/fries.png" alt="Crispy fries" />
        <div style={{display:'grid', lineHeight:1.1}}>
          <b>Fries</b><small style={{color:'var(--sb-subtext)'}}>+100 SnapCoins</small>
        </div>
      </span>
    </div>
  </div>
</header>
