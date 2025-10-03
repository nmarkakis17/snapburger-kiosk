// src/pages/Registration.jsx
import React, { useState, useMemo } from "react";

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

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // simple checkbox toggler
  const toggleIn = (field, value) =>
    setForm((prev) => {
      const arr = prev[field] || [];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });

  const burgers = useMemo(() => ["Byte Burger", "MegaByte", "BaconByte Burger", "AI Veggie Byte"], []);
  const sides   = useMemo(() => ["Fries", "Onion Rings", "Salad", "Tater Tots"], []);

  const Box = ({ children, style }) => (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        maxWidth: 1100,
        margin: "0 auto",
        color: "#000",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        display: "flex",
        alignItems: "flex-start",
        // This gap is between LEFT (form) and RIGHT (Theo panel)
        gap: 48,
        ...style,
      }}
    >
      {children}
    </div>
  );

  const button = {
    background: "linear-gradient(135deg, var(--blue), var(--orange))",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  };

  // shared input style (prevents “1 character only” layout clamping)
  const inputStyle = {
    width: "100%",
    minWidth: 0,         // <- critical so grid/flex never shrinks to content width
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #d7dbe6",
    outline: "none",
  };

  return (
    <Box>
      {/* LEFT: Registration content */}
      <div style={{ flex: 2 }}>
        <style>{`
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 56px;  /* <- more space between the two columns */
            row-gap: 10px;     /* <- tightened row spacing */
          }
          .reviewBox {
            background:#f7f7f7;
            border-radius:12px;
            padding:16px;
          }
        `}</style>

        {step === 1 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Account Information</h2>
            <div className="two-col" style={{ paddingRight: 24 }}>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={inputStyle}
                autoComplete="name"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                style={inputStyle}
                autoComplete="tel"
                inputMode="tel"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle}
                autoComplete="email"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                style={inputStyle}
                autoComplete="address-line1"
              />
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                style={inputStyle}
                autoComplete="address-level2"
              />
              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                style={inputStyle}
                autoComplete="address-level1"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
                style={inputStyle}
                autoComplete="postal-code"
                inputMode="numeric"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Preferences</h2>
            <textarea
              placeholder="Allergies / Dietary Restrictions"
              value={form.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
              style={{ ...inputStyle, minHeight: 110 }}
            />
            <h3 style={{ color: "var(--orange)", margin: "14px 0 6px" }}>Favorite Burgers</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {burgers.map((b) => (
                <label key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={form.burgerPrefs.includes(b)}
                    onChange={() => toggleIn("burgerPrefs", b)}
                  />
                  {b}
                </label>
              ))}
            </div>

            <h3 style={{ color: "var(--orange)", margin: "16px 0 6px" }}>Preferred Sides</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {sides.map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={form.sidePrefs.includes(s)}
                    onChange={() => toggleIn("sidePrefs", s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Social Media</h2>
            <div style={{ display: "grid", gap: 10 }}>
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
                    type="text"
                    placeholder={`${label} Username/URL`}
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Review</h2>
            <div className="reviewBox">
              <p><b style={{ color: "var(--blue)" }}>Name:</b> {form.name || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Email:</b> {form.email || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Phone:</b> {form.phone || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Address:</b> {form.address || "—"}, {form.city || "—"}, {form.state || "—"} {form.zip || ""}</p>
              <p><b style={{ color: "var(--blue)" }}>Burgers:</b> {form.burgerPrefs.join(", ") || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Sides:</b> {form.sidePrefs.join(", ") || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Allergies:</b> {form.allergies || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Facebook:</b> {form.facebook || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>Instagram:</b> {form.instagram || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>X:</b> {form.x || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>YouTube:</b> {form.youtube || "—"}</p>
              <p><b style={{ color: "var(--blue)" }}>TikTok:</b> {form.tiktok || "—"}</p>
            </div>
          </>
        )}

        {step === 5 && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                display: "inline-block",
                boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              }}
            >
              <img
                src="/assets/theo-clap.png"
                alt="Theo Clapping"
                style={{ maxWidth: 180, display: "block", margin: "0 auto 8px" }}
              />
              <h2 style={{ margin: "6px 0 8px", color: "var(--blue)" }}>Congratulations!</h2>
              <p style={{ margin: 0 }}>
                Theo welcomes you to the{" "}
                <span style={{ color: "var(--orange)", fontWeight: 800 }}>SnapBurger</span> family!
              </p>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "space-between" }}>
          <button onClick={onCancel} style={button}>Cancel</button>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 1 && step < 5 && (
              <button onClick={() => setStep(step - 1)} style={button}>Back</button>
            )}
            {step < 5 && (
              <button onClick={() => setStep(step + 1)} style={button}>Next</button>
            )}
            {step === 5 && (
              <button onClick={onCancel} style={button}>Done</button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Theo info box (with a clear gap & divider) */}
      {step < 5 && (
        <aside
          style={{
            flex: 1,
            textAlign: "center",
            borderLeft: "1px solid rgba(0,0,0,.08)", // visual separation
            paddingLeft: 28,                          // space between panels
          }}
        >
          <img
            src="/assets/theo-write.png"
            alt="Theo"
            style={{ maxWidth: 180, margin: "0 auto 10px", display: "block" }}
          />
          <p style={{ color: "var(--blue)", fontWeight: 700, margin: 0 }}>
            Register to earn <span style={{ color: "var(--orange)" }}>SnapCoins</span> and{" "}
            <span style={{ color: "var(--orange)" }}>SnapCharms</span> for exclusive rewards!
          </p>
        </aside>
      )}
    </Box>
  );
}
