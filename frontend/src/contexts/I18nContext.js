import React, { createContext, useState, useMemo, useEffect } from "react";

/*
 Simple i18n Context
 - Languages: 'tr' (Turkish), 'de' (German), 'en' (English)
 - Usage: const { t, locale, setLocale } = useI18n();
 - Keep translations small and extendable. Add keys used across UI.
*/

const TRANSLATIONS = {
  tr: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    about: "Hakkımızda",
    contact: "İletişim",
    login: "Giriş",
    register: "Kayıt Ol",
    profile: "Profil",
    logout: "Çıkış",
    for_you: "for you",
    calendar: "Takvimi Gör",
    prechat: "Ön Görüşme",
    book: "Randevu Talep Et",
    booking_requires_login: "Randevu oluşturmak için giriş yapmalısınız.",
  },
  de: {
    home: "Startseite",
    services: "Dienstleistungen",
    about: "Über uns",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Registrieren",
    profile: "Profil",
    logout: "Abmelden",
    for_you: "für dich",
    calendar: "Kalender ansehen",
    prechat: "Vorgespräch",
    book: "Termin anfordern",
    booking_requires_login:
      "Um einen Termin zu erstellen, müssen Sie sich anmelden.",
  },
  en: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    profile: "Profile",
    logout: "Logout",
    for_you: "for you",
    calendar: "See calendar",
    prechat: "Pre-chat",
    book: "Request appointment",
    booking_requires_login: "You must be logged in to book an appointment.",
  },
};

export const I18nContext = createContext({
  locale: "tr",
  setLocale: () => {},
  t: (k) => k,
});

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try {
      return localStorage.getItem("locale") || "tr";
    } catch {
      return "tr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {}
  }, [locale]);

  const t = useMemo(
    () => (key) => {
      return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["en"][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};
