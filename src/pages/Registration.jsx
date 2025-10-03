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
        maxWidth: "1000px",
        margin: "0 auto",
        color: "#000",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        display: "flex",
        gap: "36px", // gap between left (form) and right (Theo box)
        ...style
      }}
    >
      {children}
    </div>
  );

  const buttonStyle = {
    background: "linear-gradient(135deg, var(--blue), var(--orange))",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: 700,
    border: "none",
    cursor: "pointer"
  };

  return (
    <Box>
      {/* LEFT: Registration content */}
      <div style={{ flex: 2 }}>
        {step === 1 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Account Information</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "28px",
                rowGap: "6px", // tighter rows
                paddingRight: "24px"
              }}
            >
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => handleChange("name", e.target.value)} />
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e => handleChange("email", e.target.value)} />
              <input type="text" placeholder="Street Address" value={form.address} onChange={e => handleChange("address", e.target.value)} />
              <input type="text" placeholder="City" value={form.city} onChange={e => handleChange("city", e.target.value)} />
              <input type="text" placeholder="State" value={form.state} onChange={e => handleChange("state", e.target.value)} />
              <input type="text" placeholder="ZIP Code" value={form.zip} onChange={e => handleChange("zip", e.target.value)} />
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
              style={{ width: "100%", minHeight: 100, marginBottom: 16 }}
            />
            <h3 style={{ color: "var(--orange)" }}>Favorite Burgers</h3>
            {["Byte Burger", "MegaByte", "BaconByte Burger"].map(b => (
              <label key={b} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={form.burgerPrefs.includes(b)}
                  onChange={e =>
                    handleChange(
                      "burgerPrefs",
                      e.target.checked
                        ? [...form.burgerPrefs, b]
                        : form.burgerPrefs.filter(x => x !== b)
                    )
                  }
                />{" "}
                {b}
              </label>
            ))}
            <h3 style={{ color: "var(--orange)", marginTop: 16 }}>Preferred Sides</h3>
            {["Fries", "Onion Rings", "Salad"].map(s => (
              <label key={s} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={form.sidePrefs.includes(s)}
                  onChange={e =>
                    handleChange(
                      "sidePrefs",
                      e.target.checked
                        ? [...form.sidePrefs, s]
                        : form.sidePrefs.filter(x => x !== s)
                    )
                  }
                />{" "}
                {s}
              </label>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ color: "var(--blue)" }}>Social Media</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { key: "facebook", label: "Facebook", icon: "/assets/social/facebook.svg" },
                { key: "instagram", label: "Instagram", icon: "/assets/social/instagram.svg" },
                { key: "x", label: "X", icon: "/assets/social/x.svg" },
                { key: "youtube", label: "YouTube", icon: "/assets/social/youtube.svg" },
                { key: "tiktok", label: "TikTok", icon: "/assets/social/tiktok.svg" }
              ].map(({ key, label, icon }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={icon} alt={label} width="22" height="22" />
                  <input
                    type="text"
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
            <h2 style={{ color: "var(--blue)" }}>Review</h2>
            <div style={{ background: "#f7f7f7", borderRadius: 12, padding: 16 }}>
              <p><b>Name:</b> {form.name}</p>
              <p><b>Email:</b> {form.email}</p>
              <p><b>Phone:</b> {form.phone}</p>
              <p><b>Address:</b> {form.address}, {form.city}, {form.state} {form.zip}</p>
              <p><b>Burgers:</b> {form.burgerPrefs.join(", ") || "—"}</p>
              <p><b>Sides:</b> {form.sidePrefs.join(", ") || "—"}</p>
              <p><b>Allergies:</b> {form.allergies || "—"}</p>
              <p><b>Facebook:</b> {form.facebook || "—"}</p>
              <p><b>Instagram:</b> {form.instagram || "—"}</p>
              <p><b>X:</b> {form.x || "—"}</p>
              <p><b>YouTube:</b> {form.youtube || "—"}</p>
              <p><b>TikTok:</b> {form.tiktok || "—"}</p>
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
                boxShadow: "0 10px 30px rgba(0,0,0,.15)"
              }}
            >
              <img src="/assets/theo-clap.png" alt="Theo Clapping" style={{ maxWidth: 180 }} />
              <h2>Congratulations!</h2>
              <p>
                Theo welcomes you to the{" "}
                <span style={{ color: "var(--orange)", fontWeight: 800 }}>SnapBurger</span> family!
              </p>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "space-between" }}>
          <button onClick={onCancel} style={buttonStyle}>Cancel</button>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 1 && step < 5 && <button onClick={() => setStep(step - 1)} style={buttonStyle}>Back</button>}
            {step < 5 && <button onClick={() => setStep(step + 1)} style={buttonStyle}>Next</button>}
            {step === 5 && <button onClick={onCancel} style={buttonStyle}>Done</button>}
          </div>
        </div>
      </div>

      {/* RIGHT: Theo info box */}
      {step < 5 && (
        <div style={{ flex: 1, textAlign: "center" }}>
          <img src="/assets/theo-write.png" alt="Theo" style={{ maxWidth: 160, marginBottom: 12 }} />
          <p style={{ color: "var(--blue)", fontWeight: 600 }}>
            Register to earn <span style={{ color: "var(--orange)" }}>SnapCoins</span> and{" "}
            <span style={{ color: "var(--orange)" }}>SnapCharms</span> for exclusive rewards!
          </p>
        </div>
      )}
    </Box>
  );
}
