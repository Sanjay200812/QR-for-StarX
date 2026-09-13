"use client";

import React, { useEffect } from "react";
import { X, Phone, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { starxConfig } from "@/config/starx";

export type ContactModalType = "whatsapp" | "call" | null;

interface ContactSelectorModalProps {
  type: ContactModalType;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSelectorModal: React.FC<ContactSelectorModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  const isWhatsApp = type === "whatsapp";
  const title = isWhatsApp ? "WhatsApp StarX Live" : "Call StarX Live";
  const subtitle = isWhatsApp
    ? "Select a number to start a WhatsApp chat:"
    : "Select a number to call immediately:";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal / Bottom Sheet Card */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ y: "100%", opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.2 }}
          className="relative w-full max-w-md bg-surface-elevated border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl shadow-black text-left z-10"
        >
          {/* Mobile Drag Indicator Bar */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isWhatsApp
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-accent/10 text-accent border-accent/20"
                }`}
              >
                {isWhatsApp ? (
                  <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Phone className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 id="contact-modal-title" className="text-lg font-bold text-white leading-tight">
                  {title}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-text-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Numbers List */}
          <div className="space-y-3 mt-4">
            {(isWhatsApp ? starxConfig.whatsapp : starxConfig.phones).map((item, idx) => {
              const href = isWhatsApp
                ? getWhatsAppUrl(item.value)
                : `tel:${item.value}`;

              return (
                <a
                  key={item.value}
                  href={href}
                  target={isWhatsApp ? "_blank" : undefined}
                  rel={isWhatsApp ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    // Short timeout before closing so link trigger is unhindered
                    setTimeout(onClose, 250);
                  }}
                  className="group flex items-center justify-between w-full p-4 rounded-2xl bg-surface-card hover:bg-surface border border-white/[0.08] hover:border-accent/40 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold border ${
                        isWhatsApp
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          : "bg-accent/15 text-accent border-accent/25"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                        +91 {item.display}
                      </p>
                      {!isWhatsApp && (
                        <p className="text-[11px] text-text-muted">
                          Direct phone line
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-medium text-text-secondary group-hover:text-white bg-white/[0.05] group-hover:bg-accent/20 px-3 py-1.5 rounded-full transition-colors border border-white/5 group-hover:border-accent/30">
                    <span>{isWhatsApp ? "Chat" : "Call"}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Notice */}
          <p className="text-[11px] text-center text-text-muted mt-5">
            {isWhatsApp
              ? "Opens WhatsApp app on mobile or WhatsApp Web on desktop."
              : "Opens your device's phone dialer directly."}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
