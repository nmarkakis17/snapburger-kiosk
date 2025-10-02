import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import App from "./App.jsx";
import Registration from "./pages/Registration.jsx";

function DebugBanner() {
  const loc = useLocation();
  return (
    <div style={{
      position:"fixed", left:8, bottom:8, zIndex:9999,
      background:"#111827", color:"#fff", padding:"6px 10px",
      borderRadius:8, fontSize:12, opacity:.8
    }}>
      Route: <b>{loc.pathname}</b>
    </div>
  );
}

function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <DebugBanner />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
