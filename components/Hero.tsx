"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Star, Heart, Cloud, Zap, BookOpen } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  const { activeTheme } = useTheme();

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center pt-4 px-6 overflow-hidden">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-4 border-dashed border-primary/30 rounded-full"
          />
          <div className="bg-primary text-primary-foreground p-8 rounded-[3rem] shadow-2xl">
            <Star className="w-16 h-16 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
      >
        Welcome to your <br />
        <span className="text-primary">{activeTheme.name}!</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl max-w-2xl opacity-80 leading-relaxed mb-10"
      >
        A magical place where you can explore and play in your favorite colors.
        Everything here is designed just for you!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/alphabet"
          className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-2xl font-black hover:scale-105 transition-transform shadow-xl flex items-center gap-3"
        >
          <BookOpen className="w-8 h-8" />
          Learn ABCs
        </Link>
        <button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg">
          Learn More
        </button>
      </motion.div>

      {/* Floating Elements */}
      <FloatingIcon icon={<Heart className="w-8 h-8 text-destructive" />} delay={0} x="10%" y="20%" />
      <FloatingIcon icon={<Cloud className="w-10 h-10 text-primary" />} delay={1} x="85%" y="15%" />
      <FloatingIcon icon={<Zap className="w-6 h-6 text-accent" />} delay={2} x="15%" y="70%" />
      <FloatingIcon icon={<Star className="w-8 h-8 text-primary" />} delay={0.5} x="80%" y="60%" />
    </section>
  );
};

const FloatingIcon = ({ icon, delay, x, y }: { icon: React.ReactNode, delay: number, x: string, y: string }) => (
  <motion.div
    className="absolute hidden md:block"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
);
