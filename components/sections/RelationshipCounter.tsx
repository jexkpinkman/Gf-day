"use client";

import { motion } from "framer-motion";
import { Calendar, Edit2, Check, X } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { useState } from "react";

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-rose-100/50 dark:border-slate-700/50 flex items-center justify-center shadow-lg mb-2">
        <motion.span
          className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-mono tabular-nums"
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

export function RelationshipCounter() {
  const { timeLeft, startDate, isEditing, setIsEditing, updateStartDate } =
    useCountdown();

  const [editDate, setEditDate] = useState("");

  const handleEdit = () => {
    if (startDate) {
      setEditDate(startDate.toISOString().split("T")[0]);
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editDate) {
      updateStartDate(editDate);
    }
  };

  return (
    <section id="counter" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-3">
              Our Time Together
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Every second counts
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl border border-rose-100/50 dark:border-slate-700/50 p-8 sm:p-12 shadow-[0_4px_30px_rgba(251,113,133,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
            {/* Date display / Edit */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <Calendar className="w-5 h-5 text-rose-400" />
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-rose-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-rose-400"
                    autoFocus
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400"
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {startDate
                      ? startDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Set your start date"}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleEdit}
                    className="p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-slate-700 text-rose-400 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Counter */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            {!startDate && (
              <motion.p
                className="text-center text-sm text-rose-400 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click the edit icon to set your relationship start date
              </motion.p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
