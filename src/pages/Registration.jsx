// src/pages/Registration.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();

  const steps = useMemo(
    () => ["Account", "Contact", "Allergies", "Socials", "Rewards"],
    []
  );
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    // Account
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Contact
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    // Allergies
    allergies: "",
    dietary: "",
    spiceTolerance: "medium",
    // Socials (separate handles)
    facebook: "",
    instagram: "",
    xhandle: "",
    tiktok: "",
    youtube: "",
    // Rewards / preferences
    birthday: "",
    referralCode: "",
    promoOptIn: true,
    smsOptIn: true,
    emailOptIn: true,
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const errors = useMemo(() => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim()) e.lastName = "Last name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
      if (!/^\+?[\d\s().-]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
      if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
      if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords must match";
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
    // TODO: send to your API
    console.log("Registration payload:", form);
    alert("Registered! (Check console for payload)");
    navigate("/");
  };

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220;
          --blue:#0ea5e9; --orange:#f97316;
          --panel:#ffffff; --border:#d7def2;
          --text:#0ea5e9; --muted:#566;
          --radius:18px;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; }

        .global-haze{ position:fixed; inset:0; z-index:0; pointer-events:none; }

        .wrap{
          position:relative; z-index:1;
          max-width:1100px; margin:0 auto; padding:24px;
          display:grid; gap:16px; grid-template-columns: 2fr 1fr;
        }
        @media (max-width: 940px){
          .wrap{ grid-template-columns: 1fr; }
        }

        .panel{ background: var(--panel); border:1px solid var(--border); border-radius:var(--radius); }
        .form-card{ padding:22px; display:grid; gap:16px; }

        .title{ margin:0; font-size:24px; font-weight:800; color:var(--blue); }
        .subtitle{ margin:0; color:var(--blue); }

        .stepper{ display:flex; gap:8px; align-items:center; padding:12px 16px; border-bottom:1px solid var(--border); border-radius:var(--radius) var(--radius) 0 0; background:#fff; }
        .dot{ width:10px; height:10px; border-radius:50%; background:#e3e8f7; }
        .dot.active{ background: var(--blue); }

        .row{ display:grid; gap:12px; grid-template-columns: 1fr 1fr; }
        .row-3{ display:grid; gap:12px; grid-template-columns: 1fr 1fr 1fr; }
        .col{ display:grid; gap:6px; }
        @media (max-width: 640px){
          .row, .row-3{ grid-template-columns: 1fr; }
        }

        label{ color:var(--blue); font-weight:700; }
        input, textarea, select{
          width:100%; padding:12px; border-radius:12px; outline:none;
          border:1px solid var(--border); background:#fff; color:#000; font-size:15px;
        }
        textarea{ min-height: 90px; resize: vertical }

        .help{ color:#333; font-size:12px; }
        .err{ color:#d00; font-size:12px; }

        .optins{ display:grid; gap:10px; grid-template-columns: 1fr 1fr 1fr; }
        .optins label{ color:#333; font-weight:600 }
        @media (max-width: 640px){ .optins{ grid-template-columns: 1fr; } }

        .actions{ display:flex; gap:10px; justify-content:space-between; align-items:center; }
        .pill{ border:none; border-radius:999px; padding:12px 18px; font-weight:900; cursor:pointer;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#fff;
          box-shadow: 0 10px 26px rgba(14,165,233,.28);
        }
        .ghost{ background:#f2f5ff; color:#333; border:1px solid var(--border) }

        .theo{ display:grid; gap:10px; padding:18px; place-items:center; text-align:center; }
        .theo img{ display:block; width:min(320px, 80%); border-radius:16px; }
        .note{ color:var(--muted); font-size:13px; line-height:1.35; padding:0 6px; }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <form className="wrap" onSubmit={onSubmit}>
        {/* LEFT: form */}
        <section className="panel">
          <div className="stepper">
            {steps.map((_, i) => (
              <span key={i} className={`dot ${i <= step ? "active" : ""}`} />
            ))}
            <div style={{marginLeft:"auto", color:"#6b7", fontWeight:700}}>
              Step {step + 1} / {steps.length}
            </div>
          </div>

          <div className="form-card">
            <h2 className="title">{steps[step]}</h2>

            {/* STEP 0 — ACCOUNT */}
            {step === 0 && (
              <>
                <div className="row">
                  <div className="col">
                    <label>First Name</label>
                    <input
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="Theo"
                    />
                    {errors.firstName && <div className="err">{errors.firstName}</div>}
                  </div>
                  <div className="col">
                    <label>Last Name</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Snap"
                    />
                    {errors.lastName && <div className="err">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label>Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                    />
                    {errors.email && <div className="err">{errors.email}</div>}
                  </div>
                  <div className="col">
                    <label>Mobile Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                    />
                    {errors.phone && <div className="err">{errors.phone}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label>Password</label>
                    <input
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      type="password"
                      placeholder="Minimum 6 characters"
                    />
                    {errors.password && <div className="err">{errors.password}</div>}
                  </div>
                  <div className="col">
                    <label>Confirm Password</label>
                    <input
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      type="password"
                      placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && <div className="err">{errors.confirmPassword}</div>}
                  </div>
                </div>
              </>
            )}

            {/* STEP 1 — CONTACT */}
            {step === 1 && (
              <>
                <div className="col">
                  <label>Street Address</label>
                  <input
                    value={form.address1}
                    onChange={(e) => update("address1", e.target.value)}
                    placeholder="123 Snap St"
                  />
                  {errors.address1 && <div className="err">{errors.address1}</div>}
                </div>
                <div className="col">
                  <label>Apartment / Suite (optional)</label>
                  <input
                    value={form.address2}
                    onChange={(e) => update("address2", e.target.value)}
                    placeholder="Unit 4B"
                  />
                </div>
                <div className="row-3">
                  <div className="col">
                    <label>City</label>
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="San Francisco"
                    />
                    {errors.city && <div className="err">{errors.city}</div>}
                  </div>
                  <div className="col">
                    <label>State</label>
                    <input
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      placeholder="CA"
                    />
                    {errors.state && <div className="err">{errors.state}</div>}
                  </div>
                  <div className="col">
                    <label>ZIP</label>
                    <input
                      value={form.zip}
                      onChange={(e) => update("zip", e.target.value)}
                      placeholder="94107"
                    />
                    {errors.zip && <div className="err">{errors.zip}</div>}
                  </div>
                </div>
              </>
            )}

            {/* STEP 2 — ALLERGIES */}
            {step === 2 && (
              <>
                <div className="col">
                  <label>Allergies</label>
                  <textarea
                    value={form.allergies}
                    onChange={(e) => update("allergies", e.target.value)}
                    placeholder="e.g., peanuts, shellfish"
                  />
                  <div className="help">We’ll use this to filter menu suggestions.</div>
                </div>
                <div className="col">
                  <label>Dietary Preferences</label>
                  <textarea
                    value={form.dietary}
                    onChange={(e) => update("dietary", e.target.value)}
                    placeholder="e.g., vegetarian, halal, gluten-free"
                  />
                </div>
                <div className="col">
                  <label>Spice Tolerance</label>
                  <select
                    value={form.spiceTolerance}
                    onChange={(e) => update("spiceTolerance", e.target.value)}
                  >
                    <option value="mild">Mild</option>
                    <option value="medium">Medium</option>
                    <option value="hot">Hot</option>
                    <option value="inferno">Inferno</option>
                  </select>
                </div>
              </>
            )}

            {/* STEP 3 — SOCIALS (specific per platform) */}
            {step === 3 && (
              <>
                <div className="col">
                  <label>Facebook</label>
                  <input
                    value={form.facebook}
                    onChange={(e) => update("facebook", e.target.value)}
                    placeholder="facebook.com/yourname"
                  />
                </div>
                <div className="col">
                  <label>Instagram</label>
                  <input
                    value={form.instagram}
                    onChange={(e) => update("instagram", e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="col">
                  <label>X (Twitter)</label>
                  <input
                    value={form.xhandle}
                    onChange={(e) => update("xhandle", e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="col">
                  <label>TikTok</label>
                  <input
                    value={form.tiktok}
                    onChange={(e) => update("tiktok", e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="col">
                  <label>YouTube</label>
                  <input
                    value={form.youtube}
                    onChange={(e) => update("youtube", e.target.value)}
                    placeholder="youtube.com/@yourchannel"
                  />
                </div>
                <div className="help">
                  Add your socials so we can tag you on features and amplify your rewards moments.
                </div>
              </>
            )}

            {/* STEP 4 — REWARDS & OPT-INS */}
            {step === 4 && (
              <>
                <div className="row">
                  <div className="col">
                    <label>Birthday</label>
                    <input
                      type="date"
                      value={form.birthday}
                      onChange={(e) => update("birthday", e.target.value)}
                    />
                    <div className="help">Free birthday treat and double SnapCoins 🎉</div>
                  </div>
                  <div className="col">
                    <label>Referral Code (optional)</label>
                    <input
                      value={form.referralCode}
                      onChange={(e) => update("referralCode", e.target.value)}
                      placeholder="Who sent you?"
                    />
                  </div>
                </div>

                <div className="optins">
                  <label>
                    <input
                      type="checkbox"
                      checked={form.promoOptIn}
                      onChange={(e) => update("promoOptIn", e.target.checked)}
                      style={{ marginRight: 8 }}
                    />
                    I want promos and early access deals
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.smsOptIn}
                      onChange={(e) => update("smsOptIn", e.target.checked)}
                      style={{ marginRight: 8 }}
                    />
                    SMS updates (order status, rewards)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.emailOptIn}
                      onChange={(e) => update("emailOptIn", e.target.checked)}
                      style={{ marginRight: 8 }}
                    />
                    Email updates (news, perks)
                  </label>
                </div>
              </>
            )}

            {/* Actions */}
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
                >
                  Next →
                </button>
              ) : (
                <button type="submit" className="pill">
                  Create Account
                </button>
              )}
            </div>
          </div>
        </section>

        {/* RIGHT: Theo & note */}
        <aside className="panel theo">
          <img src="/assets/theo-write.png" alt="Theo" />
          <div className="note">
            Register once and unlock SnapCoins, surprise upgrades,
            and hyper-personalized menu picks. Add allergies and socials so we
            can keep you safe and celebrate your milestones publicly!
          </div>
        </aside>
      </form>
    </>
  );
}

