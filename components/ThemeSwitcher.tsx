"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { themes } from "@/themes/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { ThemeCard } from "./ThemeCard";

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme, setTheme } = useTheme();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-64 inset-0 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-background w-full max-w-4xl max-h-[80vh] overflow-y-auto  p-8 relative shadow-2xl border-4 border-primary/20"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <h2 className="text-3xl font-black mb-8">Switch Theme</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeTheme.id === theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
