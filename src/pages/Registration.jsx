// src/pages/Registration.jsx
import React from "react";
import theoImg from "/assets/theo-write.png";

export default function Registration() {
  return (
    <div className="registrationPage">
      <div className="layout">
        {/* Form side */}
        <div className="panel formPanel">
          <h2 className="title">Account Registration</h2>

          <form>
            <div className="grid2">
              <div>
                <label>Name</label>
                <input type="text" />
                <label>Phone</label>
                <input type="tel" />
                <label>Email</label>
                <input type="email" />
                <label>Address</label>
                <input type="text" />
              </div>
              <div>
                <label>City</label>
                <input type="text" />
                <label>State</label>
                <input type="text" />
                <label>Zip</label>
                <input type="text" />
              </div>
            </div>

            <div className="actions">
              <button type="button" className="pillBtn cancel">
                Cancel
              </button>
              <button type="submit" className="pillBtn next">
                Next
              </button>
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
          grid-template-columns: 1.6fr 0.4fr; /* wider form, narrower Theo */
          gap: 32px;
          width: 100%;
          max-width: 1100px;
        }
        .panel {
          background: #fff;
          border-radius: 20px;
          padding: 28px 36px; /* extra horizontal padding */
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          color: #000;
        }
        .formPanel {
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--blue);
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px; /* tighten rows (8px) and keep column gap */
        }
        .grid2 > div:last-child {
          margin-right: 24px; /* space on right edge */
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
          justify-content: flex-start;
          padding: 20px;
        }
        .theoImg {
          max-width: 180px;
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
