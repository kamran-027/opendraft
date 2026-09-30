"use client";

import React from "react";
import { Sparkles, ExternalLink, Download, Copy, Check, Moon, Sun } from "lucide-react";
import { OpenDraftLogo } from "./OpenDraftLogo";

interface NavbarProps {
  onDownloadPdf?: () => void;
  onCopyLatex?: () => void;
  onOpenOverleaf?: () => void;
  isCopied?: boolean;
  hasGeneratedResume?: boolean;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownloadPdf,
  onCopyLatex,
  onOpenOverleaf,
  isCopied,
  hasGeneratedResume,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="h-14 sm:h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors no-print shrink-0 flex items-center z-40 px-3 sm:px-6">
      <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-2">
        {/* Brand with custom OpenDraft Logo & Tagline */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <OpenDraftLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 shadow-xs rounded-lg" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                OpenDraft
              </h1>
              <span className="hidden md:inline-block text-xs text-slate-500 dark:text-slate-400 font-medium">
                • Zero LaTeX Knowledge Required
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 md:hidden">
              Ivy League LaTeX Studio
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AI LaTeX Engine Badge: hidden on narrow screens when resume is generated to prevent crowding */}
          {(!hasGeneratedResume || undefined) && (
            <div className={`${hasGeneratedResume ? "hidden md:inline-flex" : "hidden xs:inline-flex"} items-center gap-1.5 bg-slate-100/90 dark:bg-indigo-950/50 text-slate-800 dark:text-indigo-300 border border-slate-200/90 dark:border-indigo-800/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-xs transition-colors shrink-0`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="font-medium tracking-tight">AI LaTeX Engine</span>
            </div>
          )}

          {hasGeneratedResume && (
            <>
              {/* Copy .tex button: compact icon on mobile, full label on sm+ */}
              <button
                onClick={onCopyLatex}
                className="inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 active:scale-95"
                title="Copy raw LaTeX code"
                aria-label="Copy LaTeX code"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="hidden sm:inline">Copied .tex</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span className="hidden sm:inline">Copy .tex</span>
                  </>
                )}
              </button>

              {/* Overleaf button: visible on md+ or tablet */}
              <button
                onClick={onOpenOverleaf}
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#136338] hover:bg-[#0e4d2b] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                title="Open directly in Overleaf"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
                <span className="hidden md:inline">Overleaf</span>
              </button>

              {/* Download PDF button: prominent primary action */}
              <button
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                title="Download 1-page PDF"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span><span className="hidden xs:inline">Download </span>PDF</span>
              </button>
            </>
          )}

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
