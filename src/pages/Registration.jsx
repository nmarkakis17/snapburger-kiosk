// src/Registration.jsx
import React, { useState } from 'react'

export default function Registration({ onBack = () => {} }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '', address: ''
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    alert('Submitted! (stub)\n' + JSON.stringify(form, null, 2))
  }

  return (
    <div style={{ color:'#0b1020' }}>
      <div style={{
        background:'#fff', borderRadius:18, padding:20,
        boxShadow:'0 12px 28px rgba(0,0,0,.18)', maxWidth:900, margin:'0 auto'
      }}>
        <h2 style={{marginTop:0, color:'#0ea5e9'}}>Create Your Account</h2>
        <form onSubmit={submit} style={{ display:'grid', gap:12 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={update}
                   style={inputStyle}/>
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={update}
                   style={inputStyle}/>
          </div>
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={update}
                 style={inputStyle}/>
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={update}
                 style={inputStyle}/>
          <input name="address" placeholder="Street, City, State ZIP" value={form.address} onChange={update}
                 style={inputStyle}/>
          <div style={{ display:'flex', gap:12, marginTop:8 }}>
            <button type="button" onClick={onBack} style={ghostBtn}>Back</button>
            <button type="submit" style={solidBtn}>Save (Stub)</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  padding:'12px 14px', border:'1px solid #d0d7e2', borderRadius:12, fontSize:16
}
const solidBtn = {
  background:'linear-gradient(135deg, #0ea5e9, #f97316)', border:'none',
  color:'#0b0e14', fontWeight:900, padding:'12px 16px', borderRadius:12, cursor:'pointer'
}
const ghostBtn = {
  background:'#f1f5f9', border:'1px solid #d0d7e2', color:'#0b1020',
  fontWeight:700, padding:'12px 16px', borderRadius:12, cursor:'pointer'
}
