"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { starxConfig } from "@/config/starx";

export const BackgroundEffects: React.FC = () => {
  const [hasMobileError, setHasMobileError] = useState(false);
  const [hasPcError, setHasPcError] = useState(false);

  const hasMobileBg = Boolean(
    starxConfig.backgroundImage &&
      starxConfig.backgroundImage.trim() !== "" &&
      !hasMobileError
  );

  const hasPcBg = Boolean(
    starxConfig.backgroundPcImage &&
      starxConfig.backgroundPcImage.trim() !== "" &&
      !hasPcError
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Solid Deep Black #050505 */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* 2. Real StarX Live Concert Background Image */}
      {hasMobileBg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Mobile / Portrait Background */}
          <div className={`relative w-full h-full ${hasPcBg ? "md:hidden" : ""}`}>
            <Image
              src={starxConfig.backgroundImage}
              alt="StarX Live Stage Background"
              fill
              priority
              quality={88}
              sizes="100vw"
              onError={() => setHasMobileError(true)}
              className="object-cover object-top filter brightness-[0.92] contrast-[1.05]"
            />
          </div>

          {/* Desktop / Landscape Background */}
          {hasPcBg && (
            <div className="relative w-full h-full hidden md:block">
              <Image
                src={starxConfig.backgroundPcImage!}
                alt="StarX Live Concert Stage"
                fill
                priority
                quality={90}
                sizes="100vw"
                onError={() => setHasPcError(true)}
                className="object-cover object-center filter brightness-[0.90] contrast-[1.05]"
              />
            </div>
          )}
        </motion.div>
      )}

      {/* 3. Layered Darkening Gradient Overlay for Perfect Card Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-[#050505]/92" />

      {/* 4. Top Conic Red Stage Spotlight Lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[580px] bg-stage-spotlight opacity-65 filter blur-2xl" />

      {/* 5. Radial Red Concert Glow Behind Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[520px] bg-stage-radial opacity-90" />

      {/* 6. Soft Vignette Overlay */}
      <div className="absolute inset-0 stage-vignette opacity-75" />
    </div>
  );
};
