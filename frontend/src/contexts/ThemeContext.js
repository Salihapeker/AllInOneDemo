import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // localStorage'dan tema oku
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // HTML'e data-theme attribute ekle
    document.documentElement.setAttribute("data-theme", theme);
    // localStorage'a kaydet
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
