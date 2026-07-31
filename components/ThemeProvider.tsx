"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, themes } from "@/themes/themes";

type ThemeContextType = {
  activeTheme: Theme;
  setTheme: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<Theme>(themes[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedThemeId = localStorage.getItem("app-theme");
    if (savedThemeId) {
      const theme = themes.find((t) => t.id === savedThemeId);
      if (theme) setActiveTheme(theme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const colors = activeTheme.colors;

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.cardForeground);
    root.style.setProperty("--popover", colors.popover);
    root.style.setProperty("--popover-foreground", colors.popoverForeground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--muted-foreground", colors.mutedForeground);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    root.style.setProperty("--destructive", colors.destructive);
    root.style.setProperty("--destructive-foreground", colors.destructiveForeground);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.input);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--radius", colors.radius);

    localStorage.setItem("app-theme", activeTheme.id);
  }, [activeTheme, mounted]);

  const setTheme = (id: string) => {
    const theme = themes.find((t) => t.id === id);
    if (theme) setActiveTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
