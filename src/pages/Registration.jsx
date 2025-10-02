import React, { useMemo, useState } from "react";

const burgerOptions = [
  "Snap Classic",
  "Double Snap",
  "Veggie Snap",
  "BBQ Bacon Snap",
  "Spicy Jalapeño Snap",
];

const sideOptions = [
  "Fries",
  "Sweet Potato Fries",
  "Tater Tots",
  "Side Salad",
  "Onion Rings",
];

const initialData = {
  // Step 1
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  // Step 2
  allergies: "",
  favoriteBurgers: [],
  preferredSides: [],
  toppings: {
    lettuce: "normal",
    tomato: "normal",
    onion: "normal",
    pickles: "normal",
    cheese: "normal",
    bacon: "normal",
    jalapenos: "normal",
  },
  // Step 3
  socials: {
    facebook: "",
    instagram: "",
    x: "",
    tiktok: "",
    youtube: "",
  },
};

const toppingOptions = ["remove", "light", "normal", "add", "extra"];
const toppingsList = [
  { key: "lettuce", label: "Lettuce" },
  { key: "tomato", label: "Tomato" },
  { key: "onion", label: "Onion" },
  { key: "pickles", label: "Pickles" },
  { key: "cheese", label: "Cheese" },
  { key: "bacon", label: "Bacon" },
  { key: "jalapenos", label: "Jalapeños" },
];

export default function Registration() {
  const [step, setStep] = useState(1); // 1..4, then "done"
  const [data, setData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);

  const canNext = useMemo(() => {
    if (step === 1) {
      return (
        data.firstName.trim() &&
        data.lastName.trim() &&
        data.email.trim() &&
        data.phone.trim()
      );
    }
    return true;
  }, [step, data]);

  function updateField(path, value) {
    setData((prev) => {
      const next = { ...prev };
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function toggleInArray(path, value) {
    setData((prev) => {
      const parts = path.split(".");
      const root = { ...prev };
      let obj = root;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      const key = parts[parts.length - 1];
      const arr = new Set(obj[key] || []);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      obj[key] = Array.from(arr);
      return root;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canNext) return;
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("done");
    }, 800);
  }

  return (
    <div className="registration-page">
      <style>{`
        :root {
          --blue:#0ea5e9;
          --orange:#f97316;
          --bg:#0b1220;
          --panel:#ffffff;
          --ink:#0b1020;
          --radius:18px;
        }

        /* ===== Haze background ===== */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.25), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.28), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.22), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.18) 60%),
            var(--bg);
          filter:saturate(1.05);
        }

        .registration-container{
          position:relative; z-index:2;
          max-width:1280px; margin:0 auto; padding:40px 28px;
          display:grid; grid-template-columns: 1.55fr 1fr; gap:42px;
          align-items:start;
        }

        /* ===== Form card ===== */
        .card{
          background:var(--panel);
          border-radius:var(--radius);
          padding:26px;
          box-shadow:0 12px 28px rgba(0,0,0,.25);
        }
        .card h2{
          margin:0 0 12px;
          color:var(--blue);
        }
        .steps{
          display:flex; gap:8px; margin-bottom:10px;
          font-weight:800; color:#2563eb;
        }
        .subtitle{
          margin:0 0 16px; color:#3b82f6; font-weight:700;
        }

        /* Grid form */
        form{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:18px 42px; /* space between columns */
        }
        label{
          display:flex; flex-direction:column;
          font-weight:800; font-size:14px; color:var(--blue);
        }
        input, select, textarea{
          margin-top:6px; padding:11px 12px;
          border:1px solid #d0d7e2; border-radius:12px;
          font-size:14px; color:#000; background:#fff;
        }
        textarea{ resize:vertical }

        /* Actions */
        .form-actions{
          grid-column:1 / -1;
          display:flex; justify-content:space-between; align-items:center;
          margin-top:14px;
        }
        .btn{
          cursor:pointer; border:none; border-radius:999px;
          padding:12px 22px; font-weight:900; font-size:15px;
          color:#0b0e14; background:linear-gradient(135deg,var(--blue),var(--orange));
          box-shadow:0 6px 18px rgba(14,165,233,.28);
        }
        .btn.secondary{
          background:#eef2ff; color:#111827; box-shadow:none;
          border:1px solid #c7d2fe;
        }
        .btn:disabled{ opacity:.6; cursor:not-allowed; }

        /* Theo card */
        .theo-card{
          background:rgba(255,255,255,.95);
          border-radius:var(--radius);
          padding:18px 18px 22px;
          box-shadow:0 10px 24px rgba(0,0,0,.25);
          text-align:center;
        }
        .theo-card img{ max-width:72%; height:auto }
        .theo-title{ color:#0ea5e9; font-weight:900; margin:6px 0 2px }
        .theo-note{ margin:0; color:#0ea5e9; font-weight:800; }

        /* ===== Step 2 — wider white box (+1.5") ===== */
        .pref-wrap{
          grid-column:1 / -1;
          background:#fff;
          border:1px solid #e5e7eb; border-radius:16px;
          padding:22px 22px 24px;
          box-shadow: 0 6px 18px rgba(0,0,0,.10);
          display:grid; gap:18px;

          /* +1.5in ≈ 144px : expand visually beyond the form columns */
          position: relative;
          left: -72px;                 /* half of 144px */
          width: calc(100% + 144px);
        }

        .group-title{
          margin:0; color:#0ea5e9; font-weight:900;
        }
        .checkbox-grid{
          display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px 18px;
        }
        .cb{
          display:flex; align-items:center; gap:10px; color:#111;
          font-weight:700;
        }
        .cb input{ width:18px; height:18px }

        /* Toppings matrix */
        .toppings{
          background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px;
          padding:16px; display:grid; gap:12px;
        }
        .t-row{
          display:grid; grid-template-columns: 1fr repeat(5, minmax(72px, 92px));
          align-items:center; gap:8px;
        }
        .t-row strong{ color:#111; }
        .pill{
          display:inline-block; text-align:center; padding:8px 6px; border-radius:10px;
          border:1px solid #d1d5db; background:#fff; font-size:13px; font-weight:800; color:#111;
          cursor:pointer; user-select:none;
        }
        .pill.active{ border-color:#60a5fa; background:#dbeafe; color:#111827; }

        /* Step 3 — socials */
        .social-input{ display:flex; align-items:center; gap:10px; }
        .social-input img{ width:20px; height:20px; object-fit:contain; filter: saturate(1.1); }

        /* ===== Step 4 — wider review card (+2.5") ===== */
        .review-card{
          grid-column:1 / -1;
          background:#fff;
          border:1px solid #e5e7eb; border-radius:16px;
          padding:22px 22px 24px;
          box-shadow: 0 6px 18px rgba(0,0,0,.10);

          /* +2.5in ≈ 240px */
          position: relative;
          left: -120px;                /* half of 240px */
          width: calc(100% + 240px);
        }
        .review{
          display:grid; grid-template-columns:1fr 1fr; gap:16px 42px;
        }
        .review .kv{ display:flex; gap:10px; align-items:flex-start; }
        .review .k{ min-width:160px; color:var(--blue); font-weight:800; }
        .review .v{ color:#111; }

        /* Final screen */
        .done-wrap{
          position:relative; z-index:2; max-width:860px; margin:48px auto; padding:0 20px;
          text-align:center;
        }
        .done-card{
          background:#fff; border-radius:22px; padding:26px;
          box-shadow:0 20px 40px rgba(0,0,0,.25);
        }
        .done-title{ margin:10px 0 6px; font-size:28px; color:#0ea5e9; font-weight:900; }
        .done-note{ margin:0; color:#0ea5e9; font-weight:800; }
        .confetti{
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background:
            radial-gradient(circle at 15% 25%, rgba(14,165,233,.18), transparent 30%),
            radial-gradient(circle at 85% 35%, rgba(249,115,22,.16), transparent 30%),
            radial-gradient(circle at 50% 85%, rgba(14,165,233,.18), transparent 30%);
          animation: drift 7s ease-in-out infinite alternate;
        }
        @keyframes drift{ 0%{ transform: translateY(0) } 100%{ transform: translateY(-14px) } }

        /* Mobile fallbacks: reset the wideners so they don't overflow */
        @media (max-width: 980px){
          .registration-container{ grid-template-columns: 1fr; }
          .theo-card img{ max-width:220px }
          .review{ grid-template-columns: 1fr; }
          .pref-wrap, .review-card{ left:0; width:100%; }
        }
      `}</style>

      {/* Background haze */}
      <div className="global-haze" aria-hidden="true" />

      {step !== "done" ? (
        <div className="registration-container">
          {/* LEFT: Multi-step form */}
          <div className="card">
            <div className="steps">Step {step} of 4</div>
            <h2>Account Registration</h2>
            <p className="subtitle">
              {step === 1 && "Tell us how to reach you"}
              {step === 2 && "Customize your favorites & preferences"}
              {step === 3 && "Add your socials so we can tag you!"}
              {step === 4 && "Review & confirm your details"}
            </p>

            <form onSubmit={onSubmit}>
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <label>
                    First Name
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Last Name
                    <input
                      type="text"
                      value={data.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Email Address
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                    />
                  </label>
                  <label style={{ gridColumn: "1/-1" }}>
                    Address
                    <input
                      type="text"
                      value={data.address}
                      onChange={(e) => updateField("address", e.target.value)}
                    />
                  </label>
                  <label>
                    City
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => updateField("city", e.target.value)}
                    />
                  </label>
                  <label>
                    State
                    <input
                      type="text"
                      value={data.state}
                      onChange={(e) => updateField("state", e.target.value)}
                    />
                  </label>
                  <label>
                    Zip
                    <input
                      type="text"
                      value={data.zip}
                      onChange={(e) => updateField("zip", e.target.value)}
                    />
                  </label>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <div className="pref-wrap">
                    <h3 className="group-title">Allergies</h3>
                    <textarea
                      rows="3"
                      value={data.allergies}
                      onChange={(e) => updateField("allergies", e.target.value)}
                      placeholder="Peanuts, dairy, gluten, etc."
                    />

                    <h3 className="group-title" style={{ marginTop: 6 }}>Favorite Burgers</h3>
                    <div className="checkbox-grid">
                      {burgerOptions.map((b) => (
                        <label key={b} className="cb">
                          <input
                            type="checkbox"
                            checked={data.favoriteBurgers.includes(b)}
                            onChange={() => toggleInArray("favoriteBurgers", b)}
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>

                    <h3 className="group-title" style={{ marginTop: 6 }}>Preferred Sides</h3>
                    <div className="checkbox-grid">
                      {sideOptions.map((s) => (
                        <label key={s} className="cb">
                          <input
                            type="checkbox"
                            checked={data.preferredSides.includes(s)}
                            onChange={() => toggleInArray("preferredSides", s)}
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>

                    <div className="toppings" style={{ marginTop: 8 }}>
                      <strong style={{ color: "#0ea5e9" }}>
                        Toppings — choose per-item preference
                      </strong>
                      <div className="t-row" style={{ fontWeight: 800, color: "#6b7280" }}>
                        <div></div>
                        {toppingOptions.map((opt) => (
                          <div key={`head-${opt}`} style={{ textTransform: "capitalize", textAlign:"center" }}>
                            {opt}
                          </div>
                        ))}
                      </div>
                      {toppingsList.map((t) => (
                        <div className="t-row" key={t.key}>
                          <strong>{t.label}</strong>
                          {toppingOptions.map((opt) => {
                            const active = data.toppings[t.key] === opt;
                            return (
                              <div key={opt} style={{ display: "grid", placeItems: "center" }}>
                                <span
                                  className={`pill ${active ? "active" : ""}`}
                                  onClick={() => updateField(`toppings.${t.key}`, opt)}
                                >
                                  {opt === "normal" ? "ok" : opt}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <label style={{ gridColumn: "1/-1" }}>
                    Connect your socials (optional)
                    <div style={{ height: 6 }} />
                  </label>

                  <label style={{ gridColumn: "1/-1" }}>
                    Facebook
                    <div className="social-input">
                      <img src="/assets/social/facebook.svg" alt="Facebook" />
                      <input
                        type="url"
                        placeholder="https://facebook.com/username"
                        value={data.socials.facebook}
                        onChange={(e) =>
                          updateField("socials.facebook", e.target.value)
                        }
                      />
                    </div>
                  </label>

                  <label style={{ gridColumn: "1/-1" }}>
                    Instagram
                    <div className="social-input">
                      <img src="/assets/social/instagram.svg" alt="Instagram" />
                      <input
                        type="url"
                        placeholder="https://instagram.com/username"
                        value={data.socials.instagram}
                        onChange={(e) =>
                          updateField("socials.instagram", e.target.value)
                        }
                      />
                    </div>
                  </label>

                  <label style={{ gridColumn: "1/-1" }}>
                    X (Twitter)
                    <div className="social-input">
                      <img src="/assets/social/x.svg" alt="X" />
                      <input
                        type="url"
                        placeholder="https://x.com/username"
                        value={data.socials.x}
                        onChange={(e) => updateField("socials.x", e.target.value)}
                      />
                    </div>
                  </label>

                  <label style={{ gridColumn: "1/-1" }}>
                    TikTok
                    <div className="social-input">
                      <img src="/assets/social/tiktok.svg" alt="TikTok" />
                      <input
                        type="url"
                        placeholder="https://tiktok.com/@username"
                        value={data.socials.tiktok}
                        onChange={(e) =>
                          updateField("socials.tiktok", e.target.value)
                        }
                      />
                    </div>
                  </label>

                  <label style={{ gridColumn: "1/-1" }}>
                    YouTube
                    <div className="social-input">
                      <img src="/assets/social/youtube.svg" alt="YouTube" />
                      <input
                        type="url"
                        placeholder="https://youtube.com/@username"
                        value={data.socials.youtube}
                        onChange={(e) =>
                          updateField("socials.youtube", e.target.value)
                        }
                      />
                    </div>
                  </label>
                </>
              )}

              {/* STEP 4 — Review */}
              {step === 4 && (
                <div className="review-card">
                  <div className="review">
                    <div className="kv"><div className="k">Name</div><div className="v">{data.firstName} {data.lastName}</div></div>
                    <div className="kv"><div className="k">Email</div><div className="v">{data.email}</div></div>
                    <div className="kv"><div className="k">Phone</div><div className="v">{data.phone}</div></div>
                    <div className="kv" style={{ gridColumn: "1/-1" }}>
                      <div className="k">Address</div>
                      <div className="v">{[data.address, data.city, data.state, data.zip].filter(Boolean).join(", ")}</div>
                    </div>

                    <div className="kv" style={{ gridColumn: "1/-1", marginTop: 10, borderTop:"1px dashed #e5e7eb", paddingTop:10 }}>
                      <div className="k">Allergies</div><div className="v">{data.allergies || "—"}</div>
                    </div>

                    <div className="kv">
                      <div className="k">Favorite Burgers</div>
                      <div className="v">{data.favoriteBurgers.length ? data.favoriteBurgers.join(", ") : "—"}</div>
                    </div>
                    <div className="kv">
                      <div className="k">Preferred Sides</div>
                      <div className="v">{data.preferredSides.length ? data.preferredSides.join(", ") : "—"}</div>
                    </div>

                    <div className="kv" style={{ gridColumn: "1/-1" }}>
                      <div className="k">Toppings</div>
                      <div className="v">
                        {toppingsList.map(t => (
                          <div key={t.key} style={{ display:"inline-block", marginRight:10 }}>
                            <strong>{t.label}:</strong> {data.toppings[t.key]}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="kv" style={{ gridColumn: "1/-1", marginTop: 10, borderTop:"1px dashed #e5e7eb", paddingTop:10 }}>
                      <div className="k">Socials</div>
                      <div className="v" style={{ display:"grid", gap:6 }}>
                        <div><strong>Facebook:</strong> {data.socials.facebook || "—"}</div>
                        <div><strong>Instagram:</strong> {data.socials.instagram || "—"}</div>
                        <div><strong>X:</strong> {data.socials.x || "—"}</div>
                        <div><strong>TikTok:</strong> {data.socials.tiktok || "—"}</div>
                        <div><strong>YouTube:</strong> {data.socials.youtube || "—"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setStep(step > 1 ? step - 1 : 1)}
                  disabled={step === 1}
                >
                  Back
                </button>
                <button type="submit" className="btn" disabled={!canNext || submitting}>
                  {step < 4 ? "Next" : submitting ? "Submitting…" : "Finish"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Theo card */}
          <div className="theo-card">
            <img src="/assets/theo-write.png" alt="Theo" />
            <h3 className="theo-title">Why register?</h3>
            <p className="theo-note">Unlock rewards, personalized offers, and VIP events — Theo’s got your back 😎</p>
          </div>
        </div>
      ) : (
        <div className="done-wrap">
          <div className="confetti" />
          <div className="done-card">
            <img src="/assets/theo-clap.png" alt="Theo clapping" style={{ maxWidth: 260 }} />
            <h2 className="done-title">Congratulations!</h2>
            <p className="done-note">Your SnapBurger account is ready. Welcome to the family! 🍔</p>
            <div style={{ marginTop:16 }}>
              <a href="/" className="btn" style={{ textDecoration:"none", display:"inline-block" }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
