// src/Returning.jsx
import React from 'react'

export default function Returning() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '40px',
        padding: '40px',
        color: '#0ea5e9', // brand blue
      }}
    >
      {/* Left Box: Scan Loyalty Card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: 20,
          boxShadow: '0 12px 28px rgba(0,0,0,.18)',
          width: '360px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#0ea5e9', marginTop: 0 }}>Scan Your Loyalty Card Below</h2>
        <img
          src="/assets/theo-point.png" // make sure your Theo pointing image is saved here
          alt="Theo pointing down"
          style={{
            width: '240px',  // ⬅️ change this number to make Theo bigger/smaller
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>

      {/* Right Box: Enter Information */}
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: 20,
          boxShadow: '0 12px 28px rgba(0,0,0,.18)',
          width: '460px',  // ⬅️ wider white box
        }}
      >
        <h2 style={{ color: '#0ea5e9', marginTop: 0 }}>Enter Your Information Below</h2>
        <form style={{ display: 'grid', gap: '14px' }}>
          <input
            type="text"
            placeholder="Phone Number"
            style={{
              padding: '12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            style={{
              padding: '12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="text"
            placeholder="Loyalty Number"
            style={{
              padding: '12px',
              borderRadius: 10,
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
