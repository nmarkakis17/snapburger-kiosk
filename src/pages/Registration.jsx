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
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    address1: "", address2: "", city: "", state: "", zip: "",
    allergies: "", dietary: "", spiceTolerance: "medium",
    facebook: "", instagram: "", xhandle: "", tiktok: "", youtube: "",
    birthday: "", referralCode: "",
    promoOptIn: true, smsOptIn: true, emailOptIn: true,
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // simple per-step validation
  const stepsErrors = {};
  if (step === 0) {
    if (!form.firstName) stepsErrors.firstName = "Required";
    if (!form.lastName) stepsErrors.lastName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) stepsErrors.email = "Valid email required";
    if (!form.password || form.password.length < 6) stepsErrors.password = "Min 6 chars";
    if (form.confirmPassword !== form.password) stepsErrors.confirmPassword = "Passwords must match";
  }
  const canNext = Object.keys(stepsErrors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Registration payload:", form);
    alert("Registered!");
    navigate("/");
  };

  return (
    <>
      <style>{`
        :root{
          --sb-bg:#0b1220;
          --blue:#0ea5e9; --orange:#f97316;
          --panel:#ffffff; --border:#d7def2;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; }

        /* ===== Page-scoped background (does not conflict with the rest of site) ===== */
        .reg-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.30), transparent 55%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.26), transparent 55%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.34), transparent 58%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.24), transparent 55%),
            linear-gradient(135deg, rgba(14,165,233,.16), rgba(249,115,22,.18) 60%),
            var(--sb-bg);
          filter:saturate(1.05);
          animation: regHazeDrift 26s ease-in-out infinite alternate;
        }
        @keyframes regHazeDrift{
          0%{ transform: translate3d(0,0,0) }
          100%{ transform: translate3d(-14px,8px,0) }
        }

        /* Electric sweep lines (subtle, multiple angles, random blinks) */
        .reg-lines{
          position:fixed; inset:0; z-index:1; pointer-events:none; overflow:hidden;
          mix-blend-mode: screen;
        }
        .reg-lines::before,
        .reg-lines::after{
          content:""; position:absolute; inset:-10%;
          background:
            repeating-linear-gradient(
              15deg,
              rgba(255,255,255,.06) 0px,
              rgba(255,255,255,.06) 1px,
              rgba(255,255,255,0) 14px,
              rgba(255,255,255,0) 26px
            );
          filter: blur(0.8px) saturate(1.05);
          animation: sweepA 5.8s linear infinite, blinkA 2.2s ease-in-out infinite alternate;
        }
        .reg-lines::after{
          background:
            repeating-linear-gradient(
              -22deg,
              rgba(255,255,255,.05) 0px,
              rgba(255,255,255,.05) 1px,
              rgba(255,255,255,0) 12px,
              rgba(255,255,255,0) 24px
            );
          animation: sweepB 6.4s linear infinite, blinkB 3.0s ease-in-out infinite alternate;
        }
        @keyframes sweepA{
          0%{ transform: translateX(-6%) }
          100%{ transform: translateX(6%) }
        }
        @keyframes sweepB{
          0%{ transform: translateY(-5%) }
          100%{ transform: translateY(5%) }
        }
        @keyframes blinkA{
          0%{ opacity:.18 } 100%{ opacity:.32 }
        }
        @keyframes blinkB{
          0%{ opacity:.14 } 100%{ opacity:.30 }
        }

        /* ===== Layout ===== */
        .wrap{
          position:relative; z-index:2;
          max-width:1320px;              /* wider account box */
          margin:0 auto; padding:28px; display:grid; gap:24px;
        }

        /* Theo panel — smaller card, slightly larger text, smaller Theo */
        .theo-panel{
          background:#fff; border:1px solid var(--border); border-radius:18px;
          padding:22px; max-width:780px; margin:0 auto; text-align:center;
          box-shadow: 0 10px 26px rgba(0,0,0,.12);
        }
        .theo-panel img{
          width:min(220px, 65%);        /* a tad smaller than before */
          display:block; margin:0 auto 14px;
        }
        .theo-panel .note{
          color: var(--blue);
          font-size: 18px;              /* bigger note text */
          line-height:1.55;
        }

        /* Registration panel (wider) */
        .panel{ background:#fff; border:1px solid var(--border); border-radius:18px; }
        .form-card{ padding:28px; display:grid; gap:18px; }
        .stepper{ display:flex; gap:8px; align-items:center; padding:12px 20px; border-bottom:1px solid var(--border); border-radius:18px 18px 0 0; }
        .dot{ width:12px; height:12px; border-radius:50%; background:#e3e8f7; }
        .dot.active{ background: var(--blue); }
        .title{ font-size:26px; font-weight:800; color:var(--blue); margin:0; }

        .row{ display:grid; grid-template-columns:1fr 1fr; column-gap:56px; row-gap:20px; } /* more space between columns */
        .row-3{ display:grid; grid-template-columns:1fr 1fr 1fr; column-gap:40px; row-gap:20px; }
        @media(max-width:900px){ .row{ grid-template-columns:1fr; } }
        @media(max-width:900px){ .row-3{ grid-template-columns:1fr; } }

        label{ color:var(--blue); font-weight:800; }
        input, textarea, select{
          padding:14px; border-radius:12px; border:1px solid var(--border);
          font-size:15px; color:#000; width:100%;
        }
        textarea{ min-height:80px; resize:vertical; }
        .err{ color:#d00; font-size:13px; }

        .actions{ display:flex; justify-content:space-between; gap:16px; margin-top:12px; }
        .pill{
          border:none; border-radius:999px; padding:12px 20px; font-weight:900; cursor:pointer;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#fff;
        }
        .ghost{ background:#f2f5ff; color:#333; border:1px solid var(--border) }
      `}</style>

      {/* Page-scoped background */}
      <div className="reg-haze" aria-hidden="true" />
      <div className="reg-lines" aria-hidden="true" />

      <div className="wrap">
        {/* Theo card (smaller) */}
        <div className="theo-panel">
          <img src="/assets/theo-write.png" alt="Theo mascot" />
          <div className="note">
            Register once and unlock SnapCoins, surprise upgrades, and personalized menu picks.
            Add allergies and socials so we can keep you safe and celebrate your milestones!
          </div>
        </div>

        {/* Registration form (wider) */}
        <form className="panel" onSubmit={onSubmit}>
          <div className="stepper">
            {steps.map((_, i) => <span key={i} className={`dot ${i <= step ? "active" : ""}`} />)}
            <div style={{marginLeft:"auto", color:"#333", fontWeight:600}}>
              Step {step+1}/{steps.length}
            </div>
          </div>

          <div className="form-card">
            <h2 className="title">{steps[step]}</h2>

            {step===0 && (
              <>
                <div className="row">
                  <div>
                    <label>First Name</label>
                    <input value={form.firstName} onChange={e=>update("firstName", e.target.value)} />
                    {stepsErrors.firstName && <div className="err">{stepsErrors.firstName}</div>}
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input value={form.lastName} onChange={e=>update("lastName", e.target.value)} />
                    {stepsErrors.lastName && <div className="err">{stepsErrors.lastName}</div>}
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label>Email</label>
                    <input value={form.email} onChange={e=>update("email", e.target.value)} />
                    {stepsErrors.email && <div className="err">{stepsErrors.email}</div>}
                  </div>
                  <div>
                    <label>Phone</label>
                    <input value={form.phone} onChange={e=>update("phone", e.target.value)} />
                    {stepsErrors.phone && <div className="err">{stepsErrors.phone}</div>}
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label>Password</label>
                    <input type="password" value={form.password} onChange={e=>update("password", e.target.value)} />
                    {stepsErrors.password && <div className="err">{stepsErrors.password}</div>}
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <input type="password" value={form.confirmPassword} onChange={e=>update("confirmPassword", e.target.value)} />
                    {stepsErrors.confirmPassword && <div className="err">{stepsErrors.confirmPassword}</div>}
                  </div>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="actions">
              <button type="button" className="pill ghost"
                onClick={()=> step>0 ? setStep(step-1) : navigate("/")}>
                {step>0 ? "Back" : "Cancel"}
              </button>
              {step<steps.length-1 ? (
                <button type="button" className="pill" disabled={!canNext} onClick={()=> setStep(step+1)}>Next →</button>
              ) : (
                <button type="submit" className="pill">Create Account</button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
