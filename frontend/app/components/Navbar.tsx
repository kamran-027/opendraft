"use client";

import React from "react";
import { FileText, Sparkles, ExternalLink, Download, Copy, Check } from "lucide-react";

interface NavbarProps {
  onDownloadPdf?: () => void;
  onCopyLatex?: () => void;
  onOpenOverleaf?: () => void;
  isCopied?: boolean;
  hasGeneratedResume?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownloadPdf,
  onCopyLatex,
  onOpenOverleaf,
  isCopied,
  hasGeneratedResume,
}) => {
  return (
    <header className="h-14 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all no-print shrink-0 flex items-center z-40">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                OpenDraft
              </h1>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-normal">
                • Zero LaTeX Knowledge Required
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5 sm:hidden">
              Ivy League LaTeX Resume Studio
            </p>
          </div>
        </div>

        {/* Right Action Controls & AI Chip */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {hasGeneratedResume && (
            <>
              <button
                onClick={onCopyLatex}
                className="hidden sm:inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                title="Copy raw LaTeX code"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied .tex</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy .tex</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenOverleaf}
                className="hidden md:inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                title="Open directly in Overleaf"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                <span>Overleaf</span>
              </button>

              <button
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </>
          )}

          <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>AI LaTeX Engine</span>
          </div>
        </div>
      </div>
    </header>
  );
};
