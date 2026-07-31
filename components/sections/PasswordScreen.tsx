"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart } from "lucide-react";

interface PasswordScreenProps {
  onUnlock: () => void;
}

export function PasswordScreen({ onUnlock }: PasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "0108") {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200/30 dark:from-rose-900/20 via-transparent to-transparent" />

      {/* Card */}
      <motion.div
        className="relative z-10"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-[340px] sm:w-[380px] p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(251,113,133,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 dark:from-rose-600 dark:to-rose-700 flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-center text-xl font-serif font-semibold text-slate-800 dark:text-slate-100 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A Little Secret
          </motion.h2>
          <motion.p
            className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter the code to unlock your surprise
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                maxLength={4}
                className="w-full px-5 py-3.5 text-center text-lg tracking-[0.5em] rounded-2xl bg-white/80 dark:bg-slate-700/80 border-2 border-rose-100 dark:border-slate-600 focus:border-rose-400 dark:focus:border-rose-500 focus:outline-none transition-colors text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-500"
                autoFocus
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600 text-white font-medium text-sm tracking-wide hover:shadow-lg hover:shadow-rose-300/30 dark:hover:shadow-rose-900/30 transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center justify-center gap-2">
                Unlock <Heart className="w-4 h-4" />
              </span>
            </motion.button>
          </form>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-center text-sm text-rose-500 mt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                That doesn&apos;t seem right. Try again?
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
