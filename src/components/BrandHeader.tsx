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
    <header className="flex flex-col items-center text-center pt-6 sm:pt-7 pb-2 sm:pb-3 px-4 select-none">
      {hasValidLogo ? (
        /* OFFICIAL TRANSPARENT LOGO HERO PRESENTATION */
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          {/* Subtle Ambient Red Radial Glow Behind Logo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 h-48 sm:h-56 bg-accent/15 rounded-full filter blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Real StarX Live Official Transparent Logo */}
          <div className="relative z-10 w-[min(65vw,230px)] md:w-[260px] flex items-center justify-center">
            <Image
              src={starxConfig.logoUrl}
              alt={`${starxConfig.brandName} - ${starxConfig.categoryLabel}`}
              width={260}
              height={260}
              priority
              onError={() => setImageError(true)}
              className="w-full h-auto object-contain [filter:drop-shadow(0_6px_18px_rgba(0,0,0,0.55))_drop-shadow(0_0_16px_rgba(225,6,0,0.16))] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Official Tagline: Music heals. */}
          {starxConfig.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              className="mt-3 sm:mt-3.5 font-script text-2xl sm:text-3xl text-white/95 font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {starxConfig.tagline}
            </motion.p>
          )}

          {/* Genre Line Below Tagline */}
          {starxConfig.genreText && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              className="mt-2.5 sm:mt-3"
            >
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-text-secondary/90 font-medium bg-black/40 backdrop-blur-sm border border-white/[0.08] px-3.5 py-1 rounded-full shadow-sm">
                {starxConfig.genreText}
              </p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* FALLBACK TEXT-BASED BRANDING (Only if logo fails to load) */
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl tracking-wider uppercase text-white leading-none">
            STAR<span className="text-accent">X</span> LIVE
          </h1>
          <p className="mt-2 font-script text-xl sm:text-2xl text-white/90 font-normal">
            {starxConfig.tagline}
          </p>
          {starxConfig.genreText && (
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-secondary">
              {starxConfig.genreText}
            </p>
          )}
        </motion.div>
      )}
    </header>
  );
};
