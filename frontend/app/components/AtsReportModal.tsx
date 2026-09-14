"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck, Zap, Award, Target, CheckCircle2, TrendingUp } from "lucide-react";

interface AtsAnalysis {
  score: number;
  detected_target_role: string;
  action_verbs_count: number;
  quantified_metrics_count: number;
  ats_strengths: string[];
  top_matched_keywords: string[];
}

interface AtsReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis?: AtsAnalysis | null;
}

export const AtsReportModal: React.FC<AtsReportModalProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !analysis) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 transition-all">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                ATS Compatibility & Keyword Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Autonomous diagnostics calibrated for Ivy League & FAANG recruiting ATS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close report"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Score Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20 shrink-0">
                {analysis.score}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    ATS Score: {analysis.score} / 100
                  </h4>
                  <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                    {analysis.score >= 90 ? "Top 5% Resume" : analysis.score >= 80 ? "High Impact" : "Solid"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Targeted Role: <strong className="text-slate-900 dark:text-slate-200">{analysis.detected_target_role}</strong>
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{analysis.action_verbs_count} Active Verbs</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span>{analysis.quantified_metrics_count} Quantified Bullets</span>
              </div>
            </div>
          </div>

          {/* Key Structural Strengths */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Key Structural Strengths</span>
            </h4>
            <div className="space-y-2">
              {analysis.ats_strengths.map((st, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Matched Keywords */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Top Matched Industry & Role Keywords</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.top_matched_keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium px-3 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
