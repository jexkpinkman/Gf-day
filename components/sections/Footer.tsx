"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-300 dark:via-rose-700 to-transparent mx-auto mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.p
          className="text-sm text-slate-400 dark:text-slate-500 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Made with{" "}
          <motion.span
            className="inline-block text-rose-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤
          </motion.span>{" "}
          just for you
        </motion.p>
      </div>
    </footer>
  );
}
