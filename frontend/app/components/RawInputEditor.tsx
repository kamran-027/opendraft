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
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden transition-colors">
      {/* Top Header Bar */}
      <div className="h-12 px-4 sm:px-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
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

      {/* Preset Pills & Target Role Controls */}
      <div className="px-4 py-2.5 bg-slate-50/30 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 space-y-2 shrink-0">
        {/* Preset Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> Presets:
          </span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-200 dark:hover:border-indigo-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Target Role Customization Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer" htmlFor="target-role-input">
              <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Target Job Title / Specialization</span>
            </label>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-normal">
              Personalizes ATS Keywords
            </span>
          </div>

          <div className="relative">
            <input
              id="target-role-input"
              type="text"
              placeholder="e.g. Senior Product Manager, Lead Growth Marketer, Staff Backend Engineer..."
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-2xs"
            />
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 leading-tight pt-0.5">
            <HelpCircle className="w-3 h-3 shrink-0" />
            <span>Enter the specific job title you are applying for to optimize action verbs & metrics.</span>
          </p>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="flex-1 min-h-0 p-3.5 sm:p-4 bg-slate-50/20 dark:bg-slate-950/20">
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
- Senior PM at Zomato (2022-Present): Revamped search & delivery tracking for 25M users, increased order conversion by 18%, led team of 8 devs.
- Product Analyst at Swiggy (2021-2022): Built analytics dashboards and reduced cart abandonment by 12%."
          className="w-full h-full p-3 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none leading-relaxed shadow-2xs overflow-y-auto"
        />
      </div>

      {/* Bottom Action Footer with Generous Padding */}
      <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
          {rawText.trim().length} chars • Google XYZ Formula
        </span>

        <button
          onClick={onGenerate}
          disabled={loading || !rawText.trim()}
          className="group inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 border border-slate-900 dark:border-white/10 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-tight shadow-xs hover:shadow-sm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-150"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400 dark:text-slate-500" />
              <span>Compiling...</span>
            </>
          ) : (
            <>
              <span>Compile into LaTeX</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all duration-150" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
