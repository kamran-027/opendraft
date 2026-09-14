"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RawInputEditor } from "./components/RawInputEditor";
import { PdfDocumentPreview } from "./components/PdfDocumentPreview";
import { LatexSourceView } from "./components/LatexSourceView";
import { AtsReportModal } from "./components/AtsReportModal";
import { PRESET_BRAINDUMPS } from "./data/presets";
import { FileText, Code2, Sparkles, Check, Download, ExternalLink, Zap, AlertCircle, Github, ShieldCheck } from "lucide-react";
import { API_URL } from "./config";

export default function Home() {
  const [rawText, setRawText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "latex">("preview");
  const [resumeResult, setResumeResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showAtsModal, setShowAtsModal] = useState(false);

  // Sync theme with localStorage, documentElement, and body
  useEffect(() => {
    const savedTheme = localStorage.getItem("opendraft-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("opendraft-theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
        document.body.classList.remove("dark");
      }
      return next;
    });
  };

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
    <>
      {/* Interactive Web UI (hidden on print) */}
      <div className={`h-screen flex flex-col justify-between text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40 relative overflow-hidden ${theme === "dark" ? "bg-slate-950 dark" : "bg-slate-100/60"} transition-colors no-print`}>
        {/* Background Ambience Pattern */}
        <div className="fixed inset-0 bg-dot-pattern pointer-events-none -z-10" />

        {/* Header (56px) */}
        <Navbar
          hasGeneratedResume={!!resumeResult}
          onDownloadPdf={handleDownloadPdf}
          onCopyLatex={handleCopyLatex}
          onOpenOverleaf={handleOpenOverleaf}
          isCopied={isCopied}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Split Studio Container */}
        <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-3 flex-1 min-h-0 flex flex-col overflow-hidden">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-3 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-xl flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-300 animate-in fade-in duration-150 shrink-0">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 items-stretch overflow-hidden">
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
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden transition-colors">
                {/* Top Header Bar (48px - matching left card) */}
                <div className="h-12 px-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                  {/* View Tabs */}
                  <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Document Preview</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("latex")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === "latex"
                          ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>LaTeX Source (.tex)</span>
                    </button>
                  </div>

                  {/* ATS Score & Right Actions */}
                  {resumeResult && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAtsModal(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
                        title="Open comprehensive ATS compatibility report"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>ATS: {resumeResult.ats_analysis.score}/100</span>
                        <span className="hidden sm:inline text-[10px] text-emerald-700 dark:text-emerald-400 underline font-semibold ml-0.5">
                          Report
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  {activeTab === "preview" ? (
                    <PdfDocumentPreview
                      data={resumeResult?.structured_data}
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
        </main>

        {/* Clean Formatted Footer without Love Emoji, Linking to GitHub */}
        <footer className="h-9 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0 transition-colors">
          <div className="flex items-center gap-1.5">
            <span>Built by</span>
            <a
              href="https://github.com/kamran-027"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 hover:underline"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Kamran Khan</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            <span>Ivy League / Jake's Resume Standard</span>
            <span>•</span>
            <span>Zero LaTeX Syntax Required</span>
            <span>•</span>
            <span>100% Free & Open-Source</span>
          </div>
        </footer>
      </div>

      {/* Dedicated Print-Only Container (Rendered Only During Window Print/PDF Export) */}
      <div className="print-only">
        {resumeResult?.structured_data && (
          <PdfDocumentPreview
            data={resumeResult.structured_data}
            isPrintMode={true}
          />
        )}
      </div>

      {/* Interactive ATS Diagnostics Modal */}
      <AtsReportModal
        isOpen={showAtsModal}
        onClose={() => setShowAtsModal(false)}
        analysis={resumeResult?.ats_analysis}
      />
    </>
  );
}
