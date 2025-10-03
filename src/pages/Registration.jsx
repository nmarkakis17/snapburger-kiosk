// src/pages/Registration.jsx
import React, { useState } from "react";
import theoWrite from "/assets/theo-write.png";   // existing side image
import theoClap from "/assets/theo-clap.png";     // NEW: congratulations image

export default function Registration() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // go to Congrats screen
  };

  if (submitted) {
    return (
      <div className="registrationPage">
        <div className="layout congratsLayout">
          <div className="panel congratsPanel">
            <img src={theoClap} alt="Theo clapping" className="theoClapImg" />
            <h2 className="congratsTitle">Congratulations!</h2>
            <p className="congratsBody">
              You’re all set. Your SnapBurger account is ready — start earning
              <b> SnapCoins</b> and collecting <b>SnapCharms</b> today!
            </p>
            <div className="congratsActions">
              <a className="pillBtn next" href="/menu">Start Ordering</a>
              <a className="pillBtn cancel" href="/">Back to Home</a>
            </div>
          </div>
        </div>

        <style jsx>{`
          .registrationPage { display:flex; justify-content:center; padding:40px; color:var(--sb-text);}
          .layout.congratsLayout { width:100%; max-width:900px; }
          .congratsPanel{
            background:#fff; color:#000; border-radius:20px; padding:28px 36px;
            box-shadow:0 12px 30px rgba(0,0,0,.25); text-align:center;
          }
          .theoClapImg{ width:min(220px, 40vw); display:block; margin:0 auto 12px auto; }
          .congratsTitle{ color:var(--blue); font-size:28px; font-weight:900; margin:6px 0 8px 0; }
          .congratsBody{ font-size:16px; color:#111; }
          .congratsActions{ display:flex; gap:12px; justify-content:center; margin-top:18px; }
          .pillBtn{ border:none; border-radius:999px; padding:12px 22px; font-weight:700; cursor:pointer; text-decoration:none; }
          .pillBtn.next{ background:linear-gradient(135deg, var(--blue), var(--orange)); color:#fff; }
          .pillBtn.cancel{ background:#ccc; color:#000; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="registrationPage">
      <div className="layout">
        {/* Registration form */}
        <div className="panel formPanel">
          <h2 className="title">Account Registration</h2>

          <form onSubmit={onSubmit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="grid2">
                <div>
                  <label>Name</label>
                  <input type="text" />
                  <label>Phone</label>
                  <input type="tel" />
                </div>
                <div className="rightColBuffer">
                  <label>Email</label>
                  <input type="email" />
                  <label>Address</label>
                  <input type="text" />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="grid2">
                <div>
                  <label>Allergies</label>
                  <input type="text" placeholder="e.g., peanuts, gluten" />
                  <label>Favorite Burgers</label>
                  <div className="checkGroup">
                    <label><input type="checkbox" /> Byte Burger</label>
                    <label><input type="checkbox" /> MegaByte</label>
                    <label><input type="checkbox" /> BaconByte</label>
                    <label><input type="checkbox" /> VeggieByte</label>
                  </div>
                </div>
                <div className="rightColBuffer">
                  <label>Toppings</label>
                  <div className="checkGroup">
                    <label><input type="checkbox" /> Add Cheese</label>
                    <label><input type="checkbox" /> Extra Onions</label>
                    <label><input type="checkbox" /> Light Sauce</label>
                    <label><input type="checkbox" /> No Pickles</label>
                  </div>
                  <label>Preferred Sides</label>
                  <div className="checkGroup">
                    <label><input type="checkbox" /> Fries</label>
                    <label><input type="checkbox" /> Onion Rings</label>
                    <label><input type="checkbox" /> Salad</label>
                    <label><input type="checkbox" /> Tater Tots</label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="grid2">
                <div>
                  <label>Facebook</label>
                  <input type="text" placeholder="@yourprofile" />
                  <label>Instagram</label>
                  <input type="text" placeholder="@yourhandle" />
                  <label>X (Twitter)</label>
                  <input type="text" placeholder="@yourhandle" />
                </div>
                <div className="rightColBuffer">
                  <label>TikTok</label>
                  <input type="text" placeholder="@yourhandle" />
                  <label>YouTube</label>
                  <input type="text" placeholder="channel url or @handle" />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <>
                <h3 className="subtitle">Review Your Information</h3>
                <div className="reviewBox">
                  <p>(Preview of submitted details here)</p>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="actions">
              {step > 1 && (
                <button type="button" className="pillBtn cancel" onClick={goBack}>
                  Back
                </button>
              )}
              {step < 4 && (
                <button type="button" className="pillBtn next" onClick={goNext}>
                  Next
                </button>
              )}
              {step === 4 && (
                <button type="submit" className="pillBtn next">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Theo side */}
        <div className="panel theoPanel">
          <img src={theoWrite} alt="Theo" className="theoImg" />
          <p className="theoBlurb">
            Register today to earn <b>SnapCoins</b> and <b>SnapCharms</b> —
            your rewards start right away.
          </p>
        </div>
      </div>

      <style jsx>{`
        .registrationPage {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px;
          color: var(--sb-text);
        }
        .layout {
          display: grid;
          grid-template-columns: 1.6fr 0.4fr; /* big form, slim Theo */
          gap: 32px;
          width: 100%;
          max-width: 1100px;
        }
        .panel {
          background: #fff;
          border-radius: 20px;
          padding: 28px 36px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          color: #000;
        }
        .title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--blue);
        }
        .subtitle {
          font-size: 18px;
          font-weight: 700;
          color: var(--blue);
          margin-bottom: 12px;
        }
        /* Two-column form grid with balanced spacing */
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 28px;       /* spacing between columns */
          row-gap: 8px;           /* tighter rows */
        }
        .rightColBuffer { margin-right: 28px; } /* breathing room against panel edge */

        label {
          display: block;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
          color: var(--blue);
        }
        input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-bottom: 6px;
        }
        .checkGroup label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 4px 12px 0 0;
          color: #111;
          font-weight: 600;
        }
        .reviewBox {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          min-height: 220px;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .pillBtn {
          border: none;
          border-radius: 999px;
          padding: 12px 22px;
          font-weight: 700;
          cursor: pointer;
        }
        .pillBtn.cancel {
          background: #ccc;
          color: #000;
        }
        .pillBtn.next {
          background: linear-gradient(135deg, var(--blue), var(--orange));
          color: #fff;
        }
        .theoPanel {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .theoImg {
          max-width: 150px;  /* slightly smaller per your earlier preference */
          margin-bottom: 12px;
        }
        .theoBlurb {
          font-size: 16px;
          font-weight: 700;
          color: var(--blue);
        }
      `}</style>
    </div>
  );
}
