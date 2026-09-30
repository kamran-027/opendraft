"use client";

import React from "react";
import { Sparkles, ArrowRight, Loader2, Wand2, Briefcase, Trash2, Target, HelpCircle } from "lucide-react";

interface Preset {
  id: string;
  title: string;
  target_role: string;
  category: string;
  raw_text: string;
}

interface RawInputEditorProps {
  rawText: string;
  setRawText: (val: string) => void;
  targetRole: string;
  setTargetRole: (val: string) => void;
  onGenerate: () => void;
  loading: boolean;
  presets: Preset[];
  onSelectPreset: (preset: Preset) => void;
}

export const RawInputEditor: React.FC<RawInputEditorProps> = ({
  rawText,
  setRawText,
  targetRole,
  setTargetRole,
  onGenerate,
  loading,
  presets,
  onSelectPreset,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden transition-colors">
      {/* Desktop-only Header Bar */}
      <div className="hidden lg:flex h-12 px-5 border-b border-slate-100 dark:border-slate-800 items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Raw Career Notes & Braindump
          </h3>
        </div>

        {rawText.trim() && (
          <button
            onClick={() => {
              setRawText("");
              setTargetRole("");
            }}
            className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Streamlined Target Role & Presets Toolbar */}
      <div className="p-3 sm:px-4 sm:py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 space-y-2 shrink-0">
        {/* Compact Target Role Input with Icon */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <input
              id="target-role-input"
              type="text"
              placeholder="Target job title (e.g. Senior Product Manager)"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={loading}
              className="w-full pl-9 pr-3 py-1.5 sm:py-1.5 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-2xs"
            />
          </div>

          {rawText.trim() && (
            <button
              onClick={() => {
                setRawText("");
                setTargetRole("");
              }}
              className="lg:hidden text-slate-400 hover:text-rose-500 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 shrink-0 cursor-pointer"
              title="Clear editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Clear</span>
            </button>
          )}
        </div>

        {/* Preset Role Pills (Horizontal Touch Swipe) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-scroll pb-0.5">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
            <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> Presets:
          </span>
          {presets.map((p) => {
            const isSelected = targetRole === p.target_role;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs border ${
                  isSelected
                    ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 font-semibold"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Textarea Area - Spacious & Full-Height */}
      <div className="flex-1 min-h-[220px] sm:min-h-0 p-3 sm:p-4 bg-slate-50/20 dark:bg-slate-950/20 flex flex-col">
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          disabled={loading}
          placeholder="Paste your unformatted resume notes, bullet points, or career chronology here...

Example:
Rahul Verma (rahul@example.com | +91-98765-XXXXX | Bengaluru)

Education:
- B.Tech in CS from VIT Vellore (2018-2022)

Experience:
- Senior PM at Swiggy (2022-Present): Revamped 1-click checkout flow for 40M+ MAUs, reduced payment drop-off by 14%, led team of 12 devs.
- Product Analyst at Meesho (2021-2022): Built self-serve ads portal generating ₹18M revenue."
          className="w-full flex-1 p-3 bg-white dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-xs sm:text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none leading-relaxed shadow-2xs overflow-y-auto touch-scroll"
        />
      </div>

      {/* Bottom Action Footer with Gradient CTA */}
      <div className="p-3 sm:px-4 sm:py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
          <span className="font-semibold text-slate-600 dark:text-slate-300">{rawText.trim().length}</span> chars
          <span className="hidden xs:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="hidden xs:inline">Google XYZ Formula</span>
        </div>

        <button
          onClick={onGenerate}
          disabled={loading || !rawText.trim()}
          className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-500/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-tight active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer transition-all duration-150 shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white/80" />
              <span>Compiling LaTeX...</span>
            </>
          ) : (
            <>
              <span>Compile into LaTeX</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
