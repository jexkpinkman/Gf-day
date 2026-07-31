"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// EDIT: Place your music file in public/music/ and update this path
const MUSIC_PATH = "/music/our-song.mp3";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_PATH);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user needs to interact
      });
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
    setShowHint(false);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
      setCurrentTime(newTime);
    },
    [duration]
  );

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <section id="music" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-3">
              Our Song
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              The soundtrack of us
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl border border-rose-100/50 dark:border-slate-700/50 p-6 sm:p-8 shadow-[0_4px_30px_rgba(251,113,133,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Album art placeholder */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-rose-200 to-rose-300 dark:from-rose-700 dark:to-rose-800 flex items-center justify-center shadow-lg"
                animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="w-12 h-12 text-white/80" />
              </motion.div>
            </div>

            {/* Song info */}
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
                Our Song
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Replace with your song in public/music/
              </p>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1.5 bg-rose-100 dark:bg-slate-700 rounded-full mb-2 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full relative"
                style={{ width: `${progress}%` }}
                layout
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
              </motion.div>
            </div>

            {/* Time */}
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mb-6">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Volume */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Pause className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Play className="w-6 h-6 ml-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && !hasInteracted && (
                <motion.p
                  className="text-center text-xs text-rose-400 mt-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Click play to start the music
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
