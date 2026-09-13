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
  onDownloadPdf?: () => void;
  onOpenOverleaf?: () => void;
}

export const PdfDocumentPreview: React.FC<PdfDocumentPreviewProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50/40">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-700 mb-1">
          Your LaTeX Resume Preview Will Appear Here
        </h4>
        <p className="text-xs text-slate-500 max-w-sm">
          Paste your career notes on the left or select a 1-click role preset to compile your 1-page Ivy League LaTeX resume.
        </p>
      </div>
    );
  }

  const { contact, education, experience, projects, skills } = data;

  return (
    <div className="h-full overflow-y-auto bg-slate-200/80 p-3 sm:p-5 flex justify-center selection:bg-indigo-100">
      {/* The 1-Page Letter Sheet */}
      <div
        id="printable-resume"
        className="bg-white text-slate-900 shadow-xl rounded-sm w-full max-w-[720px] min-h-[960px] p-8 sm:p-10 font-serif leading-normal selection:bg-indigo-100"
        style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
      >
        {/* Header */}
        <div className="text-center pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase mb-1">
            {contact.full_name}
          </h1>
          <div className="text-[11px] text-slate-800 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
            {contact.phone && <span>{contact.phone}</span>}
            {contact.phone && contact.email && <span>$|$</span>}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
            )}
            {contact.linkedin_url && <span>$|$</span>}
            {contact.linkedin_url && (
              <a href={contact.linkedin_url} target="_blank" rel="noreferrer" className="underline">
                linkedin
              </a>
            )}
            {contact.github_url && <span>$|$</span>}
            {contact.github_url && (
              <a href={contact.github_url} target="_blank" rel="noreferrer" className="underline">
                github
              </a>
            )}
            {contact.location && <span>$|$</span>}
            {contact.location && <span>{contact.location}</span>}
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mt-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>{edu.institution}</span>
                    <span>{edu.location || ""}</span>
                  </div>
                  <div className="flex justify-between italic text-slate-800 text-[11px]">
                    <span>
                      {edu.degree} {edu.gpa_or_honors ? `— ${edu.gpa_or_honors}` : ""}
                    </span>
                    <span>{edu.graduation_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mt-3.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>{exp.role}</span>
                    <span>{exp.date_range}</span>
                  </div>
                  <div className="flex justify-between italic text-slate-800 text-[11px] mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.location || ""}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-slate-900 leading-snug">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-3.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Projects & Initiatives
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-950">
                    <span>
                      {proj.name}{" "}
                      {proj.technologies && (
                        <span className="font-normal italic text-[11px] text-slate-700">
                          $|$ {proj.technologies}
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] font-normal">{proj.date_or_link || ""}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-slate-900 leading-snug mt-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-3.5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-slate-950">
              Technical & Leadership Skills
            </h2>
            <div className="space-y-0.5 text-[11px] text-slate-900 leading-snug">
              {skills.map((s, idx) => (
                <div key={idx}>
                  <span className="font-bold text-slate-950">{s.category_name}: </span>
                  <span>{s.skills_list}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
