"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RawInputEditor } from "./components/RawInputEditor";
import { PdfDocumentPreview } from "./components/PdfDocumentPreview";
import { LatexSourceView } from "./components/LatexSourceView";
import { AtsScoreCard } from "./components/AtsScoreCard";
import { PRESET_BRAINDUMPS } from "./data/presets";
import { FileText, Code2, Sparkles, Check, Download, ExternalLink, Zap, AlertCircle, Heart } from "lucide-react";
import { API_URL } from "./config";

export default function Home() {
  const [rawText, setRawText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "latex">("preview");
  const [resumeResult, setResumeResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load default preset on initial mount
  useEffect(() => {
    if (PRESET_BRAINDUMPS && PRESET_BRAINDUMPS.length > 0) {
      setRawText(PRESET_BRAINDUMPS[0].raw_text);
      setTargetRole(PRESET_BRAINDUMPS[0].target_role);
    }
  }, []);

  const handleSelectPreset = (preset: any) => {
    setRawText(preset.raw_text);
    setTargetRole(preset.target_role);
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    if (!rawText.trim() || loading) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raw_text: rawText,
          target_role: targetRole.trim() || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to compile resume");
      }

      const data = await res.json();
      setResumeResult(data);
      setActiveTab("preview");
    } catch (err: any) {
      setErrorMessage(err.message || "Could not reach backend API.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLatex = () => {
    if (!resumeResult?.latex_code) return;
    navigator.clipboard.writeText(resumeResult.latex_code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleOpenOverleaf = () => {
    if (!resumeResult?.latex_code) return;
    const overleafUrl = `https://www.overleaf.com/docs?snip_uri=data:application/x-tex;base64,${btoa(
      unescape(encodeURIComponent(resumeResult.latex_code))
    )}`;
    window.open(overleafUrl, "_blank");
  };

  return (
    <div className="h-screen flex flex-col justify-between text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden bg-slate-100/60">
      {/* Background Ambience Pattern */}
      <div className="fixed inset-0 bg-dot-pattern pointer-events-none -z-10" />

      {/* Header (56px) */}
      <Navbar
        hasGeneratedResume={!!resumeResult}
        onDownloadPdf={handleDownloadPdf}
        onCopyLatex={handleCopyLatex}
        onOpenOverleaf={handleOpenOverleaf}
        isCopied={isCopied}
      />

      {/* Main Split Studio Container */}
      <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-3 flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800 animate-in fade-in duration-150 no-print shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 no-print items-stretch overflow-hidden">
          {/* Left Column: Raw Input Editor */}
          <div className="lg:col-span-6 h-full min-h-0 flex flex-col overflow-hidden">
            <RawInputEditor
              rawText={rawText}
              setRawText={setRawText}
              targetRole={targetRole}
              setTargetRole={setTargetRole}
              onGenerate={handleGenerate}
              loading={loading}
              presets={PRESET_BRAINDUMPS}
              onSelectPreset={handleSelectPreset}
            />
          </div>

          {/* Right Column: Unified Preview / LaTeX Card */}
          <div className="lg:col-span-6 h-full min-h-0 flex flex-col overflow-hidden">
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden">
              {/* Top Header Bar (48px - matching left card) */}
              <div className="h-12 px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                {/* View Tabs */}
                <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Document Preview</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("latex")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "latex"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>LaTeX Source (.tex)</span>
                  </button>
                </div>

                {/* ATS Score & Right Actions */}
                {resumeResult && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      ATS: {resumeResult.ats_analysis.score}/100
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content Area */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {activeTab === "preview" ? (
                  <PdfDocumentPreview
                    data={resumeResult?.structured_data}
                    onDownloadPdf={handleDownloadPdf}
                    onOpenOverleaf={handleOpenOverleaf}
                  />
                ) : (
                  <LatexSourceView
                    latexCode={resumeResult?.latex_code || "% Compile a resume on the left to see generated LaTeX markup."}
                    onCopy={handleCopyLatex}
                    isCopied={isCopied}
                    onOpenOverleaf={handleOpenOverleaf}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ATS Score Card */}
        {resumeResult?.ats_analysis && (
          <div className="no-print pt-2 shrink-0">
            <AtsScoreCard analysis={resumeResult.ats_analysis} />
          </div>
        )}
      </main>

      {/* Clean Formatted Footer */}
      <footer className="h-9 border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500 no-print shrink-0">
        <div className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>by</span>
          <a
            href="https://kamrankhan.xyz"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors underline"
          >
            Kamran Khan
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 font-medium">
          <span>Ivy League / Jake's Resume Standard</span>
          <span>•</span>
          <span>Zero LaTeX Syntax Required</span>
          <span>•</span>
          <span>100% Free & Open-Source</span>
        </div>
      </footer>
    </div>
  );
}
