"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToContent = () => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-200/30 dark:bg-rose-800/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-100/20 dark:bg-rose-900/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-rose-100/20 dark:from-rose-800/10 to-transparent rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Decorative line */}
        <motion.div
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Happy Girlfriend Day{" "}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="text-rose-500 dark:text-rose-400">❤</span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-light tracking-wide mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          A little surprise, made just for you.
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={scrollToContent}
          className="group relative px-8 py-3.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-rose-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 font-medium text-sm tracking-wider hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-rose-400/60 dark:text-rose-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
