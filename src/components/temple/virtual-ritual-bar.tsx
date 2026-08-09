"use client";

import React, { useState, useRef } from "react";
import { Flame, Bell, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";
import { SacredParticles } from "../ui/sacred-particles";

interface VirtualRitualBarProps {
  templeName?: string;
  className?: string;
}

export const VirtualRitualBar: React.FC<VirtualRitualBarProps> = ({
  templeName = "Mandir",
  className = "",
}) => {
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [bellRings, setBellRings] = useState(0);
  const [flowerShowerActive, setFlowerShowerActive] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeRitualMessage, setActiveRitualMessage] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio API Synthesizers
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Ring Brass Bell Sound Synthesizer
  const playBellSound = () => {
    try {
      const ctx = getAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      // Authentic Brass Bell Frequencies
      osc1.frequency.setValueAtTime(1480, ctx.currentTime);
      osc2.frequency.setValueAtTime(2960, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.6, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1.stop(ctx.currentTime + 2.5);
      osc2.stop(ctx.currentTime + 2.5);

      setBellRings((prev) => prev + 1);
      showMessage(`🔔 Temple Bell Ringing — May your prayers be heard at ${templeName}`);
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  // Shankhnaad (Conch Shell) Sound Synthesizer
  const playShankhSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.0);

      showMessage(`🐚 Shankhnaad Sounded — Divine Energy Invoked!`);
    } catch (e) {
      console.log("Shankh sound error", e);
    }
  };

  const handleLightDiya = () => {
    setIsDiyaLit(!isDiyaLit);
    if (!isDiyaLit) {
      showMessage(`🪔 Digital Aarti Diya Lit — Radiating Peace & Positivity`);
    } else {
      showMessage(`Diya extinguished`);
    }
  };

  const handleFlowerShower = () => {
    setFlowerShowerActive(true);
    showMessage(`🌸 Pushpanjali Offered — Fresh Marigold Petals Showered`);
    setTimeout(() => {
      setFlowerShowerActive(false);
    }, 4000);
  };

  const toggleMantraAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      showMessage(`🕉️ Vedic Ambient Chanting Started`);
    } else {
      showMessage(`Audio Paused`);
    }
  };

  const showMessage = (msg: string) => {
    setActiveRitualMessage(msg);
    setTimeout(() => {
      setActiveRitualMessage(null);
    }, 3500);
  };

  return (
    <>
      {/* Flower Shower Overlay */}
      {flowerShowerActive && (
        <SacredParticles variant="marigold" quantity={80} className="fixed inset-0 z-50 pointer-events-none" />
      )}

      {/* Floating Ambient Diya Light Glow Overlay if Diya is Lit */}
      {isDiyaLit && (
        <div className="fixed inset-0 pointer-events-none z-10 bg-radial from-amber-500/10 via-orange-500/5 to-transparent transition-opacity duration-1000" />
      )}

      {/* Notification Banner */}
      {activeRitualMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-900/90 via-orange-950/90 to-amber-900/90 backdrop-blur-md text-amber-100 text-xs md:text-sm font-medium px-6 py-2.5 rounded-full border border-amber-500/40 shadow-2xl shadow-amber-900/50 animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{activeRitualMessage}</span>
        </div>
      )}

      {/* Interactive Floating Ritual Bar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto ${className}`}>
        <div className="bg-gradient-to-r from-stone-900/95 via-amber-950/95 to-stone-900/95 border border-amber-500/30 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl shadow-amber-950/80 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 text-amber-200">
          
          {/* Ring Bell */}
          <button
            onClick={playBellSound}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/40 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all active:scale-95"
            title="Ring Brass Temple Bell"
          >
            <Bell className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold hidden sm:inline">Ring Bell</span>
            {bellRings > 0 && (
              <span className="text-[10px] bg-amber-500/30 text-amber-300 font-bold px-1.5 py-0.5 rounded-full">
                {bellRings}
              </span>
            )}
          </button>

          {/* Light Aarti Diya */}
          <button
            onClick={handleLightDiya}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
              isDiyaLit
                ? "bg-amber-500 text-stone-950 border-amber-300 font-bold shadow-lg shadow-amber-500/50"
                : "bg-amber-900/40 hover:bg-amber-600/30 border-amber-500/30 text-amber-300 hover:text-amber-100"
            }`}
            title="Light Digital Aarti Diya"
          >
            <Flame className={`w-4 h-4 ${isDiyaLit ? "text-red-950 fill-amber-300 animate-pulse" : "text-amber-400"}`} />
            <span className="text-xs font-semibold hidden sm:inline">{isDiyaLit ? "Diya Lit ✨" : "Light Diya"}</span>
          </button>

          {/* Offer Pushpanjali */}
          <button
            onClick={handleFlowerShower}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/40 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all active:scale-95"
            title="Offer Pushpanjali (Flower Shower)"
          >
            <Heart className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform fill-orange-400/30" />
            <span className="text-xs font-semibold hidden sm:inline">Pushpanjali</span>
          </button>

          {/* Sound Shankh */}
          <button
            onClick={playShankhSound}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/40 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all active:scale-95"
            title="Sound Shankh (Conch)"
          >
            <span className="text-sm">🐚</span>
            <span className="text-xs font-semibold hidden sm:inline">Shankh</span>
          </button>

          {/* Ambient Vedic Audio */}
          <button
            onClick={toggleMantraAudio}
            className={`p-2 rounded-full border transition-all active:scale-95 ${
              isPlayingAudio
                ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/40"
                : "bg-amber-900/40 hover:bg-amber-600/30 border-amber-500/30 text-amber-400"
            }`}
            title="Toggle Vedic Chanting Audio"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </>
  );
};
