// src/pages/Registration.jsx
import React, { useState } from 'react'

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    allergies: '',
    // social handles:
    facebook: '',
    instagram: '',
    x: '',
    tiktok: '',
    youtube: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registration v2 data:', formData)
    alert('Thanks for registering with SnapBurger!')
  }

  return (
    <div style={{
      maxWidth: 720,
      margin: '40px auto',
      padding: 32,
      borderRadius: 16,
      background: '#0b1220',
      color: '#fff',
      border: '1px solid rgba(14,165,233,.3)',
      boxShadow: '0 10px 30px rgba(0,0,0,.4)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src="/assets/theo-write.png"   // <-- you said you renamed this
          alt="Theo mascot"
          style={{ width: 100, marginBottom: 12 }}
        />
        <h1 style={{ color: '#0ea5e9', margin: 0 }}>New Customer Registration</h1>
        <p style={{ opacity: .8, marginTop: 6 }}>Join SnapBurger and unlock rewards with Theo!</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        {/* Basics */}
        <label>
          Full Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Address
          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Email Address
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Allergies (if any)
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: 64 }}
          />
        </label>

        {/* Socials — explicit 5 fields */}
        <h2 style={{ margin: '8px 0 0', color: '#f97316' }}>
          Social Media Handles (5 fields)
        </h2>

        <label>
          Facebook
          <input
            name="facebook"
            type="text"
            placeholder="@yourhandle"
            value={formData.facebook}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Instagram
          <input
            name="instagram"
            type="text"
            placeholder="@yourhandle"
            value={formData.instagram}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          X (formerly Twitter)
          <input
            name="x"
            type="text"
            placeholder="@yourhandle"
            value={formData.x}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          TikTok
          <input
            name="tiktok"
            type="text"
            placeholder="@yourhandle"
            value={formData.tiktok}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          YouTube Channel
          <input
            name="youtube"
            type="text"
            placeholder="youtube.com/@yourchannel"
            value={formData.youtube}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <button type="submit" style={submitStyle}>Register Now</button>

        {/* Tiny version tag so you can confirm the right file is live */}
        <small style={{ opacity: .5, textAlign: 'center' }}>Registration v2</small>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  marginTop: 4,
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,.2)',
  background: '#1c2536',
  color: '#fff',
  fontSize: 15
}

const submitStyle = {
  padding: 14,
  border: 'none',
  borderRadius: 999,
  background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
  color: '#fff',
  fontWeight: 900,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 4,
  boxShadow: '0 8px 20px rgba(14,165,233,.3)'
}
