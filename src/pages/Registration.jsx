// src/pages/Registration.jsx
import React, { useState } from "react";
import theoImg from "/assets/theo-write.png";

export default function Registration() {
  const [step, setStep] = useState(1);

  return (
    <div className="registrationPage">
      <div className="layout">
        {/* Registration form */}
        <div className="panel formPanel">
          <h2 className="title">Account Registration</h2>

          <form>
            {/* Step 1 */}
            {step === 1 && (
              <div className="grid2">
                <div>
                  <label>Name</label>
                  <input type="text" />
                  <label>Phone</label>
                  <input type="tel" />
                </div>
                <div>
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
                  <input type="text" />
                  <label>Favorite Burger</label>
                  <div>
                    <input type="checkbox" /> Byte Burger <br />
                    <input type="checkbox" /> MegaByte <br />
                    <input type="checkbox" /> BaconByte <br />
                  </div>
                </div>
                <div>
                  <label>Toppings</label>
                  <div>
                    <input type="checkbox" /> Add Cheese <br />
                    <input type="checkbox" /> Extra Onions <br />
                    <input type="checkbox" /> Light Sauce <br />
                  </div>
                  <label>Preferred Side</label>
                  <div>
                    <input type="checkbox" /> Fries <br />
                    <input type="checkbox" /> Onion Rings <br />
                    <input type="checkbox" /> Salad <br />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="grid2">
                <div>
                  <label>Facebook</label>
                  <input type="text" />
                  <label>Instagram</label>
                  <input type="text" />
                  <label>X (Twitter)</label>
                  <input type="text" />
                </div>
                <div>
                  <label>TikTok</label>
                  <input type="text" />
                  <label>YouTube</label>
                  <input type="text" />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div>
                <h3 className="subtitle">Review Your Information</h3>
                <div className="reviewBox">
                  <p>(Preview of submitted details here)</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="actions">
              {step > 1 && (
                <button
                  type="button"
                  className="pillBtn cancel"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  className="pillBtn next"
                  onClick={() => setStep(step + 1)}
                >
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
          <img src={theoImg} alt="Theo" className="theoImg" />
          <p className="theoBlurb">
            Register today to earn SnapCoins and SnapCharms! Your rewards start
            right away.
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
          grid-template-columns: 1.6fr 0.4fr;
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
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px; /* tighter rows, healthy col spacing */
        }
        .grid2 > div:last-child {
          margin-right: 24px; /* breathing room on right side */
        }
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
        .reviewBox {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          min-height: 200px;
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
          max-width: 160px;
          margin-bottom: 14px;
        }
        .theoBlurb {
          font-size: 16px;
          font-weight: 600;
          color: var(--blue);
        }
      `}</style>
    </div>
  );
}
