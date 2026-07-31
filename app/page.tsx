"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ParticleField } from "@/components/ui/ParticleField";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { PasswordScreen } from "@/components/sections/PasswordScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoveLetter } from "@/components/sections/LoveLetter";
import { Gallery } from "@/components/sections/Gallery";
import { RelationshipCounter } from "@/components/sections/RelationshipCounter";
import { MusicPlayer } from "@/components/sections/MusicPlayer";
import { Surprise } from "@/components/sections/Surprise";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100" />
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background particles */}
      {isUnlocked && <ParticleField />}

      {/* Theme toggle */}
      {isUnlocked && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}

      {/* Password screen */}
      <AnimatePresence>
        {!isUnlocked && <PasswordScreen onUnlock={() => setIsUnlocked(true)} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {isUnlocked && (
          <div className="relative z-10">
            <HeroSection />
            <LoveLetter />
            <Gallery />
            <RelationshipCounter />
            <MusicPlayer />
            <Surprise />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
