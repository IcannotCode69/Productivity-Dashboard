/*
  App entry point:
  - Imports global styles (Tailwind directives live in index.css)
  - Renders the App component inside the #root element
  - React.StrictMode enables extra checks in development
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


