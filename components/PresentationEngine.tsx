"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Play,
  Pause,
  Maximize,
  Minimize,
  RefreshCw,
  SkipBack,
  SkipForward,
  Shuffle,
  Clock,
  Settings,
  X
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { LearningItem } from "@/data/alphabet";
import confetti from "canvas-confetti";

interface PresentationEngineProps {
  items: LearningItem[];
  title: string;
}

export const PresentationEngine = ({ items, title }: PresentationEngineProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(5000);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPlaySound, setAutoPlaySound] = useState(true);
  const { activeTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % items.length;
      if (next === 0 && prev === items.length - 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToFirst = () => setCurrentIndex(0);
  const goToLast = () => setCurrentIndex(items.length - 1);
  const goToRandom = () => setCurrentIndex(Math.floor(Math.random() * items.length));

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const playPronunciation = useCallback(() => {
    const item = items[currentIndex];
    speak(`${item.letter}. ${item.word}`);
  }, [currentIndex, items, speak]);

  // Auto-play effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlay) {
      timer = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, autoPlayInterval, nextSlide]);

  // Auto-pronounce effect
  useEffect(() => {
    if (autoPlaySound) {
      const timer = setTimeout(playPronunciation, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoPlaySound, playPronunciation]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight": nextSlide(); break;
        case "ArrowLeft": prevSlide(); break;
        case " ": e.preventDefault(); playPronunciation(); break;
        case "f": toggleFullscreen(); break;
        case "r": goToRandom(); break;
        case "Home": goToFirst(); break;
        case "End": goToLast(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, playPronunciation]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary/10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Top Header */}
      <div className="w-full p-8 flex justify-between items-center z-10">
        <div className="text-2xl font-black text-primary/50">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          onClick={() => window.history.back()}
          className="p-3 bg-muted rounded-full hover:scale-110 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.1 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.h2
              className="text-[180px] md:text-[280px] font-black leading-none text-primary drop-shadow-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentItem.letter}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
                {currentItem.word}
              </h3>

              <motion.div
                className="text-[150px] md:text-[200px]"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {currentItem.emoji}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navigation Controls */}
      <div className="w-full p-12 flex items-center justify-center gap-8 md:gap-16 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-6 bg-secondary text-secondary-foreground rounded-[2rem] shadow-xl"
        >
          <ChevronLeft className="w-12 h-12" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playPronunciation}
          className="p-8 bg-primary text-primary-foreground rounded-[2.5rem] shadow-2xl"
        >
          <Volume2 className="w-16 h-16" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-6 bg-secondary text-secondary-foreground rounded-[2rem] shadow-xl"
        >
          <ChevronRight className="w-12 h-12" />
        </motion.button>
      </div>

      {/* Teacher Floating Toolbar */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-20">
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="bg-card/90 backdrop-blur-md p-4 rounded-[2rem] shadow-2xl border-4 border-primary/20 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 px-2 border-b border-primary/10 pb-4">
                <Clock className="w-5 h-5 opacity-50" />
                <select
                  value={autoPlayInterval}
                  onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                  className="bg-transparent font-bold outline-none"
                >
                  <option value={3000}>3 Seconds</option>
                  <option value={5000}>5 Seconds</option>
                  <option value={8000}>8 Seconds</option>
                  <option value={10000}>10 Seconds</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ControlButton
                  icon={isAutoPlay ? <Pause /> : <Play />}
                  label={isAutoPlay ? "Pause" : "Auto Play"}
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  active={isAutoPlay}
                />
                <ControlButton
                  icon={isFullscreen ? <Minimize /> : <Maximize />}
                  label="Full"
                  onClick={toggleFullscreen}
                />
                <ControlButton icon={<SkipBack />} label="First" onClick={goToFirst} />
                <ControlButton icon={<SkipForward />} label="Last" onClick={goToLast} />
                <ControlButton icon={<Shuffle />} label="Random" onClick={goToRandom} />
                <ControlButton
                  icon={<Volume2 />}
                  label="Sound"
                  onClick={() => setAutoPlaySound(!autoPlaySound)}
                  active={autoPlaySound}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowControls(!showControls)}
          className="p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:rotate-90 transition-transform"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

const ControlButton = ({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick: () => void, active?: boolean }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
      active ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
    }`}
  >
    <div className="w-6 h-6 mb-1">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
  </button>
);
