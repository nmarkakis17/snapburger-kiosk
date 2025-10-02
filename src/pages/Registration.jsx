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

        .wrap{ max-width:1200px; margin:0 auto; padding:28px; display:grid; gap:24px; }

        .panel{ background:#fff; border:1px solid var(--border); border-radius:18px; }
        .form-card{ padding:28px; display:grid; gap:18px; }

        .stepper{ display:flex; gap:8px; align-items:center; padding:12px 20px; border-bottom:1px solid var(--border); border-radius:18px 18px 0 0; }
        .dot{ width:12px; height:12px; border-radius:50%; background:#e3e8f7; }
        .dot.active{ background: var(--blue); }
        .title{ font-size:24px; font-weight:800; color:var(--blue); margin:0; }

        .row{ display:grid; grid-template-columns:1fr 1fr; column-gap:40px; row-gap:20px; }  /* wider gap */
        .row-3{ display:grid; grid-template-columns:1fr 1fr 1fr; column-gap:30px; row-gap:20px; }
        @media(max-width:720px){ .row, .row-3{ grid-template-columns:1fr; } }

        label{ color:var(--blue); font-weight:700; }
        input, textarea, select{ padding:14px; border-radius:12px; border:1px solid var(--border); font-size:15px; color:#000; }
        textarea{ min-height:80px; resize:vertical; }
        .err{ color:#d00; font-size:13px; }

        .actions{ display:flex; justify-content:space-between; gap:16px; margin-top:12px; }
        .pill{ border:none; border-radius:999px; padding:12px 20px; font-weight:900; cursor:pointer;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#fff; }
        .ghost{ background:#f2f5ff; color:#333; border:1px solid var(--border) }

        /* Theo panel */
        .theo-panel{ background:#fff; border:1px solid var(--border); border-radius:18px; padding:30px; text-align:center; }
        .theo-panel img{ width:min(300px, 70%); display:block; margin:0 auto 20px; } /* half size */
        .theo-panel .note{ color:var(--blue); font-size:16px; line-height:1.5; max-width:650px; margin:0 auto; }
      `}</style>

      <div className="wrap">
        {/* Theo on top */}
        <div className="theo-panel">
          <img src="/assets/theo-write.png" alt="Theo mascot" />
          <div className="note">
            Register once and unlock SnapCoins, surprise upgrades, and personalized menu picks. 
            Add allergies and socials so we can keep you safe and celebrate your milestones!
          </div>
        </div>

        {/* Form */}
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
