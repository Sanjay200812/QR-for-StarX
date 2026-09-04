"use client";

import React from "react";
import { starxConfig } from "@/config/starx";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-center text-center pt-8 pb-12 px-4 select-none">
      {/* Equalizer Waveform Micro-line */}
      <div className="flex items-center space-x-1.5 mb-5 opacity-60" aria-hidden="true">
        {[40, 75, 55, 90, 45, 80, 60, 95, 50, 70].map((h, i) => (
          <span
            key={i}
            className="w-1 bg-gradient-to-t from-accent/80 to-accent/30 rounded-full animate-sound-wave"
            style={{
              height: `${12 + (h % 14)}px`,
              animationDelay: `${(i * 0.12).toFixed(2)}s`,
            }}
          />
        ))}
      </div>

      {/* Script "Thank You!" with red flanking lines */}
      <div className="flex items-center justify-center space-x-3 w-full max-w-xs mb-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-accent/50 to-accent" />
        <span className="font-script text-3xl sm:text-4xl text-white font-normal px-2 tracking-wide drop-shadow-[0_0_8px_rgba(225,6,0,0.4)]">
          Thank You!
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-accent/50 to-accent" />
      </div>

      {/* Support Live Music Callout */}
      <p className="text-xs sm:text-[13px] font-medium text-text-secondary tracking-wide uppercase mt-1">
        Support Live Music. Support Us.
      </p>

      {/* Band & Location */}
      <div className="mt-4 flex flex-col items-center space-y-0.5">
        <span className="font-display text-base tracking-[0.2em] text-white/90">
          STAR<span className="text-accent">X</span> LIVE
        </span>
        <span className="text-[11px] text-text-muted">
          {starxConfig.location}
        </span>
      </div>

      {/* Copyright */}
      <p className="text-[10px] text-text-muted/70 tracking-wider mt-5">
        © 2026 {starxConfig.brandName}. All rights reserved.
      </p>
    </footer>
  );
};
