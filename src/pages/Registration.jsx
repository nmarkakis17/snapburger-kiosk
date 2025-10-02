import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();

  // --- Multi-step state ---
  const steps = useMemo(
    () => ["Account", "Contact", "Allergies", "Socials", "Rewards"],
    []
  );
  const [step, setStep] = useState(0);

  // --- Form state ---
  const [form, setForm] = useState({
    // Account
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Contact
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",

    // Allergies / prefs
    allergies: "",         // free text
    dietary: "",           // vegan, veg, halal, etc.
    spiceTolerance: "medium", // low | medium | high

    // Socials (separate fields)
    facebook: "",
    instagram: "",
    xhandle: "",
    tiktok: "",
    youtube: "",

    // Rewards prefs
    birthday: "",
    referralCode: "",
    promoOptIn: true,
    smsOptIn: true,
    emailOptIn: true,
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // --- Simple validation per step ---
  const errors = useMemo(() => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim()) e.lastName = "Last name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
      if (!/^\+?[\d\s().-]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    }
    if (step === 1) {
      if (!form.address1.trim()) e.address1 = "Address is required";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.state.trim()) e.state = "State is required";
      if (!form.zip.trim()) e.zip = "ZIP is required";
    }
    return e;
  }, [step, form]);

  const canNext = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    // Final submit — replace with your API call when ready
    console.log("Registration payload:", form);
    alert("Registered! (Check console for payload)");
    navigate("/"); // back to home
  };

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220;
          --blue:#0ea5e9; --orange:#f97316; --panel:#11172b;
          --border:#1f2a44; --text:#eef2ff; --muted:#b8c2ff;
          --radius:18px;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; color:var(--text); }

        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.34), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.30), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.40), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.28), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.22) 60%),
            var(--sb-bg);
          filter: saturate(1.05);
        }

        .wrap{ position:relative; z-index:1; max-width:1000px; margin:0 auto; padding:24px; }

        .topbar{
          display:flex; align-items:center; gap:12px; margin-bottom:16px;
        }
        .back{ border:none; border-radius:12px; padding:10px 14px; font-weight:800; cursor:pointer;
          background:linear-gradient(135deg, var(--blue), var(--orange)); color:#0b0e14;
          box-shadow:0 10px 26px rgba(14,165,233,.28);
        }

        .grid{
          display:grid; gap:18px;
          grid-template-columns: 1.15fr .85fr;
          align-items: stretch;
        }
        @media (max-width: 860px){
          .grid{ grid-template-columns: 1fr; }
        }

        .panel{
          background: rgba(12,19,38,.85);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: 0 12px 28px rgba(0,0,0,.35), inset 0 0 10px rgba(29,161,255,.10);
        }

        .form-card{ padding:22px; display:grid; gap:16px; }

        .title{ margin:0; font-size:24px; color:#1da1ff; }
        .subtitle{ margin:0; color:var(--muted) }

        .row{ display:grid; gap:12px; grid-template-columns: 1fr 1fr; }
        .row-3{ display:grid; gap:12px; grid-template-columns: 1fr 1fr 1fr; }
        .col{ display:grid; gap:6px; }
        label small{ color: var(--muted); font-size: 12px; }
        input, textarea, select{
          width:100%; padding:12px 12px; border-radius:12px; outline:none;
          border:1px solid var(--border); background:#0c1326; color:var(--text);
        }
        textarea{ min-height: 90px; resize: vertical }

        .err{ color:#ffb4b4; font-size:12px; }

        .actions{ display:flex; gap:10px; justify-content:space-between; align-items:center; }
        .pill{
          border:none; border-radius:999px; padding:12px 18px; font-weight:900; cursor:pointer;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#0b0e14;
          box-shadow: 0 10px 26px rgba(14,165,233,.28);
        }
        .ghost{ background: transparent; color: var(--text); border:1px solid var(--border) }

        .stepper{
          display:flex; gap:8px; align-items:center; padding:12px 16px; border-bottom:1px solid var(--border);
          background: linear-gradient(180deg, rgba(13,20,35,.7), rgba(13,20,35,.35));
          border-top-left-radius: var(--radius); border-top-right-radius: var(--radius);
        }
        .dot{
          width:10px; height:10px; border-radius:50%; background:#223;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,.06);
        }
        .dot.active{ background: linear-gradient(135deg, var(--blue), var(--orange)); }

        .theo{
          display:grid; gap:10px; padding:18px; place-items:center; text-align:center;
        }
        .theo img{
          display:block; width:min(320px, 70%); height:auto; border-radius:16px;
          border:1px solid var(--border);
          box-shadow:0 16px 36px rgba(0,0,0,.4);
        }
        .note{ color:var(--muted); font-size:13px; }

        .optins{ display:grid; gap:10px; grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width: 640px){ .optins{ grid-template-columns: 1fr; } }

      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <div className="wrap">
        <div className="topbar">
          <button className="back" onClick={() => navigate("/")}>← Back</button>
          <div className="subtitle">Create your SnapBurger account</div>
        </div>

        <div className="grid">
          {/* Left: form */}
          <form className="panel form-card" onSubmit={onSubmit}>
            {/* Stepper */}
            <div className="stepper">
              {steps.map((_, i) => (
                <span key={i} className={`dot ${i === step ? "active" : ""}`} />
              ))}
              <div style={{marginLeft:8, color:"#9fb3ff", fontWeight:700}}>
                {steps[step]}
              </div>
            </div>

            {step === 0 && (
              <>
                <h2 className="title">Account</h2>
                <div className="row">
                  <div className="col">
                    <label>First Name</label>
                    <input value={form.firstName} onChange={(e)=>update("firstName", e.target.value)} />
                    {errors.firstName && <div className="err">{errors.firstName}</div>}
                  </div>
                  <div className="col">
                    <label>Last Name</label>
                    <input value={form.lastName} onChange={(e)=>update("lastName", e.target.value)} />
                    {errors.lastName && <div className="err">{errors.lastName}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={(e)=>update("email", e.target.value)} placeholder="you@example.com" />
                    {errors.email && <div className="err">{errors.email}</div>}
                  </div>
                  <div className="col">
                    <label>Phone</label>
                    <input value={form.phone} onChange={(e)=>update("phone", e.target.value)} placeholder="(555) 555-5555" />
                    {errors.phone && <div className="err">{errors.phone}</div>}
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="title">Contact</h2>
                <div className="col">
                  <label>Address</label>
                  <input value={form.address1} onChange={(e)=>update("address1", e.target.value)} placeholder="Street address" />
                  {errors.address1 && <div className="err">{errors.address1}</div>}
                </div>
                <div className="col">
                  <label>Address (Line 2) <small>Optional</small></label>
                  <input value={form.address2} onChange={(e)=>update("address2", e.target.value)} placeholder="Apt, suite, etc." />
                </div>
                <div className="row-3">
                  <div className="col">
                    <label>City</label>
                    <input value={form.city} onChange={(e)=>update("city", e.target.value)} />
                    {errors.city && <div className="err">{errors.city}</div>}
                  </div>
                  <div className="col">
                    <label>State</label>
                    <input value={form.state} onChange={(e)=>update("state", e.target.value)} />
                    {errors.state && <div className="err">{errors.state}</div>}
                  </div>
                  <div className="col">
                    <label>ZIP</label>
                    <input value={form.zip} onChange={(e)=>update("zip", e.target.value)} />
                    {errors.zip && <div className="err">{errors.zip}</div>}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="title">Allergies & Preferences</h2>
                <div className="col">
                  <label>Allergies <small>Comma-separated (e.g., peanuts, shellfish)</small></label>
                  <textarea value={form.allergies} onChange={(e)=>update("allergies", e.target.value)} />
                </div>
                <div className="row">
                  <div className="col">
                    <label>Dietary Preference</label>
                    <select value={form.dietary} onChange={(e)=>update("dietary", e.target.value)}>
                      <option value="">None</option>
                      <option value="vegan">Vegan</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="halal">Halal</option>
                      <option value="kosher">Kosher</option>
                      <option value="gluten-free">Gluten-free</option>
                      <option value="dairy-free">Dairy-free</option>
                    </select>
                  </div>
                  <div className="col">
                    <label>Spice Tolerance</label>
                    <select value={form.spiceTolerance} onChange={(e)=>update("spiceTolerance", e.target.value)}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="title">Socials</h2>
                <p className="subtitle">Optional — helps us tag you in rewards shoutouts.</p>
                <div className="col">
                  <label>Facebook Username or URL</label>
                  <input value={form.facebook} onChange={(e)=>update("facebook", e.target.value)} placeholder="@yourname or full URL" />
                </div>
                <div className="col">
                  <label>Instagram Handle</label>
                  <input value={form.instagram} onChange={(e)=>update("instagram", e.target.value)} placeholder="@yourname" />
                </div>
                <div className="col">
                  <label>X (Twitter) Handle</label>
                  <input value={form.xhandle} onChange={(e)=>update("xhandle", e.target.value)} placeholder="@yourname" />
                </div>
                <div className="col">
                  <label>TikTok Handle</label>
                  <input value={form.tiktok} onChange={(e)=>update("tiktok", e.target.value)} placeholder="@yourname" />
                </div>
                <div className="col">
                  <label>YouTube Channel URL</label>
                  <input value={form.youtube} onChange={(e)=>update("youtube", e.target.value)} placeholder="https://youtube.com/@yourname" />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="title">Rewards & Notifications</h2>
                <div className="row">
                  <div className="col">
                    <label>Birthday <small>For free-treat promos 🎉</small></label>
                    <input type="date" value={form.birthday} onChange={(e)=>update("birthday", e.target.value)} />
                  </div>
                  <div className="col">
                    <label>Referral Code <small>If a friend sent you</small></label>
                    <input value={form.referralCode} onChange={(e)=>update("referralCode", e.target.value)} />
                  </div>
                </div>

                <div className="optins">
                  <label><input type="checkbox" checked={form.promoOptIn} onChange={(e)=>update("promoOptIn", e.target.checked)} /> Receive rewards & promos</label>
                  <label><input type="checkbox" checked={form.smsOptIn} onChange={(e)=>update("smsOptIn", e.target.checked)} /> SMS updates</label>
                  <label><input type="checkbox" checked={form.emailOptIn} onChange={(e)=>update("emailOptIn", e.target.checked)} /> Email updates</label>
                </div>

                <div className="note">We’ll never sell your data. You can change notification preferences anytime.</div>
              </>
            )}

            {/* Nav actions */}
            <div className="actions">
              <button
                type="button"
                className="pill ghost"
                onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))}
              >
                {step > 0 ? "Back" : "Cancel"}
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className="pill"
                  onClick={() => canNext && setStep(step + 1)}
                  disabled={!canNext}
                  title={!canNext ? "Complete required fields to continue" : "Next"}
                >
                  Next →
                </button>
              ) : (
                <button type="submit" className="pill">Create Account</button>
              )}
            </div>
          </form>

          {/* Right: Theo + tips */}
          <aside className="panel theo">
            <img src="/assets/theo-write.png" alt="Theo is taking notes" />
            <div>
              <h3 style={{margin:"6px 0 4px"}}>Theo’s Tip</h3>
              <div className="note">
                Add your socials so we can celebrate your rewards publicly (only with your permission!).
                Allergies help us suggest safe menu picks automatically.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
