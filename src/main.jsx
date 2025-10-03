// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

const root = document.getElementById("root")
if (!root) {
  // super defensive: create a root if index.html was altered
  const div = document.createElement("div")
  div.id = "root"
  document.body.appendChild(div)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
