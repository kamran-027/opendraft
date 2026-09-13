"use client";

import React from "react";
import { ShieldCheck, Zap, Award, Target, CheckCircle2, TrendingUp } from "lucide-react";

interface AtsAnalysis {
  score: int;
  detected_target_role: string;
  action_verbs_count: int;
  quantified_metrics_count: int;
  ats_strengths: string[];
  top_matched_keywords: string[];
}

interface AtsScoreCardProps {
  analysis?: AtsAnalysis | null;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20">
            {analysis.score}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-900">ATS Readiness Score: {analysis.score}/100</h4>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                High Impact
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted Role: <strong className="text-slate-800">{analysis.detected_target_role}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{analysis.action_verbs_count} Active Verbs</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            <span>{analysis.quantified_metrics_count} Quantified Bullets</span>
          </div>
        </div>
      </div>

      {/* Strengths & Keywords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 text-xs">
        <div>
          <span className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Key Structural Strengths:
          </span>
          <ul className="space-y-1 text-slate-600">
            {analysis.ats_strengths.map((st, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-indigo-600" /> Top Matched Industry Keywords:
          </span>
          <div className="flex flex-wrap gap-1">
            {analysis.top_matched_keywords.map((kw, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200/60"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
