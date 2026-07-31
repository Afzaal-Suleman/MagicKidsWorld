"use client";

import { themes } from "@/themes/themes";
import { useTheme } from "./ThemeProvider";
import { ThemeCard } from "./ThemeCard";
import { motion } from "framer-motion";

export const ThemeSelector = () => {
  const { activeTheme, setTheme } = useTheme();

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4">Pick Your Magic World!</h2>
        <p className="text-xl opacity-70">Choose a theme that makes you smile ✨</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <ThemeCard
              theme={theme}
              isActive={activeTheme.id === theme.id}
              onClick={() => setTheme(theme.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
