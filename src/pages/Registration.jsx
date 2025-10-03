import React, { useMemo, useState } from 'react'

const BRAND = {
  blue:  '#1da1ff',
  orange:'#f97316',
  slate: '#0b1220'
}

export default function Registration(){
  const [step, setStep] = useState(1)

  // Step 1 — account info
  const [account, setAccount] = useState({
    firstName: '', lastName: '',
    phone: '', email: '',
    address1: '', address2: '', city: '', state: '', zip: ''
  })

  // Step 2 — preferences
  const [prefs, setPrefs] = useState({
    allergies: '',
    favBurgers: [],              // checkboxes
    toppings: { add: '', remove: '', extra: '', light: '' },
    preferredSides: []           // checkboxes
  })

  // Step 3 — socials (explicit fields)
  const [socials, setSocials] = useState({
    facebook: '', instagram: '', x: '', tiktok: '', youtube: ''
  })

  const canNext1 = useMemo(() =>
    account.firstName && account.lastName && account.phone && account.email && account.address1 && account.city && account.state && account.zip
  , [account])

  const favBurgerOptions = [
    'Classic Snap', 'Double Snap', 'Spicy Theo', 'Veggie Byte', 'BBQ Stack'
  ]
  const sideOptions = [
    'Fries', 'Sweet Potato Fries', 'Onion Rings', 'Side Salad'
  ]

  const toggleInArray = (arr, val) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]

  const next = () => setStep(s => Math.min(4, s+1))
  const back = () => setStep(s => Math.max(1, s-1))

  const onSubmit = (e) => {
    e.preventDefault()
    // Submit payload
    const payload = { account, prefs, socials }
    console.log('SUBMIT', payload)
    alert('Registration complete! (logged to console)')
  }

  return (
    <>
      <style>{`
        :root{ --blue:${BRAND.blue}; --orange:${BRAND.orange}; --slate:${BRAND.slate}; }
        html { background:#0b1220; } body,#root{background:transparent;margin:0;color:#eef2ff;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,"Helvetica Neue",Arial}

        .global-haze{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            #0b1220;
          filter: saturate(1.08);
        }

        .page{position:relative;z-index:1}
        .container{max-width:1100px;margin:0 auto;padding:28px}

        .headline{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .headline .title{font-size:26px;font-weight:900;color:var(--blue)}
        .subtitle{color:#9cb4ff}

        .layout{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;align-items:start}
        .panel{
          background:#fff;color:#0b1020;border-radius:18px;border:1px solid rgba(10,15,30,.10);
          box-shadow:0 14px 28px rgba(0,0,0,.25); padding:18px;
        }
        .theoPanel{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center}
        .theoPanel img{width:120px;height:auto;display:block}
        .theoPanel .blurb{color:var(--blue);font-weight:800}

        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .kv{display:grid;gap:6px}
        .kv label{font-size:12px;color:#51607a}
        .input{
          width:100%;padding:10px 12px;border-radius:12px;border:1px solid #d1d8e6;background:#fff;color:#0b1020
        }
        .area{min-height:90px}
        .row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .btn{
          cursor:pointer;border:none;border-radius:12px;padding:10px 14px;font-weight:900;
          background:linear-gradient(135deg,var(--blue),var(--orange));color:#0b0e14
        }
        .ghost{background:#0c1326;color:#fff;border:1px solid #1f2a44}
        .space{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-top:14px}
        .checkgrid{display:grid;grid-template-columns:repeat(2, minmax(0,1fr));gap:10px}
        .check{display:flex;align-items:center;gap:8px}
        .review{white-space:pre-wrap;line-height:1.25}
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <main className="page">
        <div className="container">
          <div className="headline">
            <div className="title">Create your SnapBurger account</div>
            <div className="subtitle">Step {step} of 4</div>
          </div>

          <div className="layout">
            {/* LEFT: form card */}
            <div className="panel">
              {step === 1 && (
                <>
                  <h3 style={{marginTop:0, color: BRAND.blue}}>Account</h3>
                  <div className="grid2">
                    <div className="kv">
                      <label>First name</label>
                      <input className="input" value={account.firstName} onChange={e=>setAccount({...account, firstName:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>Last name</label>
                      <input className="input" value={account.lastName} onChange={e=>setAccount({...account, lastName:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>Phone</label>
                      <input className="input" value={account.phone} onChange={e=>setAccount({...account, phone:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>Email</label>
                      <input className="input" value={account.email} onChange={e=>setAccount({...account, email:e.target.value})} />
                    </div>
                    <div className="kv" style={{gridColumn:'1 / -1'}}>
                      <label>Address line 1</label>
                      <input className="input" value={account.address1} onChange={e=>setAccount({...account, address1:e.target.value})} />
                    </div>
                    <div className="kv" style={{gridColumn:'1 / -1'}}>
                      <label>Address line 2</label>
                      <input className="input" value={account.address2} onChange={e=>setAccount({...account, address2:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>City</label>
                      <input className="input" value={account.city} onChange={e=>setAccount({...account, city:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>State</label>
                      <input className="input" value={account.state} onChange={e=>setAccount({...account, state:e.target.value})} />
                    </div>
                    <div className="kv">
                      <label>ZIP</label>
                      <input className="input" value={account.zip} onChange={e=>setAccount({...account, zip:e.target.value})} />
                    </div>
                  </div>

                  <div className="space">
                    <a href="/" className="btn ghost">Cancel</a>
                    <button className="btn" onClick={next} disabled={!canNext1}>Next</button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 style={{marginTop:0, color: BRAND.blue}}>Preferences</h3>

                  <div className="kv" style={{marginBottom:12}}>
                    <label>Allergies</label>
                    <textarea className="input area" value={prefs.allergies} onChange={e=>setPrefs({...prefs, allergies:e.target.value})} />
                  </div>

                  <div className="kv">
                    <label>Favorite burger(s)</label>
                    <div className="checkgrid">
                      {favBurgerOptions.map(opt => (
                        <label key={opt} className="check">
                          <input
                            type="checkbox"
                            checked={prefs.favBurgers.includes(opt)}
                            onChange={() => setPrefs({...prefs, favBurgers: toggleInArray(prefs.favBurgers, opt)})}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="kv" style={{marginTop:12}}>
                    <label>Preferred side(s)</label>
                    <div className="checkgrid">
                      {sideOptions.map(opt => (
                        <label key={opt} className="check">
                          <input
                            type="checkbox"
                            checked={prefs.preferredSides.includes(opt)}
                            onChange={() => setPrefs({...prefs, preferredSides: toggleInArray(prefs.preferredSides, opt)})}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid2" style={{marginTop:12}}>
                    <div className="kv"><label>Add</label><input className="input" value={prefs.toppings.add} onChange={e=>setPrefs({...prefs, toppings:{...prefs.toppings, add:e.target.value}})} /></div>
                    <div className="kv"><label>Remove</label><input className="input" value={prefs.toppings.remove} onChange={e=>setPrefs({...prefs, toppings:{...prefs.toppings, remove:e.target.value}})} /></div>
                    <div className="kv"><label>Extra</label><input className="input" value={prefs.toppings.extra} onChange={e=>setPrefs({...prefs, toppings:{...prefs.toppings, extra:e.target.value}})} /></div>
                    <div className="kv"><label>Light</label><input className="input" value={prefs.toppings.light} onChange={e=>setPrefs({...prefs, toppings:{...prefs.toppings, light:e.target.value}})} /></div>
                  </div>

                  <div className="space">
                    <button className="btn ghost" onClick={back}>Back</button>
                    <button className="btn" onClick={next}>Next</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 style={{marginTop:0, color: BRAND.blue}}>Socials</h3>
                  <div className="grid2">
                    <div className="kv"><label>Facebook</label><input className="input" placeholder="@username or URL" value={socials.facebook} onChange={e=>setSocials({...socials, facebook:e.target.value})} /></div>
                    <div className="kv"><label>Instagram</label><input className="input" placeholder="@username or URL" value={socials.instagram} onChange={e=>setSocials({...socials, instagram:e.target.value})} /></div>
                    <div className="kv"><label>X</label><input className="input" placeholder="@username or URL" value={socials.x} onChange={e=>setSocials({...socials, x:e.target.value})} /></div>
                    <div className="kv"><label>TikTok</label><input className="input" placeholder="@username or URL" value={socials.tiktok} onChange={e=>setSocials({...socials, tiktok:e.target.value})} /></div>
                    <div className="kv" style={{gridColumn:'1 / -1'}}><label>YouTube</label><input className="input" placeholder="Channel URL" value={socials.youtube} onChange={e=>setSocials({...socials, youtube:e.target.value})} /></div>
                  </div>

                  <div className="space">
                    <button className="btn ghost" onClick={back}>Back</button>
                    <button className="btn" onClick={next}>Next</button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 style={{marginTop:0, color: BRAND.blue}}>Review</h3>
                  <div className="panel" style={{background:'#f8fbff', border:'1px solid #d7e7ff'}}>
                    <div className="review">
{`Name: ${account.firstName} ${account.lastName}
Phone: ${account.phone}
Email: ${account.email}
Address: ${account.address1}${account.address2 ? ' ' + account.address2 : ''}, ${account.city}, ${account.state} ${account.zip}

Allergies: ${prefs.allergies || '(none)'}
Favorite burgers: ${prefs.favBurgers.join(', ') || '(none)'}
Preferred sides: ${prefs.preferredSides.join(', ') || '(none)'}
Toppings — Add:${prefs.toppings.add || ' -'}  Remove:${prefs.toppings.remove || ' -'}  Extra:${prefs.toppings.extra || ' -'}  Light:${prefs.toppings.light || ' -'}

Socials:
  • Facebook:  ${socials.facebook || '-'}
  • Instagram: ${socials.instagram || '-'}
  • X:         ${socials.x || '-'}
  • TikTok:    ${socials.tiktok || '-'}
  • YouTube:   ${socials.youtube || '-'}
`}
                    </div>
                  </div>

                  <div className="space">
                    <button className="btn ghost" onClick={back}>Back</button>
                    <button className="btn" onClick={onSubmit}>Submit</button>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT: Theo + blurb */}
            <div className="panel theoPanel">
              <img src="/assets/theo-write.png" alt="Theo writing" />
              <div>
                <div className="blurb">Why register?</div>
                <div style={{color:'#0b1020'}}>
                  Earn <b style={{color:BRAND.orange}}>SnapCoins</b>, collect <b style={{color:BRAND.orange}}>SnapCharms</b>,
                  and get personalized recommendations from Theo. Your preferences help us
                  serve you faster and better every visit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

