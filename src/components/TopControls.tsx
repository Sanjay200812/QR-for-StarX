"use client";

import React from "react";
import { Share2, QrCode } from "lucide-react";
import { shareWebsite } from "@/lib/share";

interface TopControlsProps {
  onOpenQR: () => void;
  onShowToast: (msg: string) => void;
}

export const TopControls: React.FC<TopControlsProps> = ({
  onOpenQR,
  onShowToast,
}) => {
  const handleShare = async () => {
    await shareWebsite({
      onCopied: () => {
        onShowToast("Link copied to clipboard!");
      },
      onError: () => {
        onShowToast("Could not copy link");
      },
    });
  };

  return (
    <div className="w-full flex items-center justify-end space-x-2.5 px-4 pt-3 pb-1 select-none z-20">
      {/* Share Button */}
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share StarX Live link page"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-card/80 hover:bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-accent/40 shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* QR Code Modal Button */}
      <button
        type="button"
        onClick={onOpenQR}
        aria-label="Show QR code for this page"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-card/80 hover:bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-accent/40 shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <QrCode className="w-4 h-4" />
      </button>
    </div>
  );
};
