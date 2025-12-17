import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
