import { initReactI18next } from "react-i18next";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import React from "react";

import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import App from "@/routes";

import { resources } from "@/utils/datas/resources";
import "@/styles/globals.css";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "id",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider defaultLanguage="en" storageKey="vite-ui-language">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
