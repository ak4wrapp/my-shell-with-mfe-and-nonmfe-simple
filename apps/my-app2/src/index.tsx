import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Get the root element safely and handle potential null values
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement); // Create the root for React 18

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
