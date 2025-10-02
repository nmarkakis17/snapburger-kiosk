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
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", zip: "",
    allergies: "", dietary: "", spiceTolerance: "medium",
    facebook: "", instagram: "", xhandle: "", tiktok: "", youtube: "",
    birthday: "", referralCode: "", promoOptIn: true, smsOptIn: true, emailOptIn: true,
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

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
          --panel:#ffffff; --border:#cdd5eb;
          --text:#0ea5e9; --muted:#555;
          --radius:18px;
        }
        html { background: var(--sb-bg); }
        body, #root { background: transparent; margin:0; }

        .global-haze{ position:fixed; inset:0; z-index:0; pointer-events:none; }

        .wrap{ position:relative; z-index:1; max-width:1000px; margin:0 auto; padding:24px; }
        .panel{ background: var(--panel); border:1px solid var(--border); border-radius:var(--radius); }
        .form-card{ padding:22px; display:grid; gap:16px; }

        .title{ margin:0; font-size:24px; font-weight:700; color:var(--blue); }
        .subtitle{ margin:0; color:var(--blue); }

        .row{ display:grid; gap:12px; grid-template-columns: 1fr 1fr; }
        .row-3{ display:grid; gap:12px; grid-template-columns: 1fr 1fr 1fr; }
        .col{ display:grid; gap:6px; }

        label{ color:var(--blue); font-weight:600; }
        input, textarea, select{
          width:100%; padding:12px; border-radius:12px; outline:none;
          border:1px solid var(--border); background:#fff; color:#000; font-size:15px;
        }
        textarea{ min-height: 90px; resize: vertical }

        .err{ color:#d00; font-size:12px; }

        .actions{ display:flex; gap:10px; justify-content:space-between; align-items:center; }
        .pill{ border:none; border-radius:999px; padding:12px 18px; font-weight:900; cursor:pointer;
          background: linear-gradient(135deg, var(--blue), var(--orange)); color:#fff;
          box-shadow: 0 10px 26px rgba(14,165,233,.28);
        }
        .ghost{ background:#eee; color:#333; border:1px solid var(--border) }

        .stepper{ display:flex; gap:8px; align-items:center; padding:12px 16px; border-bottom:1px solid var(--border); }
        .dot{ width:10px; height:10px; border-radius:50%; background:#ddd; }
        .dot.active{ background: var(--blue); }

        .theo{ display:grid; gap:10px; padding:18px; place-items:center; text-align:center; }
        .theo img{ display:block; width:min(320px, 70%); border-radius:16px; }
        .note{ color:var(--muted); font-size:13px; }

        .optins{ display:grid; gap:10px; grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width: 640px){ .optins{ grid-template-columns: 1fr; } }
      `}</style>

      <div className="global-haze" aria-hidden="true" />

      <div className="wrap">
        <form className="panel form-card" onSubmit={onSubmit}>
          <h2 className="title">{steps[step]}</h2>
          {/* Add fields here (same as earlier version) */}
          {/* ... */}
          <div className="actions">
            <button type="button" className="pill ghost" onClick={() => (step > 0 ? setStep(step-1) : navigate("/"))}>
              {step > 0 ? "Back" : "Cancel"}
            </button>
            {step < steps.length - 1 ? (
              <button type="button" className="pill" onClick={() => canNext && setStep(step+1)} disabled={!canNext}>
                Next →
              </button>
            ) : (
              <button type="submit" className="pill">Create Account</button>
            )}
          </div>
        </form>

        <aside className="panel theo">
          <img src="/assets/theo-write.png" alt="Theo" />
          <div className="note">
            Add your socials so we can celebrate your rewards publicly. Allergies help us suggest safe menu picks!
          </div>
        </aside>
      </div>
    </>
  );
}
