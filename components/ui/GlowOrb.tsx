"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function GlowOrb({
  className = "",
  color = "bg-rose-300",
  size = 300,
  duration = 8,
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${color} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
