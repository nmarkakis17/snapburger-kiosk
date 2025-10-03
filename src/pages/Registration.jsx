// src/pages/Registration.jsx
import React, { useState } from "react"

export default function Registration() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", state: "", zip: "",
    allergies: "", favoriteBurger: "", toppings: [],
    preferredSide: "", socials: { facebook: "", instagram: "", x: "", youtube: "", tiktok: "" }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSocialChange = (platform, value) => {
    setForm({ ...form, socials: { ...form.socials, [platform]: value } })
  }

  const toggleTopping = (topping) => {
    setForm(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping]
    }))
  }

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  return (
    <div className="page" style={{ padding: 28 }}>
      <div className="card" style={{ maxWidth: 960, margin: "0 auto" }}>
        {step === 1 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Account Info</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
              <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
              <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
              <input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button className="btn" style={{ background: "var(--blue)" }} onClick={() => (window.location.href = "/")}>Cancel</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Eating Preferences</h2>
            <textarea name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange}></textarea>
            
            <div style={{ marginTop: 12 }}>
              <p>Favorite Burger:</p>
              {["Byte Burger", "MegaByte", "BaconByte"].map(b => (
                <label key={b} className="check-row">
                  <input type="radio" name="favoriteBurger" value={b} checked={form.favoriteBurger === b} onChange={handleChange} />
                  {b}
                </label>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <p>Toppings:</p>
              {["Cheese", "Lettuce", "Tomato", "Onions", "Bacon"].map(t => (
                <label key={t} className="check-row">
                  <input type="checkbox" checked={form.toppings.includes(t)} onChange={() => toggleTopping(t)} />
                  {t}
                </label>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <p>Preferred Side:</p>
              {["Fries", "Onion Rings", "Salad"].map(s => (
                <label key={s} className="check-row">
                  <input type="radio" name="preferredSide" value={s} checked={form.preferredSide === s} onChange={handleChange} />
                  {s}
                </label>
              ))}
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button className="btn" style={{ background: "var(--blue)" }} onClick={back}>Back</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Socials</h2>
            {["facebook", "instagram", "x", "youtube", "tiktok"].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <img src={`/assets/social/${s}.svg`} alt={s} style={{ width: 24, height: 24 }} />
                <input placeholder={`${s} username`} value={form.socials[s]} onChange={(e) => handleSocialChange(s, e.target.value)} />
              </div>
            ))}

            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button className="btn" style={{ background: "var(--blue)" }} onClick={back}>Back</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 style={{ color: "var(--blue)", marginTop: 0 }}>Review</h2>
            <div className="card" style={{ marginTop: 12, background: "#f9fafb" }}>
              <p><b>Name:</b> {form.name}</p>
              <p><b>Phone:</b> {form.phone}</p>
              <p><b>Email:</b> {form.email}</p>
              <p><b>Address:</b> {form.address}, {form.city}, {form.state} {form.zip}</p>
              <p><b>Allergies:</b> {form.allergies}</p>
              <p><b>Favorite Burger:</b> {form.favoriteBurger}</p>
              <p><b>Toppings:</b> {form.toppings.join(", ")}</p>
              <p><b>Preferred Side:</b> {form.preferredSide}</p>
              <p><b>Socials:</b> {Object.entries(form.socials).map(([k,v]) => v && `${k}: ${v}`).join(" | ")}</p>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button className="btn" style={{ background: "var(--blue)" }} onClick={back}>Back</button>
              <button className="btn" onClick={next}>Submit</button>
            </div>
          </>
        )}

        {step === 5 && (
          <div className="card" style={{ textAlign: "center", padding: 28 }}>
            <img src="/assets/theo-clap.png" alt="Theo clapping" style={{ width: 140, marginBottom: 16 }} />
            <h2 style={{ color: "var(--blue)" }}>Congratulations!</h2>
            <p style={{ fontWeight: 600, color: "var(--sub)" }}>
              Theo welcomes you to the <span style={{ color: "var(--orange)" }}>SnapBurger</span> family!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
