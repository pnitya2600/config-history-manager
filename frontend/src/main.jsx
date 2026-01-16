import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/jsondiffpatch.css"; // 👈 ADD THIS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
