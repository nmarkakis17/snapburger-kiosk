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

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const Box = ({ children, style }) => (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "28px",
        maxWidth: "900px",
        margin: "0 auto",
        color: "#000",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        ...style
      }}
    >
      {children}
    </div>
  );

  return (
    <Box>
      {step === 1 && (
        <>
          <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Account Information</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 24px",
            }}
          >
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
          <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Preferences</h2>
          <textarea
            placeholder="Allergies / Dietary Restrictions"
            value={form.allergies}
            onChange={e => handleChange("allergies", e.target.value)}
            style={{ width: "100%", minHeight: 100, marginBottom: 16 }}
          />
          <h3 style={{ color: "var(--orange)", margin: "12px 0 8px" }}>Favorite Burgers</h3>
          <label><input type="checkbox" onChange={e => {
            const v = "Byte Burger"; handleChange("burgerPrefs", e.target.checked ? [...new Set([...form.burgerPrefs, v])] : form.burgerPrefs.filter(x => x !== v));
          }} /> Byte Burger</label>
          <br />
          <label><input type="checkbox" onChange={e => {
            const v = "MegaByte"; handleChange("burgerPrefs", e.target.checked ? [...new Set([...form.burgerPrefs, v])] : form.burgerPrefs.filter(x => x !== v));
          }} /> MegaByte</label>
          <br />
          <label><input type="checkbox" onChange={e => {
            const v = "BaconByte Burger"; handleChange("burgerPrefs", e.target.checked ? [...new Set([...form.burgerPrefs, v])] : form.burgerPrefs.filter(x => x !== v));
          }} /> BaconByte Burger</label>

          <h3 style={{ color: "var(--orange)", margin: "16px 0 8px" }}>Preferred Sides</h3>
          <label><input type="checkbox" onChange={e => {
            const v = "Fries"; handleChange("sidePrefs", e.target.checked ? [...new Set([...form.sidePrefs, v])] : form.sidePrefs.filter(x => x !== v));
          }} /> Fries</label>
          <br />
          <label><input type="checkbox" onChange={e => {
            const v = "Onion Rings"; handleChange("sidePrefs", e.target.checked ? [...new Set([...form.sidePrefs, v])] : form.sidePrefs.filter(x => x !== v));
          }} /> Onion Rings</label>
          <br />
          <label><input type="checkbox" onChange={e => {
            const v = "Salad"; handleChange("sidePrefs", e.target.checked ? [...new Set([...form.sidePrefs, v])] : form.sidePrefs.filter(x => x !== v));
          }} /> Salad</label>
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Social Media</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { key: "facebook", label: "Facebook", icon: "/assets/social/facebook.svg" },
              { key: "instagram", label: "Instagram", icon: "/assets/social/instagram.svg" },
              { key: "x", label: "X", icon: "/assets/social/x.svg" },
              { key: "youtube", label: "YouTube", icon: "/assets/social/youtube.svg" },
              { key: "tiktok", label: "TikTok", icon: "/assets/social/tiktok.svg" },
            ].map(({ key, label, icon }) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src={icon} alt={label} width="22" height="22" />
                <input
                  placeholder={`${label} Username/URL`}
                  value={form[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Review Your Information</h2>
          <div style={{ background: "#f7f7f7", borderRadius: 12, padding: 16, lineHeight: 1.5 }}>
            <p><b>Name:</b> {form.name}</p>
            <p><b>Phone:</b> {form.phone}</p>
            <p><b>Email:</b> {form.email}</p>
            <p><b>Address:</b> {form.address}, {form.city}, {form.state} {form.zip}</p>
            <p><b>Allergies:</b> {form.allergies || "—"}</p>
            <p><b>Burgers:</b> {form.burgerPrefs.length ? form.burgerPrefs.join(", ") : "—"}</p>
            <p><b>Sides:</b> {form.sidePrefs.length ? form.sidePrefs.join(", ") : "—"}</p>
            <p><b>Facebook:</b> {form.facebook || "—"}</p>
            <p><b>Instagram:</b> {form.instagram || "—"}</p>
            <p><b>X:</b> {form.x || "—"}</p>
            <p><b>YouTube:</b> {form.youtube || "—"}</p>
            <p><b>TikTok:</b> {form.tiktok || "—"}</p>
          </div>
        </>
      )}

      {step === 5 && (
        <div style={{ textAlign: "center", color: "var(--blue)" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, display: "inline-block", boxShadow: "0 10px 30px rgba(0,0,0,.15)" }}>
            <img src="/assets/theo-clap.png" alt="Theo Clapping" style={{ maxWidth: 180, marginBottom: 12 }} />
            <h2 style={{ margin: "8px 0" }}>Congratulations!</h2>
            <p style={{ margin: 0 }}>
              Theo welcomes you to the <span style={{ color: "var(--orange)", fontWeight: 800 }}>SnapBurger</span> family!
            </p>
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "space-between" }}>
        <button onClick={onCancel} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: 8 }}>
          Cancel
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {step > 1 && step < 5 && (
            <button onClick={() => setStep(step - 1)} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: 8 }}>
              Back
            </button>
          )}
          {step < 5 && (
            <button onClick={() => setStep(step + 1)} style={{ background: "var(--orange)", color: "#fff", padding: "10px 20px", borderRadius: 8 }}>
              Next
            </button>
          )}
          {step === 5 && (
            <button onClick={onCancel} style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", borderRadius: 8 }}>
              Done
            </button>
          )}
        </div>
      </div>
    </Box>
  );
}
