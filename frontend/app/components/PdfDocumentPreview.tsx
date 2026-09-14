"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ContactInfo {
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  location?: string;
  graduation_date: string;
  gpa_or_honors?: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  location?: string;
  date_range: string;
  bullets: string[];
}

interface ProjectItem {
  name: string;
  technologies?: string;
  date_or_link?: string;
  bullets: string[];
}

interface SkillCategory {
  category_name: string;
  skills_list: string;
}

interface ResumeData {
  contact: ContactInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
}

interface PdfDocumentPreviewProps {
  data?: ResumeData | null;
  isPrintMode?: boolean;
}

// Clean LaTeX ligatures, special escaped characters, and raw math separators
const cleanText = (text?: string): string => {
  if (!text) return "";
  return text
    .replace(/\s*\$\|\$\s*/g, " | ")
    .replace(/\s*--\s*/g, " – ")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/\\\$/g, "$")
    .replace(/\\_/g, "_");
};

const cleanUrlText = (url: string, type: "linkedin" | "github" | "website"): string => {
  const stripped = url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  if (type === "linkedin") {
    const handle = stripped.replace(/^linkedin\.com\/in\//, "");
    return `linkedin.com/in/${handle}`;
  }
  if (type === "github") {
    const handle = stripped.replace(/^github\.com\//, "");
    return `github.com/${handle}`;
  }
  return stripped;
};

export const PdfDocumentPreview: React.FC<PdfDocumentPreviewProps> = ({ data, isPrintMode = false }) => {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 bg-slate-50/40 dark:bg-slate-900/40">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 shadow-inner">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
          Your LaTeX Resume Preview Will Appear Here
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Paste your career notes on the left or select a 1-click role preset to compile your 1-page Ivy League LaTeX resume.
        </p>
      </div>
    );
  }

  const { contact, education, experience, projects, skills } = data;

  // Contact items builder
  const contactNodes: React.ReactNode[] = [];
  if (contact.phone) {
    contactNodes.push(<span key="phone">{cleanText(contact.phone)}</span>);
  }
  if (contact.email) {
    contactNodes.push(
      <a key="email" href={`mailto:${contact.email}`} className="underline text-inherit hover:text-indigo-600">
        {cleanText(contact.email)}
      </a>
    );
  }
  if (contact.linkedin_url) {
    contactNodes.push(
      <a
        key="linkedin"
        href={contact.linkedin_url}
        target="_blank"
        rel="noreferrer"
        className="underline text-inherit hover:text-indigo-600"
      >
        {cleanUrlText(contact.linkedin_url, "linkedin")}
      </a>
    );
  }
  if (contact.github_url) {
    contactNodes.push(
      <a
        key="github"
        href={contact.github_url}
        target="_blank"
        rel="noreferrer"
        className="underline text-inherit hover:text-indigo-600"
      >
        {cleanUrlText(contact.github_url, "github")}
      </a>
    );
  }
  if (contact.location) {
    contactNodes.push(<span key="location">{cleanText(contact.location)}</span>);
  }

  // --- PRINT MODE FOR DIRECT EXPORT ---
  if (isPrintMode) {
    return (
      <div
        id="printable-resume-page"
        className="bg-white text-black w-full p-0 font-serif leading-tight selection:bg-indigo-100"
        style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', color: "#000000" }}
      >
        {/* Header */}
        <div className="text-center pb-2">
          <h1 className="text-[21pt] font-bold tracking-tight uppercase text-black mb-1">
            {cleanText(contact.full_name)}
          </h1>
          <div className="text-[10pt] text-black flex flex-wrap items-center justify-center gap-x-2">
            {contactNodes.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="select-none text-black">|</span>}
                {node}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mt-2.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-black">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={idx} className="text-[10pt]">
                  <div className="flex justify-between font-bold text-black">
                    <span>{cleanText(edu.institution)}</span>
                    <span>{cleanText(edu.location)}</span>
                  </div>
                  <div className="flex justify-between italic text-black text-[9.5pt]">
                    <span>
                      {cleanText(edu.degree)}
                      {edu.gpa_or_honors ? ` — ${cleanText(edu.gpa_or_honors)}` : ""}
                    </span>
                    <span>{cleanText(edu.graduation_date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mt-2.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-black">
              Experience
            </h2>
            <div className="space-y-2">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-[10pt]">
                  <div className="flex justify-between font-bold text-black">
                    <span>{cleanText(exp.role)}</span>
                    <span>{cleanText(exp.date_range)}</span>
                  </div>
                  <div className="flex justify-between italic text-black text-[9.5pt] mb-0.5">
                    <span>{cleanText(exp.company)}</span>
                    <span>{cleanText(exp.location)}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[9.5pt] text-black leading-[1.32]">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{cleanText(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-2.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-black">
              Projects & Initiatives
            </h2>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-[10pt]">
                  <div className="flex justify-between font-bold text-black">
                    <span>
                      {cleanText(proj.name)}
                      {proj.technologies && (
                        <span className="font-normal italic text-[9.5pt]">
                          {" "}| {cleanText(proj.technologies)}
                        </span>
                      )}
                    </span>
                    <span className="text-[9.5pt] font-normal">{cleanText(proj.date_or_link)}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[9.5pt] text-black leading-[1.32] mt-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{cleanText(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-2.5">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-black">
              Technical & Leadership Skills
            </h2>
            <div className="space-y-0.5 text-[9.5pt] text-black leading-[1.32]">
              {skills.map((s, idx) => (
                <div key={idx}>
                  <span className="font-bold">{cleanText(s.category_name)}: </span>
                  <span>{cleanText(s.skills_list)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- SCREEN PREVIEW MODE ---
  return (
    <div className="h-full overflow-y-auto bg-slate-200/80 dark:bg-slate-950/80 p-3 sm:p-5 flex justify-center items-start selection:bg-indigo-100 transition-colors">
      {/* The 1-Page Letter Sheet (Authentic Jake's Resume Spacing & Letter Proportion) */}
      <div
        id="printable-resume"
        className="bg-white text-slate-900 shadow-2xl rounded-xs w-full max-w-[720px] min-h-[960px] p-7 sm:p-9 font-serif leading-normal selection:bg-indigo-100 shrink-0 my-2 sm:my-4"
        style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
      >
        {/* Header */}
        <div className="text-center pb-2">
          <h1 className="text-2xl sm:text-[22pt] font-bold tracking-tight text-slate-950 uppercase mb-1">
            {cleanText(contact.full_name)}
          </h1>
          <div className="text-xs sm:text-[10.5pt] text-slate-800 flex flex-wrap items-center justify-center gap-x-2">
            {contactNodes.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="select-none text-slate-400">|</span>}
                {node}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mt-3">
            <h2 className="text-xs sm:text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs sm:text-[10.5pt]">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>{cleanText(edu.institution)}</span>
                    <span>{cleanText(edu.location)}</span>
                  </div>
                  <div className="flex justify-between italic text-slate-800 text-[10.5px] sm:text-[10pt]">
                    <span>
                      {cleanText(edu.degree)}
                      {edu.gpa_or_honors ? ` — ${cleanText(edu.gpa_or_honors)}` : ""}
                    </span>
                    <span>{cleanText(edu.graduation_date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mt-3">
            <h2 className="text-xs sm:text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Experience
            </h2>
            <div className="space-y-2">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-xs sm:text-[10.5pt]">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>{cleanText(exp.role)}</span>
                    <span>{cleanText(exp.date_range)}</span>
                  </div>
                  <div className="flex justify-between italic text-slate-800 text-[10.5px] sm:text-[10pt] mb-0.5">
                    <span>{cleanText(exp.company)}</span>
                    <span>{cleanText(exp.location)}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] sm:text-[10pt] text-slate-900 leading-[1.35]">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{cleanText(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-3">
            <h2 className="text-xs sm:text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Projects & Initiatives
            </h2>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-xs sm:text-[10.5pt]">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>
                      {cleanText(proj.name)}
                      {proj.technologies && (
                        <span className="font-normal italic text-[10.5px] sm:text-[10pt] text-slate-700">
                          {" "}| {cleanText(proj.technologies)}
                        </span>
                      )}
                    </span>
                    <span className="text-[10.5px] sm:text-[10pt] font-normal">{cleanText(proj.date_or_link)}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] sm:text-[10pt] text-slate-900 leading-[1.35] mt-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{cleanText(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-3">
            <h2 className="text-xs sm:text-[11pt] font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Technical & Leadership Skills
            </h2>
            <div className="space-y-0.5 text-[10.5px] sm:text-[10pt] text-slate-900 leading-[1.35]">
              {skills.map((s, idx) => (
                <div key={idx}>
                  <span className="font-bold text-slate-950">{cleanText(s.category_name)}: </span>
                  <span>{cleanText(s.skills_list)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
