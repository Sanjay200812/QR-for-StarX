"use client";

import React, { useEffect, useState } from "react";
import { X, Download, Maximize2, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { starxConfig } from "@/config/starx";

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  // Close on Escape key
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

  const handleDownloadClick = () => {
    onShowToast?.("Poster download started");
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareTitle = "StarX Live";
    const shareText = "StarX Live – Official Poster";
    const fullPosterUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${starxConfig.poster.image}`
        : starxConfig.poster.image;

    // Check if Web Share API is available
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      // 1. Attempt file sharing if supported
      try {
        const response = await fetch(starxConfig.poster.image);
        const blob = await response.blob();
        const file = new File([blob], starxConfig.poster.filename, {
          type: blob.type || "image/jpeg",
        });

        if (
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            files: [file],
          });
          setIsSharing(false);
          return;
        }
      } catch {
        // Fetch or file share failed; gracefully continue to URL share fallback
      }

      // 2. Fallback to sharing URL
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: fullPosterUrl,
        });
        setIsSharing(false);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setIsSharing(false);
          return;
        }
      }
    }

    // 3. Fallback to copying URL to clipboard if Web Share is unsupported or failed
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullPosterUrl);
        onShowToast?.("Poster link copied to clipboard");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullPosterUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        onShowToast?.("Poster link copied to clipboard");
      }
    } catch {
      onShowToast?.("Unable to share poster automatically");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Content Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="poster-modal-title"
          aria-describedby="poster-modal-subtitle"
          initial={{ scale: 0.94, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-sm sm:max-w-md max-h-[92vh] flex flex-col bg-surface-elevated border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black text-left z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-1 shrink-0">
            <div>
              <h2
                id="poster-modal-title"
                className="text-lg sm:text-xl font-bold text-white leading-tight"
              >
                StarX Live Poster
              </h2>
              <p
                id="poster-modal-subtitle"
                className="text-xs text-text-secondary mt-0.5"
              >
                Save or share our official poster.
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-text-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 ml-2"
              aria-label="Close poster dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Poster Preview Container (object-fit: contain, full visibility, no cropping) */}
          <div className="relative my-3.5 flex-1 min-h-0 flex items-center justify-center rounded-2xl bg-black/50 border border-white/[0.08] p-2 sm:p-2.5 overflow-hidden shadow-inner">
            {/* Poster Image */}
            <img
              src={starxConfig.poster.image}
              alt="StarX Live Official Poster"
              loading="lazy"
              className="max-h-[48vh] sm:max-h-[52vh] w-auto max-w-full object-contain rounded-xl shadow-lg select-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2 shrink-0 pt-1">
            {/* Primary Action: Download Poster */}
            <a
              href={starxConfig.poster.image}
              download={starxConfig.poster.filename}
              onClick={handleDownloadClick}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-all duration-200 active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download Poster</span>
            </a>

            {/* Secondary Actions: View Full Poster & Share Poster */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={starxConfig.poster.image}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-medium transition-all duration-200 active:scale-[0.98]"
              >
                <Maximize2 className="w-3.5 h-3.5 text-text-secondary" />
                <span>View Full Poster</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                <Share2 className="w-3.5 h-3.5 text-text-secondary" />
                <span>{isSharing ? "Sharing..." : "Share Poster"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
