"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Surprise() {
  const [showPopup, setShowPopup] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);

  const triggerSurprise = useCallback(() => {
    // Confetti
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#fb7185", "#fda4af", "#fecdd3", "#ffe4e6", "#fbbf24"],
    };

    confetti({
      ...defaults,
      particleCount: count,
      spread: 60,
      startVelocity: 30,
    });

    confetti({
      ...defaults,
      particleCount: count,
      spread: 100,
      startVelocity: 45,
      decay: 0.9,
    });

    // Floating hearts
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      delay: Math.random() * 0.5,
    }));
    setHearts(newHearts);

    // Show popup
    setShowPopup(true);

    // Cleanup hearts
    setTimeout(() => setHearts([]), 4000);
  }, []);

  return (
    <section id="surprise" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
            A Little Surprise
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10">
            I have something to tell you
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.button
            onClick={triggerSurprise}
            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600 text-white font-medium text-base tracking-wide shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              A Little Surprise{" "}
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </ScrollReveal>
      </div>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-40"
            style={{ left: `${heart.x}%`, bottom: "20%" }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, -200, -400],
              scale: [0.5, 1, 0.8],
              x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, delay: heart.delay, ease: "easeOut" }}
          >
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400/50" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 max-w-md w-full border border-rose-100/50 dark:border-slate-700/50 shadow-2xl"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 dark:from-rose-500 dark:to-rose-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.p
                className="text-center text-xl sm:text-2xl font-serif text-slate-800 dark:text-slate-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I&apos;m grateful to have you{" "}
                <span className="text-rose-500 dark:text-rose-400">❤</span>
              </motion.p>

              <motion.button
                className="mt-8 w-full py-3 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-medium text-sm hover:bg-rose-200 dark:hover:bg-rose-900/70 transition-colors"
                onClick={() => setShowPopup(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
