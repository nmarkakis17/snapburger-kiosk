// src/Registration.jsx
import React, { useState } from 'react'

export default function Registration() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    allergies: '',
    burgerPrefs: [],
    sidePrefs: [],
    facebook: '',
    instagram: '',
    x: '',
    tiktok: '',
    youtube: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm((prev) => {
        const updated = prev[name] || []
        if (checked) return { ...prev, [name]: [...updated, value] }
        return { ...prev, [name]: updated.filter((v) => v !== value) }
      })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  return (
    <div className="registration">
      <style>{`
        .registration {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 24px;
        }
        .reg-box {
          background: white;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 10px 28px rgba(0,0,0,.35);
          width: 700px;
          color: black;
        }
        h2 {
          color: #0ea5e9;
          margin-bottom: 16px;
          text-align: center;
        }
        label {
          display: block;
          margin: 12px 0 6px;
          font-weight: 600;
          color: #0ea5e9;
        }
        input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 8px;
        }
        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }
        .nav-btns {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
        }
        button {
          background: linear-gradient(135deg, #0ea5e9, #f97316);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .review {
          white-space: pre-wrap;
        }
        .theo-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 24px;
          text-align: center;
        }
        .theo-box img {
          max-width: 240px;
        }
        .theo-box p {
          color: #0ea5e9;
          font-weight: 700;
        }
      `}</style>

      {/* Step 1 */}
      {step === 1 && (
        <div className="reg-box">
          <h2>Step 1: Account Information</h2>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          <label>Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} />

          <div className="nav-btns">
            <span />
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="reg-box" style={{ width: '800px' }}>
          <h2>Step 2: Preferences</h2>
          <label>Allergies</label>
          <input name="allergies" value={form.allergies} onChange={handleChange} />

          <label>Favorite Burgers</label>
          <div className="checkbox-group">
            {['Byte Burger', 'MegaByte', 'BaconByte Burger'].map((b) => (
              <label key={b}>
                <input
                  type="checkbox"
                  name="burgerPrefs"
                  value={b}
                  checked={form.burgerPrefs.includes(b)}
                  onChange={handleChange}
                />
                {b}
              </label>
            ))}
          </div>

          <label>Preferred Sides</label>
          <div className="checkbox-group">
            {['Fries', 'Onion Rings', 'Tater Tots', 'Salad'].map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  name="sidePrefs"
                  value={s}
                  checked={form.sidePrefs.includes(s)}
                  onChange={handleChange}
                />
                {s}
              </label>
            ))}
          </div>

          <div className="nav-btns">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="reg-box">
          <h2>Step 3: Social Media</h2>
          <label>Facebook</label>
          <input name="facebook" value={form.facebook} onChange={handleChange} />
          <label>Instagram</label>
          <input name="instagram" value={form.instagram} onChange={handleChange} />
          <label>X (Twitter)</label>
          <input name="x" value={form.x} onChange={handleChange} />
          <label>TikTok</label>
          <input name="tiktok" value={form.tiktok} onChange={handleChange} />
          <label>YouTube</label>
          <input name="youtube" value={form.youtube} onChange={handleChange} />

          <div className="nav-btns">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="reg-box" style={{ width: '850px' }}>
          <h2>Step 4: Review</h2>
          <div className="review">
            <strong>Name:</strong> {form.name}{'\n'}
            <strong>Phone:</strong> {form.phone}{'\n'}
            <strong>Email:</strong> {form.email}{'\n'}
            <strong>Address:</strong> {form.address}{'\n'}
            <strong>Allergies:</strong> {form.allergies}{'\n'}
            <strong>Burgers:</strong> {form.burgerPrefs.join(', ')}{'\n'}
            <strong>Sides:</strong> {form.sidePrefs.join(', ')}{'\n'}
            <strong>Facebook:</strong> {form.facebook}{'\n'}
            <strong>Instagram:</strong> {form.instagram}{'\n'}
            <strong>X:</strong> {form.x}{'\n'}
            <strong>TikTok:</strong> {form.tiktok}{'\n'}
            <strong>YouTube:</strong> {form.youtube}
          </div>

          <div className="nav-btns">
            <button onClick={back}>Back</button>
            <button onClick={next}>Submit</button>
          </div>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="theo-box">
          <img src="/assets/theo-clap.png" alt="Theo clapping" />
          <p>Congratulations! Your SnapBurger account has been created 🎉</p>
        </div>
      )}
    </div>
  )
}
