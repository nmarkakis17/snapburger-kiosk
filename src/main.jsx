import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Registration from './pages/Registration.jsx'
import Returning from './pages/Returning.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing page (with tower image + CTA pills) */}
        <Route path="/" element={<App />} />

        {/* New customer registration (multi-step) */}
        <Route path="/register" element={<Registration />} />

        {/* Returning customer (loyalty card landing + scan/enter options) */}
        <Route path="/returning" element={<Returning />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

