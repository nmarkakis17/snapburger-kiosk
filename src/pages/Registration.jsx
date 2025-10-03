import React, { useMemo, useState } from "react"

const brand = {
  blue: "#0ea5e9",
  orange: "#f97316",
  sub: "#5f6b85",
}

const burgerOptions = ["Classic", "Double", "Chicken", "Veggie", "BBQ"]
const sideOptions = ["Fries", "Sweet Potato Fries", "Onion Rings", "Side Salad"]
const toppingOptions = ["Lettuce", "Tomato", "Onions", "Pickles", "Cheese", "Bacon", "Jalapeños"]

export default function Registration(){
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    // step 1
    firstName: "", lastName: "", phone: "", email: "",
    address1: "", address2: "", city: "", state: "", zip: "",
    // step 2
    allergies: "",
    burgers: [],
    sides: [],
    toppings: [],
    // step 3
    facebook: "", instagram: "", x: "", tiktok: "", youtube: "",
  })

  const onChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const onCheckList = (k, val) => (e) =>
    setForm(f => {
      const arr = new Set(f[k])
      if (e.target.checked) arr.add(val); else arr.delete(val)
      return { ...f, [k]: Array.from(arr) }
    })

  const next = () => setStep(s => Math.min(s+1, 4))
  const back = () => setStep(s => Math.max(s-1, 1))

  const Review = useMemo(() => (
    <div className="card" style={{ padding: 18 }}>
      <h3 style={{ marginTop: 0, color: brand.blue }}>Review</h3>
      <div style={{ display:"grid", gap:10, gridTemplateColumns:"1fr 1fr" }}>
        <div>
          <div className="label">Name</div>
          <div>{form.firstName} {form.lastName}</div>
          <div className="label" style={{ marginTop:10 }}>Phone</div>
          <div>{form.phone}</div>
          <div className="label" style={{ marginTop:10 }}>Email</div>
          <div>{form.email}</div>
          <div className="label" style={{ marginTop:10 }}>Address</div>
          <div>
            {form.address1}{form.address2 ? `, ${form.address2}` : ""}<br/>
            {form.city}{form.city && form.state ? ", " : ""}{form.state} {form.zip}
          </div>
        </div>
        <div>
          <div className="label">Allergies</div>
          <div>{form.allergies || "None"}</div>

          <div className="label" style={{ marginTop:10 }}>Favorite Burgers</div>
          <div>{form.burgers.length ? form.burgers.join(", ") : "—"}</div>

          <div className="label" style={{ marginTop:10 }}>Preferred Sides</div>
          <div>{form.sides.length ? form.sides.join(", ") : "—"}</div>

          <div className="label" style={{ marginTop:10 }}>Toppings</div>
          <div>{form.toppings.length ? form.toppings.join(", ") : "—"}</div>

          <div className="label" style={{ marginTop:10 }}>Socials</div>
          <div style={{ display:"grid", gap:6 }}>
            <div>Facebook: {form.facebook || "—"}</div>
            <div>Instagram: {form.instagram || "—"}</div>
            <div>X: {form.x || "—"}</div>
            <div>TikTok: {form.tiktok || "—"}</div>
            <div>YouTube: {form.youtube || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  ), [form])

  return (
    <>
      <style>{`
        .reg-shell{ max-width: 1100px; margin: 0 auto; display:grid; grid-template-columns: 1.3fr .7fr; gap: 28px; }
        .reg-card{ background:#fff; color:#0b1020; border:1px solid rgba(10,15,30,.12); border-radius:18px; padding:18px; box-shadow:0 12px 28px rgba(0,0,0,.18); }
        .reg-title{ margin:0 0 10px; color:${brand.blue}; }
        .fields{ display:grid; grid-template-columns: 1fr 1fr; column-gap: 24px; row-gap: 10px; }
        .field{ display:grid; gap:6px; }
        .label{ font-size:12px; color:${brand.sub}; }
        input, textarea, select{ width:100%; padding:10px 12px; border:1px solid rgba(10,15,30,.12); border-radius:12px; background:#f8f9ff; color:#0b1020; }
        textarea{ min-height: 72px; resize: vertical; }

        /* widen step 2 + step 4 content areas */
        .wide-box{ max-width: none; }

        .checkgrid{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:10px; }
        .check-row{ display:flex; align-items:center; gap:8px; }

        .actions{ display:flex; gap:10px; justify-content:flex-end; margin-top:14px; }
        .btn{ cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:800; background:linear-gradient(135deg, ${brand.blue}, ${brand.orange}); color:#001018; }
        .btn.ghost{ background:#0c1326; color:#fff; border:1px solid rgba(10,15,30,.12); }
        .btn.alt{ background:${brand.orange}; color:#0b1020; }

        .aside{ background:#fff; color:#0b1020; border:1px solid rgba(10,15,30,.12); border-radius:18px; padding:18px; box-shadow:0 12px 28px rgba(0,0,0,.18); }
        .aside h3{ margin:0 0 8px; color:${brand.blue}; }
        .theo{ display:block; width: 85%; max-width: 280px; margin: 0 auto 10px; }
        .muted{ color:${brand.sub} }

        .social-row{ display:grid; grid-template-columns: 28px 1fr; align-items:center; gap:10px; }
        .social-row img{ width:28px; height:28px }
      `}</style>

      <div className="page container">
        <div className="reg-shell">
          {/* —— Main stepper card —— */}
          <div className="reg-card" style={{ minHeight: 420 }}>
            <h2 className="reg-title">Create Your Account</h2>

            {step === 1 && (
              <div className="fields" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="field"><div className="label">First name</div><input value={form.firstName} onChange={onChange("firstName")} /></div>
                <div className="field"><div className="label">Last name</div><input value={form.lastName} onChange={onChange("lastName")} /></div>
                <div className="field"><div className="label">Phone</div><input value={form.phone} onChange={onChange("phone")} /></div>
                <div className="field"><div className="label">Email</div><input value={form.email} onChange={onChange("email")} /></div>
                <div className="field" style={{ gridColumn: "1 / -1" }}><div className="label">Address line 1</div><input value={form.address1} onChange={onChange("address1")} /></div>
                <div className="field" style={{ gridColumn: "1 / -1" }}><div className="label">Address line 2</div><input value={form.address2} onChange={onChange("address2")} /></div>
                <div className="field"><div className="label">City</div><input value={form.city} onChange={onChange("city")} /></div>
                <div className="field"><div className="label">State</div><input value={form.state} onChange={onChange("state")} /></div>
                <div className="field"><div className="label">Zip</div><input value={form.zip} onChange={onChange("zip")} /></div>

                <div className="actions" style={{ gridColumn: "1 / -1" }}>
                  <a href="/" className="btn ghost">Cancel</a>
                  <button className="btn" onClick={next}>Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="wide-box">
                <div className="field">
                  <div className="label">Allergies</div>
                  <textarea placeholder="e.g., peanuts, dairy..." value={form.allergies} onChange={onChange("allergies")} />
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginTop:12 }}>
                  <div>
                    <div className="label" style={{ marginBottom:6 }}>Favorite Burgers</div>
                    <div className="checkgrid">
                      {burgerOptions.map(b => (
                        <label key={b} className="check-row">
                          <input type="checkbox" checked={form.burgers.includes(b)} onChange={onCheckList("burgers", b)} />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="label" style={{ marginBottom:6 }}>Preferred Sides</div>
                    <div className="checkgrid">
                      {sideOptions.map(s => (
                        <label key={s} className="check-row">
                          <input type="checkbox" checked={form.sides.includes(s)} onChange={onCheckList("sides", s)} />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:12 }}>
                  <div className="label" style={{ marginBottom:6 }}>Toppings (add/remove/extra/light)</div>
                  <div className="checkgrid">
                    {toppingOptions.map(t => (
                      <label key={t} className="check-row">
                        <input type="checkbox" checked={form.toppings.includes(t)} onChange={onCheckList("toppings", t)} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="actions">
                  <button className="btn ghost" onClick={back}>Back</button>
                  <a href="/" className="btn ghost">Cancel</a>
                  <button className="btn" onClick={next}>Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display:"grid", gap:12 }}>
                <div className="label">Social Media (for tagging rewards)</div>

                {/* Make sure these icons exist in /public/assets/social/*.svg */}
                <div className="social-row">
                  <img src="/assets/social/facebook.svg" alt="Facebook" />
                  <input placeholder="@yourhandle" value={form.facebook} onChange={onChange("facebook")} />
                </div>
                <div className="social-row">
                  <img src="/assets/social/instagram.svg" alt="Instagram" />
                  <input placeholder="@yourhandle" value={form.instagram} onChange={onChange("instagram")} />
                </div>
                <div className="social-row">
                  <img src="/assets/social/x.svg" alt="X" />
                  <input placeholder="@yourhandle" value={form.x} onChange={onChange("x")} />
                </div>
                <div className="social-row">
                  <img src="/assets/social/tiktok.svg" alt="TikTok" />
                  <input placeholder="@yourhandle" value={form.tiktok} onChange={onChange("tiktok")} />
                </div>
                <div className="social-row">
                  <img src="/assets/social/youtube.svg" alt="YouTube" />
                  <input placeholder="@yourchannel" value={form.youtube} onChange={onChange("youtube")} />
                </div>

                <div className="actions">
                  <button className="btn ghost" onClick={back}>Back</button>
                  <a href="/" className="btn ghost">Cancel</a>
                  <button className="btn" onClick={next}>Next</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="wide-box">
                {Review}
                <div className="actions">
                  <button className="btn ghost" onClick={back}>Back</button>
                  <a href="/" className="btn ghost">Cancel</a>
                  <button
                    className="btn alt"
                    onClick={() => setStep(5)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="card" style={{ padding:18 }}>
                <div style={{ display:"grid", gap:12, justifyItems:"center" }}>
                  {/* Use your real Theo asset: /public/assets/theo-clap.png or theo-write.png */}
                  <img src="/assets/theo-clap.png" onError={(e)=>{ e.currentTarget.style.display="none" }} alt="Theo clapping" style={{ maxWidth:280 }} />
                  <h2 style={{ margin:0, color:brand.blue }}>Congratulations!</h2>
                  <div className="label" style={{ color:"#0b1020" }}>
                    <span>Theo welcomes you to the </span>
                    <b style={{ color: brand.orange }}>SnapBurger</b>
                    <span> family!</span>
                  </div>
                  <a href="/" className="btn">Back to Home</a>
                </div>
              </div>
            )}
          </div>

          {/* —— Theo / explainer side card —— */}
          <aside className="aside">
            {/* Use your Theo image (pointing / writing): /public/assets/theo-write.png */}
            <img className="theo" src="/assets/theo-write.png" alt="Theo" />
            <h3>Why Register?</h3>
            <p className="muted">
              Earn <b style={{ color: brand.orange }}>SnapCoins</b> and <b style={{ color: brand.orange }}>SnapCharms</b> with every visit.
              Save favorites, track rewards, and get exclusive member perks.
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}
