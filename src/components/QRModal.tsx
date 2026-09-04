"use client";

import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { starxConfig } from "@/config/starx";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use current window location to ensure QR dynamically represents deployment domain
      setCurrentUrl(window.location.href);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="relative w-full max-w-sm bg-surface-elevated border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black text-center z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close QR dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-2">
              <QrCode className="w-5 h-5" />
            </div>
            <h2 id="qr-modal-title" className="font-display text-2xl tracking-wider uppercase text-white font-normal">
              STAR<span className="text-accent">X</span> LIVE
            </h2>
            <p className="text-xs uppercase tracking-widest text-text-secondary mt-0.5">
              Scan to Connect
            </p>
          </div>

          {/* QR Code Container with High Contrast & Quiet Zone */}
          <div className="mt-5 mb-4 p-4 bg-white rounded-2xl inline-block shadow-lg shadow-black/50">
            {currentUrl ? (
              <QRCodeSVG
                value={currentUrl}
                size={200}
                level="Q"
                includeMargin={false}
                bgColor="#FFFFFF"
                fgColor="#050505"
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center text-black text-xs">
                Generating QR...
              </div>
            )}
          </div>

          {/* Script Tagline & band info */}
          <div className="mt-2">
            <p className="font-script text-xl text-accent font-normal tracking-wide">
              {starxConfig.tagline}
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              Point any mobile camera to open this official StarX Live link page immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
