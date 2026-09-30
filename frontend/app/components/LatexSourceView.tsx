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
      <div className="flex-1 overflow-y-auto touch-scroll p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed selection:bg-indigo-900">
        <pre className="whitespace-pre-wrap break-words">{latexCode}</pre>
      </div>

      {/* Footer Status & Actions */}
      <div className="h-10 px-3 sm:px-4 border-t border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono shrink-0 bg-slate-950">
        <div className="flex items-center gap-2">
          <span>UTF-8</span>
          <span>•</span>
          <span>{latexCode.split("\n").length} lines</span>
        </div>

        {onCopy && (
          <div className="flex items-center gap-1.5">
            {onOpenOverleaf && (
              <button
                onClick={onOpenOverleaf}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded transition-colors"
                title="Open in Overleaf"
              >
                <ExternalLink className="w-3 h-3 text-emerald-400" />
                <span className="hidden xs:inline">Overleaf</span>
              </button>
            )}
            <button
              onClick={onCopy}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
