"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// EDIT THIS MESSAGE EASILY
const LETTER_MESSAGE = `Hey you,

I know we are miles apart, but I want you to know that you are always on my mind. Every day, I am grateful for having you in my life.

You make the distance feel smaller with your warmth, your kindness, and the way you light up my world even from afar. I appreciate every moment we share, every call, every message, every laugh.

Thank you for being you. For your patience, your love, and for choosing me every single day. I cannot wait for all the memories we will create together in the future.

Happy Girlfriend Day. You mean the world to me.

With all my love,`;

export function LoveLetter() {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < LETTER_MESSAGE.length) {
        setDisplayedText(LETTER_MESSAGE.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section
      id="love-letter"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4"
    >
      <ScrollReveal>
        <div className="max-w-2xl mx-auto">
          {/* Paper card */}
          <motion.div
            className="relative p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-rose-100/50 dark:border-slate-700/50 shadow-[0_4px_30px_rgba(251,113,133,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400">
                <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
              </svg>
            </div>

            {/* Wax seal */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">✉</span>
              </div>
            </motion.div>

            {/* Letter content */}
            <div className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg whitespace-pre-wrap min-h-[300px]">
              {displayedText}
              {!isComplete && hasStarted && (
                <motion.span
                  className="inline-block w-[2px] h-5 bg-rose-400 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Signature */}
            <motion.div
              className="mt-8 pt-6 border-t border-rose-100/50 dark:border-slate-700/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-serif italic text-rose-500 dark:text-rose-400 text-lg">
                Forever yours
              </p>
            </motion.div>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
