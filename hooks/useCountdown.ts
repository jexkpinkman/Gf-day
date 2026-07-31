"use client";

import { useState, useEffect, useCallback } from "react";
import { TimeLeft } from "@/types";

const STORAGE_KEY = "relationship-start-date";

export function useCountdown() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStartDate(new Date(saved));
    }
  }, []);

  useEffect(() => {
    if (!startDate) return;

    const calculate = () => {
      const now = new Date().getTime();
      const start = startDate.getTime();
      const diff = now - start;

      if (diff < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const updateStartDate = useCallback((date: string) => {
    const newDate = new Date(date);
    setStartDate(newDate);
    localStorage.setItem(STORAGE_KEY, newDate.toISOString());
    setIsEditing(false);
  }, []);

  return { timeLeft, startDate, isEditing, setIsEditing, updateStartDate };
}
