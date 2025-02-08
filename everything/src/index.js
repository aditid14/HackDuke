import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this file exists or remove this line if you're not using styles
import HealthScreeningApp from "./App";

// Ensure there's an element with id="root" in your public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HealthScreeningApp />
  </React.StrictMode>
);
