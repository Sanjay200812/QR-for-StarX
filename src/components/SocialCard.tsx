"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconContainerClass?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  external?: boolean;
  badge?: string;
  className?: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  title,
  subtitle,
  icon,
  iconContainerClass = "bg-white/[0.04] text-white",
  href,
  onClick,
  ariaLabel,
  external = true,
  badge,
  className,
}) => {
  const commonClasses = cn(
    "group relative w-full h-[76px] sm:h-[80px] px-4 sm:px-5 flex items-center justify-between",
    "bg-[#151515]/90 hover:bg-[#1c1c1c]/95 active:bg-[#181818]/95 backdrop-blur-md",
    "rounded-2xl border border-white/[0.08] hover:border-accent/45",
    "shadow-lg shadow-black/50 hover:shadow-glow-red/25",
    "transition-all duration-200 ease-out select-none",
    "hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  );

  const content = (
    <>
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/[0.04] to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Left Platform Icon & Label Block */}
      <div className="flex items-center space-x-3.5 sm:space-x-4 min-w-0 pr-2 flex-1">
        {/* Platform Icon Box */}
        <div
          className={cn(
            "relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 border border-white/[0.08] shadow-sm",
            iconContainerClass
          )}
        >
          {icon}
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold text-[14px] min-[390px]:text-[15px] sm:text-base tracking-tight leading-snug group-hover:text-white transition-colors truncate">
              {title}
            </span>
            {badge && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 shrink-0">
                {badge}
              </span>
            )}
          </div>
          <span className="text-text-secondary text-[12.5px] min-[390px]:text-[13px] sm:text-sm font-normal tracking-tight truncate leading-tight mt-0.5">
            {subtitle}
          </span>
        </div>
      </div>

      {/* Right Chevron Icon */}
      <div className="shrink-0 ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-muted group-hover:text-accent group-hover:border-accent/30 transition-all duration-200">
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={commonClasses}
    >
      {content}
    </button>
  );
};
