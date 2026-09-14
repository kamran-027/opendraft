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
    <header className="h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors no-print shrink-0 flex items-center z-40">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand with custom OpenDraft Logo & Tagline */}
        <div className="flex items-center gap-3">
          <OpenDraftLogo className="w-9 h-9 shrink-0 shadow-xs rounded-lg" />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                OpenDraft
              </h1>
              <span className="hidden md:inline-block text-xs text-slate-500 dark:text-slate-400 font-medium">
                • Zero LaTeX Knowledge Required
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 md:hidden">
              Ivy League LaTeX Resume Studio
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* AI LaTex Engine Badge - Clean, premium pill in light mode & sleek glow in dark mode */}
          <div className="inline-flex items-center gap-1.5 bg-slate-100/90 dark:bg-indigo-950/50 text-slate-800 dark:text-indigo-300 border border-slate-200/90 dark:border-indigo-800/60 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-medium tracking-tight">AI LaTex Engine</span>
          </div>

          {hasGeneratedResume && (
            <>
              <button
                onClick={onCopyLatex}
                className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                title="Copy raw LaTeX code"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied .tex</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Copy .tex</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenOverleaf}
                className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                title="Open directly in Overleaf"
              >
                <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Overleaf</span>
              </button>

              <button
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </>
          )}

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
