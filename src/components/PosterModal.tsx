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
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  // Close on Escape key (closes full view first if open, or modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullViewOpen) {
          setIsFullViewOpen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isFullViewOpen, onClose]);

  // Reset full view state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsFullViewOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const posterUrl = starxConfig.poster.url || starxConfig.poster.image;
  const posterDownloadName =
    starxConfig.poster.downloadName || starxConfig.poster.filename;

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    onShowToast?.("Poster download started");
    try {
      const response = await fetch(posterUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = blobUrl;
        tempLink.download = posterDownloadName;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobUrl);
        e.preventDefault();
      }
    } catch {
      // If fetch fails, allow standard <a> download to proceed
    }
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareTitle = "StarX Live";
    const shareText = "StarX Live – Official Poster";
    const fullPosterUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${posterUrl}`
        : posterUrl;

    // Check if Web Share API is available
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      // 1. Attempt file sharing if supported
      try {
        const response = await fetch(posterUrl);
        const blob = await response.blob();
        const file = new File([blob], posterDownloadName, {
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
    <>
      {/* 1. Main Poster Modal / Bottom Sheet */}
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

            {/* Poster Preview Container (clickable to open full view, object-fit: contain) */}
            <div
              onClick={() => setIsFullViewOpen(true)}
              className="group relative my-3.5 flex-1 min-h-0 flex items-center justify-center rounded-2xl bg-black/50 border border-white/[0.08] hover:border-accent/40 p-2 sm:p-2.5 overflow-hidden shadow-inner cursor-pointer transition-colors"
              title="Click to view full poster"
            >
              {/* Poster Image */}
              <img
                src={posterUrl}
                alt="StarX Live Official Poster"
                loading="lazy"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                className="max-h-[48vh] sm:max-h-[52vh] w-full h-auto object-contain rounded-xl shadow-lg select-none transition-transform duration-200 group-hover:scale-[1.01]"
              />

              {/* Subtle hover overlay badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-white/90 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Full View</span>
              </div>
            </div>

            {/* Actions: View Full Poster, Download Poster, Close, Share Poster */}
            <div className="flex flex-col space-y-2 shrink-0 pt-1">
              {/* Primary Action: Download Poster */}
              <a
                href={posterUrl}
                download={posterDownloadName}
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-all duration-200 active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download Poster</span>
              </a>

              {/* Secondary Actions: View Full Poster (in-app modal, no redirect) & Share Poster */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullViewOpen(true)}
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-medium transition-all duration-200 active:scale-[0.98]"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-text-secondary" />
                  <span>View Full Poster</span>
                </button>

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

              {/* Explicit Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 text-text-muted hover:text-white text-xs font-medium transition-all duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* 2. Full-Screen Poster Overlay (No redirect to another page; with cross mark X to close) */}
      <AnimatePresence>
        {isFullViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => setIsFullViewOpen(false)}
          >
            {/* Top Right Cross Mark (X) to Close Full Poster */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[70]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullViewOpen(false);
                }}
                className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close full poster view"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Uncropped, Full Resolution Poster Preview */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-auto p-1"
              onClick={() => setIsFullViewOpen(false)}
            >
              <motion.img
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ type: "spring", damping: 26, stiffness: 300 }}
                src={posterUrl}
                alt="StarX Live Official Poster - Full View"
                className="max-w-full max-h-[85vh] sm:max-h-[88vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Bottom Controls Bar */}
            <div
              className="absolute bottom-4 z-[70] flex items-center space-x-3 bg-black/70 backdrop-blur-lg px-4 py-2 rounded-full border border-white/15 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={posterUrl}
                download={posterDownloadName}
                onClick={handleDownload}
                className="flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-3.5 py-1.5 rounded-full transition-colors active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Poster</span>
              </a>

              <button
                type="button"
                onClick={() => setIsFullViewOpen(false)}
                className="flex items-center space-x-1 text-xs text-text-secondary hover:text-white px-2 py-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
