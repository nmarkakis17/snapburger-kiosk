// src/pages/Registration.jsx
import React, { useState } from "react";

export default function Registration({ onCancel }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    allergies: "",
    burgerPrefs: [],
    sidePrefs: [],
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    tiktok: ""
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
        color: "#000"
      }}
    >
      {step === 1 && (
        <>
          <h2 style={{ color: "var(--blue)" }}>Account Information</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <input placeholder="Full Name" value={form.name} onChange={e => handleChange("name", e.target.value)} />
            <input placeholder="Phone Number" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
            <input placeholder="Email Address" value={form.email} onChange={e => handleChange("email", e.target.value)} />
            <input placeholder="Street Address" value={form.address} onChange={e => handleChange("address", e.target.value)} />
            <input placeholder="City" value={form.city} onChange={e => handleChange("city", e.target.value)} />
            <input placeholder="State" value={form.state} onChange={e => handleChange("state", e.target.value)} />
            <input placeholder="ZIP Code" value={form.zip} onChange={e => handleChange("zip", e.target.value)} />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ color: "var(--blue)" }}>Preferences</h2>
          <textarea
            placeholder="Allergies / Dietary Restrictions"
            value={form.allergies}
            onChange={e => handleChange("allergies", e.target.value)}
            style={{ width: "100%", minHeight: "80px", marginBottom: "16px" }}
          />
          <h3 style={{ color: "var(--orange)" }}>Favorite Burgers</h3>
          <label><input type="checkbox" /> Byte Burger</label>
          <label><input type="checkbox" /> MegaByte</label>
          <label><input type="checkbox" /> BaconByte Burger</label>
          <h3 style={{ color: "var(--orange)", marginTop: "12px" }}>Preferred Sides</h3>
          <label><input type="checkbox" /> Fries</label>
          <label><input type="checkbox" /> Onion Rings</label>
          <label><input type="checkbox" /> Salad</label>
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ color: "var(--blue)" }}>Social Media</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/assets/social/facebook.svg" alt="Facebook" width="24" />
              <input placeholder="Facebook Username/URL" value={form.facebook} onChange={e => handleChange("facebook", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/assets/social/instagram.svg" alt="Instagram" width="24" />
              <input placeholder="Instagram Username/URL" value={form.instagram} onChange={e => handleChange("instagram", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/assets/social/x.svg" alt="X" width="24" />
              <input placeholder="X Username/URL" value={form.x} onChange={e => handleChange("x", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/assets/social/youtube.svg" alt="YouTube" width="24" />
              <input placeholder="YouTube Channel/URL" value={form.youtube} onChange={e => handleChange("youtube", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/assets/social/tiktok.svg" alt="TikTok" width="24" />
              <input placeholder="TikTok Username/URL" value={form.tiktok} onChange={e => handleChange("tiktok", e.target.value)} />
            </div>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ color: "var(--blue)" }}>Review Your Information</h2>
          <div style={{ background: "#f7f7f7", borderRadius: "12px", padding: "16px" }}>
            <p><b>Name:</b> {form.name}</p>
            <p><b>Phone:</b> {form.phone}</p>
            <p><b>Email:</b> {form.email}</p>
            <p><b>Address:</b> {form.address}, {form.city}, {form.state} {form.zip}</p>
            <p><b>Allergies:</b> {form.allergies}</p>
            <p><b>Facebook:</b> {form.facebook}</p>
            <p><b>Instagram:</b> {form.instagram}</p>
            <p><b>X:</b> {form.x}</p>
            <p><b>YouTube:</b> {form.youtube}</p>
            <p><b>TikTok:</b> {form.tiktok}</p>
          </div>
        </>
      )}

      {step === 5 && (
        <div style={{ textAlign: "center", color: "var(--blue)" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", display: "inline-block" }}>
            <img src="/assets/theo-clap.png" alt="Theo Clapping" style={{ maxWidth: "180px", marginBottom: "12px" }} />
            <h2>Congratulations!</h2>
            <p>
              Theo welcomes you to the <span style={{ color: "var(--orange)" }}>SnapBurger</span> family!
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && step < 5 && (
          <button onClick={() => setStep(step - 1)} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: "8px" }}>
            Back
          </button>
        )}
        {step < 5 && (
          <button onClick={() => setStep(step + 1)} style={{ background: "var(--orange)", color: "#fff", padding: "10px 20px", borderRadius: "8px" }}>
            Next
          </button>
        )}
        {step === 5 && (
          <button onClick={onCancel} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: "8px" }}>
            Done
          </button>
        )}
        <button onClick={onCancel} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: "8px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
