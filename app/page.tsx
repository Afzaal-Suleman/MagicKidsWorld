"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ThemeSelector } from "@/components/ThemeSelector";
import { SampleUI } from "@/components/SampleUI";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { activeTheme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // We check if a theme was already in localStorage
    const saved = localStorage.getItem("app-theme");
    if (saved) {
      setShowWelcome(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <AnimatePresence mode="wait">
        {!showWelcome ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center min-h-[80vh]"
          >
            <ThemeSelector />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWelcome(true)}
              className="mt-8 bg-primary text-primary-foreground px-12 py-4 rounded-full text-2xl font-black shadow-xl"
            >
              Enter Magic World
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <SampleUI />

            <div className="max-w-6xl mx-auto px-6 mt-20">
              <div className="h-1 bg-primary/10 rounded-full mb-20" />
              <ThemeSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center opacity-40 py-10">
        <p>© 2026 Magic Kids World - Made with ✨ and Next.js 15</p>
      </footer>
    </div>
  );
}
