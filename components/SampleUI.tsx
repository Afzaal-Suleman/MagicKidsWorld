"use client";

import { motion } from "framer-motion";
import { CreditCard, Bell, Settings, Search, User, Mail, Send } from "lucide-react";

export const SampleUI = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto space-y-20">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4">Magic Components</h2>
        <p className="opacity-70">See how everything changes with your theme!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card Sample */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-card p-8 rounded-[2.5rem] shadow-xl border-4 border-primary/10"
        >
          <div className="bg-primary/20 p-4 rounded-2xl w-fit mb-6">
            <Bell className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Cool Alerts</h3>
          <p className="opacity-70 mb-6">These alerts tell you when something awesome happens in your world!</p>
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold">
            Try Me
          </button>
        </motion.div>

        {/* Form Sample */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-card p-8 rounded-[2.5rem] shadow-xl border-4 border-secondary/10"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Secret Box</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              <input
                type="text"
                placeholder="Find a game..."
                className="w-full bg-muted border-2 border-transparent focus:border-primary p-4 pl-12 rounded-2xl outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              <input
                type="email"
                placeholder="Your email..."
                className="w-full bg-muted border-2 border-transparent focus:border-secondary p-4 pl-12 rounded-2xl outline-none transition-all"
              />
            </div>
            <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Magic
            </button>
          </div>
        </motion.div>

        {/* Profile Sample */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-card p-8 rounded-[2.5rem] shadow-xl border-4 border-accent/10 flex flex-col items-center text-center"
        >
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-4 border-4 border-accent">
            <User className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-2xl font-bold">Awesome Player</h3>
          <p className="opacity-70 mb-6">Level 99 Hero</p>
          <div className="w-full bg-muted h-4 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              className="h-full bg-accent"
            />
          </div>
          <span className="text-sm font-bold opacity-60">Magic Power: 70%</span>
        </motion.div>
      </div>

      {/* Large Interactive Component */}
      <div className="bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <motion.div
          className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl font-black mb-4">Join the Magic Club!</h2>
            <p className="text-xl opacity-90 max-w-lg">
              Unlock special themes, secret levels, and legendary badges by joining our community today.
            </p>
          </div>
          <button className="bg-white text-primary px-10 py-5 rounded-full text-2xl font-black hover:scale-110 transition-transform">
            Sign Up Now
          </button>
        </div>
      </div>
    </section>
  );
};
