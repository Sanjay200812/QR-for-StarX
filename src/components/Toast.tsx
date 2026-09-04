"use client";

import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 bg-surface-elevated/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-accent/40 shadow-xl shadow-black/80 pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
