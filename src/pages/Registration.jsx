// src/pages/Registration.jsx
import React, { useState } from "react";
import theoWrite from "/assets/theo-write.png"; 
import theoClap from "/assets/theo-clap.png"; 
import fbIcon from "/assets/fb.png";
import igIcon from "/assets/ig.png";
import xIcon from "/assets/x.png";
import tiktokIcon from "/assets/tiktok.png";
import ytIcon from "/assets/yt.png";

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
    burger: [],
    sides: [],
    socials: {
      facebook: "",
      instagram: "",
      x: "",
      tiktok: "",
      youtube: ""
    }
  });

  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const updateSocial = (platform, value) => {
    setForm((f) => ({
      ...f,
      socials: { ...f.socials, [platform]: value }
    }));
  };

  return (
    <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "820px", width: "100%", background: "#fff", borderRadius: "14px", padding: "28px", boxShadow: "0 8px 22px rgba(0,0,0,.25)" }}>
        {step === 1 && (
          <>
            <h2 style={{ color: "#0ea5e9" }}>Account Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input placeholder="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
              <input placeholder="Phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
              <input placeholder="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
              <input placeholder="Address" value={form.address} onChange={(e) => updateField("address", e.target.value)} />
              <input placeholder="City" value={form.city} onChange={(e) => updateField("city", e.target.value)} />
              <input placeholder="State" value={form.state} onChange={(e) => updateField("state", e.target.value)} />
              <input placeholder="Zip" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <button onClick={onCancel} style={{ marginRight: "12px", background: "#0ea5e9", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Cancel</button>
              <button onClick={() => setStep(2)} style={{ background: "#f97316", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ color: "#0ea5e9" }}>Eating Preferences</h2>
            <textarea placeholder="Allergies" value={form.allergies} onChange={(e) => updateField("allergies", e.target.value)} />
            <h3 style={{ marginTop: "20px" }}>Favorite Burger Options</h3>
            <label><input type="checkbox" value="Cheese" /> Cheese</label>
            <label><input type="checkbox" value="Bacon" /> Bacon</label>
            <label><input type="checkbox" value="Onions" /> Onions</label>
            <h3 style={{ marginTop: "20px" }}>Preferred Sides</h3>
            <label><input type="checkbox" value="Fries" /> Fries</label>
            <label><input type="checkbox" value="Onion Rings" /> Onion Rings</label>
            <label><input type="checkbox" value="Salad" /> Salad</label>
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(1)} style={{ marginRight: "12px", background: "#0ea5e9", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Back</button>
              <button onClick={() => setStep(3)} style={{ background: "#f97316", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ color: "#0ea5e9" }}>Social Media Accounts</h2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div><img src={fbIcon} alt="Facebook" style={{ width: "20px", marginRight: "8px" }} /><input placeholder="Facebook" value={form.socials.facebook} onChange={(e) => updateSocial("facebook", e.target.value)} /></div>
              <div><img src={igIcon} alt="Instagram" style={{ width: "20px", marginRight: "8px" }} /><input placeholder="Instagram" value={form.socials.instagram} onChange={(e) => updateSocial("instagram", e.target.value)} /></div>
              <div><img src={xIcon} alt="X" style={{ width: "20px", marginRight: "8px" }} /><input placeholder="X" value={form.socials.x} onChange={(e) => updateSocial("x", e.target.value)} /></div>
              <div><img src={tiktokIcon} alt="TikTok" style={{ width: "20px", marginRight: "8px" }} /><input placeholder="TikTok" value={form.socials.tiktok} onChange={(e) => updateSocial("tiktok", e.target.value)} /></div>
              <div><img src={ytIcon} alt="YouTube" style={{ width: "20px", marginRight: "8px" }} /><input placeholder="YouTube" value={form.socials.youtube} onChange={(e) => updateSocial("youtube", e.target.value)} /></div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(2)} style={{ marginRight: "12px", background: "#0ea5e9", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Back</button>
              <button onClick={() => setStep(4)} style={{ background: "#f97316", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Next</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 style={{ color: "#0ea5e9" }}>Review Your Info</h2>
            <div style={{ padding: "14px", border: "1px solid #ddd", borderRadius: "8px", background: "#fafafa" }}>
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Address:</strong> {form.address}, {form.city}, {form.state} {form.zip}</p>
              <p><strong>Allergies:</strong> {form.allergies}</p>
              <p><strong>Burger Choices:</strong> {form.burger.join(", ")}</p>
              <p><strong>Sides:</strong> {form.sides.join(", ")}</p>
              <p><strong>Facebook:</strong> {form.socials.facebook}</p>
              <p><strong>Instagram:</strong> {form.socials.instagram}</p>
              <p><strong>X:</strong> {form.socials.x}</p>
              <p><strong>TikTok:</strong> {form.socials.tiktok}</p>
              <p><strong>YouTube:</strong> {form.socials.youtube}</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(3)} style={{ marginRight: "12px", background: "#0ea5e9", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Back</button>
              <button onClick={() => setStep(5)} style={{ background: "#f97316", color: "#fff", padding: "10px 16px", borderRadius: "8px" }}>Submit</button>
            </div>
          </>
        )}

        {step === 5 && (
          <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "14px" }}>
            <img src={theoClap} alt="Theo Clapping" style={{ width: "220px", marginBottom: "20px" }} />
            <h2 style={{ color: "#0ea5e9" }}>🎉 Congratulations! 🎉</h2>
            <p style={{ marginTop: "12px", fontWeight: "700" }}>
              Theo welcomes you to the <span style={{ color: "#f97316" }}>SnapBurger</span> family!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
