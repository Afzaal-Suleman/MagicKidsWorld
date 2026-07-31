"use client";

import { Theme } from "@/themes/themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onClick: () => void;
}

export const ThemeCard = ({ theme, isActive, onClick }: ThemeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-4 rounded-[2rem] border-4 transition-all duration-300 w-full text-left",
        isActive ? "border-primary bg-primary/10" : "border-transparent bg-card shadow-lg hover:shadow-xl"
      )}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-lg font-bold" style={{ color: `hsl(${theme.colors.foreground})` }}>
          {theme.name}
        </span>
        {isActive && (
          <div className="bg-primary rounded-full p-1">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="flex gap-2 w-full">
        <div
          className="h-12 w-full rounded-xl"
          style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
        />
        <div
          className="h-12 w-full rounded-xl"
          style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
        />
        <div
          className="h-12 w-full rounded-xl"
          style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
        />
      </div>
    </motion.button>
  );
};
