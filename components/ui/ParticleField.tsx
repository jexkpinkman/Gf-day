"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Particle } from "@/types";

export function ParticleField() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0, -30, 0],
            x: [0, 20, -20, 10, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          initial={{ opacity: 0 }}
        >
          <div className="w-full h-full rounded-full bg-rose-300/40 dark:bg-rose-400/30 shadow-[0_0_10px_rgba(251,113,133,0.3)]" />
        </motion.div>
      ))}
    </div>
  );
}
