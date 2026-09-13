"use client";

import React from "react";
import { Sparkles, ArrowRight, Loader2, Wand2, Briefcase, Trash2 } from "lucide-react";

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
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden">
      {/* Top Header Bar */}
      <div className="h-12 px-4 sm:px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            Raw Career Notes & Braindump
          </h3>
        </div>

        {rawText.trim() && (
          <button
            onClick={() => {
              setRawText("");
              setTargetRole("");
            }}
            className="text-slate-400 hover:text-rose-600 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Preset Pills & Target Role Strip */}
      <div className="px-4 py-2.5 bg-slate-50/30 border-b border-slate-100 space-y-2 shrink-0">
        {/* Preset Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> Presets:
          </span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-700 text-[11px] font-medium transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Target Role Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Target Role (e.g. Senior Product Manager, Lead Growth Marketer, Data Analyst)..."
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Textarea Area */}
      <div className="flex-1 min-h-0 p-3.5 sm:p-4 bg-slate-50/20">
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
          className="w-full h-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 font-mono focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none leading-relaxed shadow-2xs overflow-y-auto"
        />
      </div>

      {/* Bottom Action Footer with Generous Padding */}
      <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
        <span className="text-[11px] text-slate-400 font-mono">
          {rawText.trim().length} chars • Google XYZ Formula
        </span>

        <button
          onClick={onGenerate}
          disabled={loading || !rawText.trim()}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-slate-900/10 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Compiling...</span>
            </>
          ) : (
            <>
              <span>Compile into LaTeX</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
