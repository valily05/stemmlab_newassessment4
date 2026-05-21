import React, { createContext, ReactNode, useContext, useState } from "react";
import translations from "../constants/translations";

type Language = 'English' | 'Bahasa Indonesia';

type Props = {
  children: ReactNode;
};

const LanguageContext = createContext({
  language: 'English' as Language,
  setLanguage: (lang: Language) => {},
  t: {} as any,
});

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>('English');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};