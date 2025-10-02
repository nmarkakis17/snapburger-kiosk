// src/pages/Registration.jsx
import React from "react";

export default function Registration() {
  return (
    <div className="wrap">
      <style>{`
        :root {
          --blue:#0ea5e9; --orange:#f97316;
          --border:#1f2a44; --text:#0b1220;
        }
        .wrap{
          position:relative; z-index:2;
          max-width:1440px;  /* wider container */
          margin:0 auto; padding:28px; display:grid; gap:24px;
          grid-template-columns:2fr 1fr;
          align-items:flex-start;
        }
        .panel{
          background:#fff;
          border:1px solid var(--border);
          border-radius:18px;
        }
        .form-card{
          padding:28px; display:grid; gap:18px;
        }
        h2{ margin:0; color:var(--blue); }
        .row{
          display:grid;
          grid-template-columns:1fr 1fr;
          column-gap:80px;  /* more space between columns */
          row-gap:20px;
        }
        .row-3{
          display:grid;
          grid-template-columns:1fr 1fr 1fr;
          column-gap:60px;
          row-gap:20px;
        }
        label{ font-weight:600; color:var(--blue); }
        input, textarea{
          width:100%; padding:12px;
          border-radius:12px; border:1px solid var(--border);
          font-size:15px; color:var(--text);
        }
        textarea{ resize:vertical; min-height:80px; }
        .btn-row{ display:flex; gap:14px; justify-content:flex-end; margin-top:18px; }
        .btn{
          padding:12px 20px; border-radius:999px; border:none;
          font-weight:800; cursor:pointer;
          background:linear-gradient(135deg,var(--blue),var(--orange));
          color:#fff;
        }
        .theo-box{
          background:#fff; border:1px solid var(--border);
          border-radius:18px; padding:18px; text-align:center;
          display:grid; gap:12px; justify-items:center;
        }
        .theo-box img{
          width:220px; height:auto; /* smaller than before */
        }
        .theo-box p{
          font-size:17px; line-height:1.4;
          color:var(--blue);
          font-weight:600;
          margin:0;
        }
        @media(max-width:900px){
          .wrap{ grid-template-columns:1fr; }
          .row,.row-3{ grid-template-columns:1fr; column-gap:0; }
        }
      `}</style>

      {/* Left side: Registration form */}
      <div className="panel">
        <div className="form-card">
          <h2>Create Your SnapBurger Account</h2>

          <div className="row">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" placeholder="(555) 555-5555" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Street Address</label>
              <input type="text" placeholder="123 Main St" />
            </div>
            <div>
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>State</label>
              <input type="text" placeholder="State" />
            </div>
            <div>
              <label>Zip Code</label>
              <input type="text" placeholder="12345" />
            </div>
          </div>

          <div>
            <label>Allergies</label>
            <textarea placeholder="List any food allergies"></textarea>
          </div>

          <div className="row-3">
            <div>
              <label>Facebook</label>
              <input type="text" placeholder="@facebook" />
            </div>
            <div>
              <label>Instagram</label>
              <input type="text" placeholder="@instagram" />
            </div>
            <div>
              <label>X (Twitter)</label>
              <input type="text" placeholder="@handle" />
            </div>
          </div>

          <div className="row-3">
            <div>
              <label>TikTok</label>
              <input type="text" placeholder="@tiktok" />
            </div>
            <div>
              <label>YouTube</label>
              <input type="text" placeholder="Channel URL" />
            </div>
          </div>

          <div className="btn-row">
            <button className="btn">Cancel</button>
            <button className="btn">Next</button>
          </div>
        </div>
      </div>

      {/* Right side: Theo box */}
      <div className="theo-box">
        <img src="/assets/theo-write.png" alt="Theo mascot" />
        <p>Register today to unlock rewards, get personalized deals, and join the SnapBurger community!</p>
      </div>
    </div>
  );
}
