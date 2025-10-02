import React from "react";

export default function Registration() {
  return (
    <div className="registration-page">
      <style>{`
        :root {
          --blue:#0ea5e9;
          --orange:#f97316;
          --bg:#0b1220;
        }
        body { margin:0; }

        /* ===== Haze background ===== */
        .global-haze{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(1100px 700px at 10% -10%, rgba(34,211,238,.28), transparent 60%),
            radial-gradient(900px 600px at 95% 0%,   rgba(14,165,233,.25), transparent 60%),
            radial-gradient(1100px 700px at 65% 55%, rgba(249,115,22,.28), transparent 62%),
            radial-gradient(900px 600px at 0% 100%,  rgba(251,146,60,.22), transparent 60%),
            linear-gradient(135deg, rgba(14,165,233,.18), rgba(249,115,22,.18) 60%),
            var(--bg);
          filter:saturate(1.05);
        }

        .registration-container{
          position:relative; z-index:2;
          max-width:1200px; margin:0 auto; padding:40px;
          display:grid; grid-template-columns: 1.4fr 1fr; gap:40px;
          align-items:start;
        }

        /* ===== Form box ===== */
        .form-box{
          background:#fff;
          border-radius:18px;
          padding:30px;
          box-shadow:0 12px 28px rgba(0,0,0,.25);
        }
        .form-box h2{
          margin-top:0;
          color:var(--blue);
        }
        form{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:20px 30px; /* extra gap between columns */
        }
        label{
          display:flex;
          flex-direction:column;
          font-weight:700;
          font-size:14px;
          color:var(--blue);
        }
        input, textarea{
          margin-top:6px;
          padding:10px 12px;
          border:1px solid #ccc;
          border-radius:10px;
          font-size:14px;
          color:#000;
        }
        textarea{ resize:vertical; }

        .form-actions{
          grid-column:1 / -1;
          display:flex; justify-content:space-between; margin-top:20px;
        }
        .btn{
          cursor:pointer; border:none; border-radius:999px;
          padding:12px 22px; font-weight:800; font-size:15px;
          color:#0b0e14;
          background:linear-gradient(135deg,var(--blue),var(--orange));
          box-shadow:0 6px 18px rgba(14,165,233,.28);
        }

        /* ===== Theo box ===== */
        .theo-box{
          background:rgba(255,255,255,.9);
          border-radius:18px;
          padding:20px;
          box-shadow:0 10px 24px rgba(0,0,0,.25);
          text-align:center;
        }
        .theo-box img{
          max-width:80%;
          height:auto;
        }
        .theo-box p{
          margin-top:14px;
          font-size:16px;
          font-weight:700;
          color:var(--blue);
        }
      `}</style>

      {/* background haze */}
      <div className="global-haze" aria-hidden="true" />

      <div className="registration-container">
        {/* Left: Registration form */}
        <div className="form-box">
          <h2>Account Registration</h2>
          <form>
            <label>
              First Name
              <input type="text" required />
            </label>
            <label>
              Last Name
              <input type="text" required />
            </label>
            <label>
              Email Address
              <input type="email" required />
            </label>
            <label>
              Phone Number
              <input type="tel" required />
            </label>
            <label>
              Address
              <input type="text" />
            </label>
            <label>
              City
              <input type="text" />
            </label>
            <label>
              State
              <input type="text" />
            </label>
            <label>
              Zip Code
              <input type="text" />
            </label>
            <label>
              Allergies
              <textarea rows="2"></textarea>
            </label>
            <label>
              Favorite Burger
              <input type="text" />
            </label>
            <label>
              Facebook
              <input type="url" placeholder="https://facebook.com/username" />
            </label>
            <label>
              Instagram
              <input type="url" placeholder="https://instagram.com/username" />
            </label>
            <label>
              X (Twitter)
              <input type="url" placeholder="https://x.com/username" />
            </label>
            <label>
              TikTok
              <input type="url" placeholder="https://tiktok.com/@username" />
            </label>
            <label>
              YouTube
              <input type="url" placeholder="https://youtube.com/@username" />
            </label>

            <div className="form-actions">
              <button type="button" className="btn">Cancel</button>
              <button type="submit" className="btn">Next</button>
            </div>
          </form>
        </div>

        {/* Right: Theo box */}
        <div className="theo-box">
          <img src="/assets/theo-write.png" alt="Theo" />
          <p>Register now to unlock rewards, personalized offers, and exclusive SnapBurger experiences!</p>
        </div>
      </div>
    </div>
  );
}
