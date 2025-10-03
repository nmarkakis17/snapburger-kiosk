// src/pages/Registration.jsx
import React, { useMemo, useState } from "react"

const burgerOptions = [
  "Classic SnapBurger",
  "BBQ Crunch",
  "Spicy Inferno",
  "Smash Stack",
  "Mushroom Swiss",
]

const sideOptions = ["Fries", "Onion Rings", "Tots", "Side Salad", "Cole Slaw"]

const toppingOptions = [
  "Lettuce",
  "Tomato",
  "Onion",
  "Pickles",
  "Jalapeños",
  "Bacon",
  "Cheddar",
  "Swiss",
  "American",
  "Avocado",
]

export default function Registration() {
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",

    // Step 2
    allergies: "",
    favoriteBurgers: [],
    preferredSides: [],
    toppings: [], // we store entries like "Bacon-Add", "Onion-Light", etc.

    // Step 3
    social_facebook: "",
    social_instagram: "",
    social_x: "",
    social_tiktok: "",
    social_youtube: "",
  })

  const spacing = useMemo(
    () => ({
      colGap: 28, // gap between the two big columns (adds obvious space)
      rowGap: 12, // row spacing inside forms (tight but readable)
      cardWidth: "min(1040px, 94vw)",
      reviewWidth: "min(980px, 94vw)",
    }),
    []
  )

  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))
  const cancel = () => (window.location.href = "/")

  const toggleInArray = (key, value) =>
    setForm((f) => {
      const exists = f[key].includes(value)
      return {
        ...f,
        [key]: exists ? f[key].filter((v) => v !== value) : [...f[key], value],
      }
    })

  return (
    <>
      <style>{`
        :root{
          --bg:#0b1220;
          --panel:#ffffff;
          --text:#0b1020;
          --blue:#0ea5e9;
          --orange:#f97316;
          --sub:#5f6b85;
          --border:rgba(10,15,30,.12);
          --radius:18px;
        }
        .page{ position:relative; z-index:1; padding: 28px 16px; display:grid; place-items:center; }
        .wrap{
          width:${spacing.cardWidth};
          display:grid;
          grid-template-columns: 1.55fr 1fr;
          column-gap:${spacing.colGap}px;
          align-items:start;
        }
        .card{
          background:var(--panel);
          color:var(--text);
          border:1px solid var(--border);
          border-radius:var(--radius);
          padding:18px;
          box-shadow:0 12px 28px rgba(0,0,0,.18);
        }
        .aside{
          background:var(--panel);
          color:var(--text);
          border:1px solid var(--border);
          border-radius:var(--radius);
          padding:16px;
          box-shadow:0 12px 28px rgba(0,0,0,.14);
        }
        .title{ margin:0 0 4px 0; color:var(--blue) }
        .sub{ margin:0 0 14px 0; color:var(--sub) }

        /* Inputs */
        .grid{
          display:grid; gap:${spacing.rowGap}px;
          grid-template-columns:1fr 1fr;
        }
        .grid.one{ grid-template-columns: 1fr; }
        .grid.three{ grid-template-columns: 1fr 1fr 1fr; }
        .field{ display:grid; gap:6px }
        .label{ font-size:13px; font-weight:700; color:var(--blue) }
        input, textarea, select{
          width:100% !important; min-width:0 !important; box-sizing:border-box;
          background:#fff; color:var(--text);
          border:1px solid var(--border); border-radius:12px;
          padding:10px 12px; font:inherit;
        }
        textarea{ resize:vertical; min-height:90px }

        /* Check rows and grids */
        .check-row{ display:flex; align-items:center; gap:8px; line-height:1.2 }
        .pillbox{ display:flex; flex-wrap:wrap; gap:8px }
        .pill{
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 10px; border-radius:999px; border:1px solid var(--border);
          background:#fff;
        }

        .checkgrid{
          display:grid; gap:12px;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        /* Buttons — all haze gradient */
        .row{ display:flex; gap:10px; align-items:center; }
        .space{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .btn{
          cursor:pointer; border:none; border-radius:12px; padding:10px 14px; font-weight:800;
          background:linear-gradient(135deg, var(--blue), var(--orange)); color:#001018;
          box-shadow:0 10px 24px rgba(14,165,233,.28);
        }
        .btn:disabled { opacity:.6; cursor:not-allowed }
        .btn.ghost, .btn.alt { background:linear-gradient(135deg, var(--blue), var(--orange)); color:#001018; }

        /* Review table */
        .review{
          width:${spacing.reviewWidth};
          display:grid; gap:14px;
          background:var(--panel);
          color:var(--text);
          border:1px solid var(--border); border-radius:var(--radius);
          padding:18px; box-shadow:0 12px 28px rgba(0,0,0,.18);
        }
        .review .rowline{ display:grid; grid-template-columns: 180px 1fr; gap:12px }
        .review .key{ font-weight:800; color:var(--blue) }

        /* Congrats */
        .center{ display:grid; gap:14px; justify-items:center }
        .orange{ color:var(--orange) }

        /* Social icon row */
        .social-row{
          display:grid;
          grid-template-columns: 28px 1fr;
          align-items:center;
          gap:10px;
        }

        /* Keep the right card clearly separated on narrow screens */
        @media (max-width: 960px){
          .wrap{ grid-template-columns: 1fr; row-gap: 18px; }
        }
      `}</style>

      <div className="page">
        {/* Two-column layout: main form + Theo aside */}
        {step <= 4 && (
          <div className="wrap">
            {/* MAIN CARD */}
            <div className="card">
              <div className="space" style={{ marginBottom: 10 }}>
                <div>
                  <h2 className="title">Account Registration</h2>
                  <div className="sub">Step {step} of 4</div>
                </div>
                <button className="btn" onClick={cancel}>Cancel</button>
              </div>

              {/* STEP 1 — Contact & Address */}
              {step === 1 && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div className="grid">
                    <div className="field">
                      <label className="label">First name</label>
                      <input
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Theo"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Last name</label>
                      <input
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder="SnapBurger"
                      />
                    </div>
                  </div>

                  <div className="grid">
                    <div className="field">
                      <label className="label">Phone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(555) 555-5555"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid one">
                    <div className="field">
                      <label className="label">Address line 1</label>
                      <input
                        value={form.address1}
                        onChange={(e) => setForm({ ...form, address1: e.target.value })}
                        placeholder="123 Burger Ave"
                      />
                    </div>
                    <div className="field">
                      <label className="label">Address line 2 (optional)</label>
                      <input
                        value={form.address2}
                        onChange={(e) => setForm({ ...form, address2: e.target.value })}
                        placeholder="Apt, suite, etc."
                      />
                    </div>
                  </div>

                  <div className="grid three">
                    <div className="field">
                      <label className="label">City</label>
                      <input
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Metropolis"
                      />
                    </div>
                    <div className="field">
                      <label className="label">State</label>
                      <input
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        placeholder="CA"
                      />
                    </div>
                    <div className="field">
                      <label className="label">ZIP</label>
                      <input
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        placeholder="94107"
                      />
                    </div>
                  </div>

                  <div className="row" style={{ justifyContent: "flex-end", marginTop: 4 }}>
                    <button className="btn" onClick={next}>Next</button>
                  </div>
                </div>
              )}

              {/* STEP 2 — Preferences */}
              {step === 2 && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div className="grid one">
                    <div className="field">
                      <label className="label">Allergies / dietary notes</label>
                      <textarea
                        value={form.allergies}
                        onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                        placeholder="Peanuts, dairy-free, gluten-sensitive, etc."
                      />
                    </div>
                  </div>

                  {/* Favorite burgers — checkboxes */}
                  <div>
                    <div className="label" style={{ marginBottom: 6 }}>Favorite burgers</div>
                    <div className="pillbox">
                      {burgerOptions.map((b) => (
                        <label key={b} className="pill">
                          <input
                            type="checkbox"
                            checked={form.favoriteBurgers.includes(b)}
                            onChange={() => toggleInArray("favoriteBurgers", b)}
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred sides — checkboxes */}
                  <div>
                    <div className="label" style={{ marginBottom: 6 }}>Preferred sides</div>
                    <div className="pillbox">
                      {sideOptions.map((s) => (
                        <label key={s} className="pill">
                          <input
                            type="checkbox"
                            checked={form.preferredSides.includes(s)}
                            onChange={() => toggleInArray("preferredSides", s)}
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Toppings with Add / Remove / Light / Extra */}
                  <div style={{ marginTop: 12 }}>
                    <div className="label" style={{ marginBottom: 6 }}>
                      Toppings (Add / Remove / Light / Extra)
                    </div>
                    <div className="checkgrid">
                      {toppingOptions.map((t) => (
                        <div key={t} style={{ display: "grid", gap: 4 }}>
                          <div style={{ fontWeight: 700 }}>{t}</div>
                          {["Add", "Remove", "Light", "Extra"].map((opt) => {
                            const key = `${t}-${opt}`
                            const checked = form.toppings.includes(key)
                            return (
                              <label key={key} className="check-row">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setForm((f) => ({ ...f, toppings: [...f.toppings, key] }))
                                    } else {
                                      setForm((f) => ({
                                        ...f,
                                        toppings: f.toppings.filter((x) => x !== key),
                                      }))
                                    }
                                  }}
                                />
                                <span>{opt}</span>
                              </label>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
                    <button className="btn ghost" onClick={back}>Back</button>
                    <div className="row">
                      <button className="btn alt" onClick={cancel}>Cancel</button>
                      <button className="btn" onClick={next}>Next</button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Socials with icons */}
              {step === 3 && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div className="grid one">
                    <div className="field">
                      <label className="label">Social media (handles or URLs)</label>
                    </div>
                  </div>

                  <div className="grid one" style={{ gap: 10 }}>
                    {[
                      { key: "social_facebook", label: "Facebook", icon: "/assets/social/facebook.svg", ph: "@yourfacebook" },
                      { key: "social_instagram", label: "Instagram", icon: "/assets/social/instagram.svg", ph: "@yourinstagram" },
                      { key: "social_x", label: "X (Twitter)", icon: "/assets/social/x.svg", ph: "@yourhandle" },
                      { key: "social_tiktok", label: "TikTok", icon: "/assets/social/tiktok.svg", ph: "@yourtiktok" },
                      { key: "social_youtube", label: "YouTube", icon: "/assets/social/youtube.svg", ph: "youtube.com/@channel" },
                    ].map((s) => (
                      <div key={s.key} className="social-row">
                        <img src={s.icon} alt="" style={{ width: 24, height: 24 }} />
                        <input
                          value={form[s.key]}
                          onChange={(e) => setForm({ ...form, [s.key]: e.target.value })}
                          placeholder={s.ph}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
                    <button className="btn ghost" onClick={back}>Back</button>
                    <div className="row">
                      <button className="btn alt" onClick={cancel}>Cancel</button>
                      <button className="btn" onClick={next}>Next</button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — Review */}
              {step === 4 && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div className="review">
                    <div className="rowline">
                      <div className="key">Name</div>
                      <div>{form.firstName} {form.lastName}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Phone</div>
                      <div>{form.phone || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Email</div>
                      <div>{form.email || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Address</div>
                      <div>
                        {form.address1}{form.address2 ? `, ${form.address2}` : ""}<br/>
                        {form.city}, {form.state} {form.zip}
                      </div>
                    </div>

                    <div className="rowline">
                      <div className="key">Allergies</div>
                      <div>{form.allergies || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Favorite burgers</div>
                      <div>{form.favoriteBurgers.length ? form.favoriteBurgers.join(", ") : "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Preferred sides</div>
                      <div>{form.preferredSides.length ? form.preferredSides.join(", ") : "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Toppings</div>
                      <div>{form.toppings.length ? form.toppings.join(", ") : "—"}</div>
                    </div>

                    <div className="rowline">
                      <div className="key">Facebook</div>
                      <div>{form.social_facebook || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">Instagram</div>
                      <div>{form.social_instagram || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">X</div>
                      <div>{form.social_x || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">TikTok</div>
                      <div>{form.social_tiktok || "—"}</div>
                    </div>
                    <div className="rowline">
                      <div className="key">YouTube</div>
                      <div>{form.social_youtube || "—"}</div>
                    </div>
                  </div>

                  <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
                    <button className="btn ghost" onClick={back}>Back</button>
                    <div className="row">
                      <button className="btn alt" onClick={cancel}>Cancel</button>
                      <button className="btn" onClick={() => setStep(5)}>Submit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* THEO ASIDE CARD (kept on steps 1–3) */}
            {step <= 3 && (
              <aside className="aside">
                <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                  <img
                    src="/assets/theo-write.png"
                    alt="Theo"
                    style={{ width: 240, height: "auto", display: "block" }}
                  />
                  <div style={{ textAlign: "center", color: "var(--text)" }}>
                    <div style={{ fontWeight: 900, color: "var(--blue)" }}>
                      Why Register?
                    </div>
                    <div style={{ fontSize: 14, color: "var(--sub)" }}>
                      Earn <b className="orange">SnapCoins</b>, collect <b className="orange">SnapCharms</b>,
                      and get personalized deals based on your preferences.
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}

        {/* STEP 5 — Congratulations */}
        {step === 5 && (
          <div className="card center" style={{ width: "min(820px, 92vw)", padding: 18 }}>
            <img src="/assets/theo-clap.png" alt="Theo clapping" style={{ maxWidth: 320 }} />
            <h2 style={{ margin: 0, fontSize: "1.7rem", color: "var(--blue)", textAlign: "center" }}>
              Theo welcomes you to the <b className="orange">SnapBurger</b> family!
            </h2>
            <h3 style={{ margin: 0, color: "var(--text)" }}>Congratulations!</h3>

            <div className="row" style={{ marginTop: 10 }}>
              <a className="btn" href="/">Back to Home</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
