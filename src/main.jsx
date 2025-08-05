import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// Test to ensure React and Tailwind are working

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <div className="min-h-screen flex items-center justify-center bg-mutedBg">
//     <h1 className="text-3xl text-primary">✅ React & Tailwind are working!</h1>
//   </div>
// );
