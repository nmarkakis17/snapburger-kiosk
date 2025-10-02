// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Registration from "./pages/Registration.jsx"; // ✅ adjust if you put it elsewhere

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing (App) */}
        <Route path="/" element={<App />} />

        {/* Registration */}
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
