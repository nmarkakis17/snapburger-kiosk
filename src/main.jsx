import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Registration from './pages/Registration.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/register" element={<Registration />} />
</Routes>
