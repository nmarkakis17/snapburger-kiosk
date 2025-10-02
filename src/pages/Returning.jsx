// src/pages/Returning.jsx
import React from "react";

export default function Returning() {
  return (
    <div className="returning-page">
      <style>{`
        .returning-page {
          color: #fff;
          padding: 32px;
          text-align: center;
        }
        .loyalty-card {
          max-width: 420px;
          margin: 0 auto 30px auto;
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(0,0,0,.35);
        }
        .returning-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          max-width: 900px;
          margin: 0 auto;
        }
        .returning-box {
          background: #fff;
          color: #0b1220;
          border-radius: 16px;
          padding: 22px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,.2);
        }
        .returning-box h3 {
          color: #0ea5e9;
          margin-bottom: 12px;
        }
        .returning-box img {
          max-width: 180px;
          margin-top: 12px;
        }
        .returning-box input {
          display: block;
          width: 90%;
          margin: 10px auto;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        .btn-submit {
          margin-top: 14px;
          padding: 12px 18px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #f97316);
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }
        .btn-submit:hover {
          filter: brightness(1.1);
        }
      `}</style>

      {/* Loyalty card at the top */}
      <img
        src="/assets/loyalty-card.png"
        alt="SnapBurger Loyalty Card"
        className="loyalty-card"
      />

      {/* Two columns below */}
      <div className="returning-grid">
        {/* Left Box */}
        <div className="returning-box">
          <h3>Scan Your Loyalty Card Below</h3>
          <img src="/assets/theo-point.png" alt="Theo pointing down" />
        </div>

        {/* Right Box */}
        <div className="returning-box">
          <h3>Enter Your Information Below</h3>
          <input type="text" placeholder="Phone Number" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Loyalty Number" />
          <button className="btn-submit">Submit</button>
        </div>
      </div>
    </div>
  );
}
