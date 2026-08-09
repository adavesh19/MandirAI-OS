"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Calendar, Clock, Sparkles } from "lucide-react";

interface PanchangTickerProps {
  className?: string;
}

export const PanchangTicker: React.FC<PanchangTickerProps> = ({ className = "" }) => {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [countdownStr, setCountdownStr] = useState("Loading...");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    setCurrentDateStr(today.toLocaleDateString("en-IN", options));

    // Calculate countdown to next major festival (e.g. Mahashivratri / Navratri)
    const targetFestivalDate = new Date(today.getFullYear(), 2, 8); // Example target date
    if (today > targetFestivalDate) {
      targetFestivalDate.setFullYear(today.getFullYear() + 1);
    }

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetFestivalDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdownStr(`${days}d ${hours}h ${mins}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200/90 text-xs py-2 px-4 border-b border-amber-500/20 overflow-x-auto whitespace-nowrap shadow-inner ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-2">
        {/* Date & Samvat */}
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium">{currentDateStr}</span>
          <span className="text-amber-500/60">|</span>
          <span className="text-amber-300 font-semibold">Vikram Samvat 2081</span>
        </div>

        {/* Live Panchang Metrics */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-amber-100 font-medium">Tithi:</span>
            <span className="text-amber-300 font-semibold">Shukla Ekadashi</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span className="text-amber-100 font-medium">Nakshatra:</span>
            <span className="text-amber-300 font-semibold">Rohini</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-amber-100 font-medium">Abhijit Muhurat:</span>
            <span className="text-emerald-300 font-semibold">11:48 AM – 12:36 PM</span>
          </div>

          <div className="flex items-center gap-1.5 text-red-300">
            <span className="font-medium">Rahu Kalam:</span>
            <span className="font-semibold text-red-400">04:30 PM – 06:00 PM</span>
          </div>
        </div>

        {/* Festival Countdown */}
        <div className="flex items-center gap-2 bg-amber-900/40 border border-amber-500/30 px-3 py-0.5 rounded-full text-amber-300">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Mahashivratri:</span>
          <span className="font-bold text-amber-100">{countdownStr}</span>
        </div>
      </div>
    </div>
  );
};
