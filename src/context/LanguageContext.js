"use client";
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { translations } from "@/locales/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  const t = useCallback(
    (key) => translations[lang]?.[key] || translations["ko"]?.[key] || key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
