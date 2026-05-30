"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { translations } from "@/locales/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  const t = (key) => {
    return translations[lang]?.[key] || translations["ko"]?.[key] || key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
