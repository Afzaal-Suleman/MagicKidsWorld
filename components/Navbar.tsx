"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Home } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-background/50 border-b border-primary/10"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-2xl shadow-lg">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-black tracking-tighter hidden sm:block">
            KIDS WORLD
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink href="/alphabet" icon={<BookOpen className="w-4 h-4" />} label="Alphabet" primary />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-card text-foreground rounded-full shadow-md border border-primary/10 md:hidden flex items-center justify-center"
          >
            <Home className="w-6 h-6" />
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ href, icon, label, primary }: { href: string, icon: React.ReactNode, label: string, primary?: boolean }) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${
        primary
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "hover:bg-primary/5 opacity-80 hover:opacity-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  </Link>
);
