"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { starxConfig } from "@/config/starx";

export const BrandHeader: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const hasValidLogo = Boolean(
    starxConfig.logoUrl && starxConfig.logoUrl.trim() !== "" && !imageError
  );

  return (
    <header className="flex flex-col items-center text-center pt-2 pb-4 px-4 select-none">
      {hasValidLogo ? (
        /* OFFICIAL LOGO HERO PRESENTATION */
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          {/* Subtle Ambient Red Glow Behind Logo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full filter blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Real StarX Live Official Logo */}
          <div className="relative z-10 w-[200px] xs:w-[220px] sm:w-[240px] max-w-[85vw] flex items-center justify-center">
            <Image
              src={starxConfig.logoUrl}
              alt={`${starxConfig.brandName} - ${starxConfig.categoryLabel}`}
              width={240}
              height={240}
              priority
              onError={() => setImageError(true)}
              className="w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_18px_rgba(225,6,0,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Genre Micro-text Below Official Logo */}
          {starxConfig.genreText && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.45 }}
              className="mt-3"
            >
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-text-secondary/90 font-medium bg-black/40 backdrop-blur-sm border border-white/[0.08] px-3.5 py-1 rounded-full shadow-sm">
                {starxConfig.genreText}
              </p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* FALLBACK TEXT-BASED BRANDING (Only if logo is missing or fails to load) */
        <div className="flex flex-col items-center">
          {/* Star Icon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative mb-3 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-surface-elevated to-surface-card border border-white/10 flex items-center justify-center shadow-lg shadow-black/60">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent drop-shadow-[0_0_8px_rgba(225,6,0,0.8)]"
              >
                <path
                  d="M12 2L14.9 8.26L21.8 9.27L16.8 14.14L18 21.02L12 17.77L6 21.02L7.2 14.14L2.2 9.27L9.1 8.26L12 2Z"
                  fill="currentColor"
                  stroke="#FF4D4D"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* STARX Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl tracking-wider uppercase font-normal text-white leading-none"
          >
            STAR<span className="text-accent drop-shadow-[0_0_12px_rgba(225,6,0,0.6)]">X</span>
          </motion.h1>

          {/* LIVE Sub-Headline */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.45 }}
            className="mt-1"
          >
            <span className="font-display text-lg sm:text-xl tracking-[0.35em] uppercase font-normal text-accent/90 pl-[0.35em]">
              LIVE
            </span>
          </motion.div>

          {/* ROCK BAND Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="mt-2.5"
          >
            <span className="inline-block text-[10px] tracking-[0.25em] font-semibold uppercase text-text-secondary bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-0.5">
              {starxConfig.categoryLabel}
            </span>
          </motion.div>

          {/* Script Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
            className="mt-2 font-script text-2xl sm:text-3xl text-white/90 font-normal tracking-wide"
          >
            {starxConfig.tagline}
          </motion.p>
        </div>
      )}
    </header>
  );
};
