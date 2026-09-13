"use client";

import React from "react";
import { Copy, Check, Code2, ExternalLink } from "lucide-react";

interface LatexSourceViewProps {
  latexCode: string;
  onCopy?: () => void;
  isCopied?: boolean;
  onOpenOverleaf?: () => void;
}

export const LatexSourceView: React.FC<LatexSourceViewProps> = ({
  latexCode,
  onCopy,
  isCopied,
  onOpenOverleaf,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      {/* Code Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 font-mono text-xs text-slate-300 leading-relaxed selection:bg-indigo-900">
        <pre className="whitespace-pre-wrap">{latexCode}</pre>
      </div>

      {/* Footer Status */}
      <div className="h-10 px-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono shrink-0 bg-slate-950">
        <span>UTF-8 • pdflatex compatible</span>
        <span>{latexCode.split("\n").length} lines</span>
      </div>
    </div>
  );
};
