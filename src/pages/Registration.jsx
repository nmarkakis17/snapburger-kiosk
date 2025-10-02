// src/pages/Registration.jsx
import React, { useState } from 'react'

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    allergies: '',
    facebook: '',
    instagram: '',
    x: '',
    tiktok: '',
    youtube: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registration Data:', formData)
    alert('Thanks for registering with SnapBurger!')
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '32px',
      borderRadius: '16px',
      background: '#0b1220',
      color: '#fff',
      border: '1px solid rgba(14,165,233,.3)',
      boxShadow: '0 10px 30px rgba(0,0,0,.4)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <img
          src="/assets/theo-write.png"
          alt="Theo mascot"
          style={{ width: '100px', marginBottom: '12px' }}
        />
        <h1 style={{ color: '#0ea5e9', margin: 0 }}>New Customer Registration</h1>
        <p style={{ opacity: .8 }}>Join SnapBurger and unlock rewards with Theo!</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
        {/* Name */}
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* Address */}
        <label>
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        {/* Phone */}
        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        {/* Email */}
        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* Allergies */}
        <label>
          Allergies (if any)
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: '60px' }}
          />
        </label>

        {/* Social Media Accounts */}
        <h2 style={{ margin: '16px 0 8px', color: '#f97316' }}>Social Media Handles</h2>
        
        <label>
          Facebook
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="@yourhandle"
            style={inputStyle}
          />
        </label>

        <label>
          Instagram
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@yourhandle"
            style={inputStyle}
          />
        </label>

        <label>
          X (formerly Twitter)
          <input
            type="text"
            name="x"
            value={formData.x}
            onChange={handleChange}
            placeholder="@yourhandle"
            style={inputStyle}
          />
        </label>

        <label>
          TikTok
          <input
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            placeholder="@yourhandle"
            style={inputStyle}
          />
        </label>

        <label>
          YouTube Channel
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            placeholder="youtube.com/@yourchannel"
            style={inputStyle}
          />
        </label>

        {/* Submit */}
        <button type="submit" style={{
          padding: '14px',
          border: 'none',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
          color: '#fff',
          fontWeight: 900,
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '12px',
          boxShadow: '0 8px 20px rgba(14,165,233,.3)'
        }}>
          Register Now
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  marginTop: '4px',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,.2)',
  background: '#1c2536',
  color: '#fff',
  fontSize: '15px'
}
