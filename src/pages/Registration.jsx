import React, { useState } from 'react'
import theoImg from '/assets/theo.png'  // make sure this exists in /public/assets

export default function Registration() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    allergies: '', socials: '', birthday: '', referral: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  return (
    <div className="reg-screen">
      <div className="card">
        <img src={theoImg} alt="Theo" className="theo" />
        {step === 1 && (
          <>
            <h2>Welcome to SnapBurger!</h2>
            <p>Let’s get you set up to earn rewards and make dining easier.</p>
            <button className="btn" onClick={next}>Start</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Your Info</h2>
            <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} />
            <input name="email" placeholder="Email Address" onChange={handleChange} value={form.email} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} value={form.phone} />
            <input name="address" placeholder="Street Address" onChange={handleChange} value={form.address} />
            <div className="nav">
              <button onClick={back}>Back</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Preferences</h2>
            <input name="allergies" placeholder="Allergies / Dietary Notes" onChange={handleChange} value={form.allergies} />
            <input name="birthday" placeholder="Birthday (MM/DD)" onChange={handleChange} value={form.birthday} />
            <div className="nav">
              <button onClick={back}>Back</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Rewards & Socials</h2>
            <input name="socials" placeholder="Social Media @handle(s)" onChange={handleChange} value={form.socials} />
            <input name="referral" placeholder="Referral Code (if any)" onChange={handleChange} value={form.referral} />
            <div className="nav">
              <button onClick={back}>Back</button>
              <button className="btn" onClick={next}>Review</button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2>Review & Confirm</h2>
            <pre>{JSON.stringify(form, null, 2)}</pre>
            <button onClick={back}>Back</button>
            <button className="btn">Finish</button>
          </>
        )}
      </div>
    </div>
  )
}
