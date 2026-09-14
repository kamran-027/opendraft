import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const OpenDraftLogo: React.FC<LogoProps> = ({ className = "w-8 h-8", size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="od-brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="od-brand-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      {/* Background Rounded Tile */}
      <rect width="48" height="48" rx="12" fill="url(#od-brand-gradient)" />

      {/* Architectural Document Blueprint */}
      <path
        d="M13 11C13 9.89543 13.8954 9 15 9H27L35 17V37C35 38.1046 34.1046 39 33 39H15C13.8954 39 13 38.1046 13 37V11Z"
        fill="white"
        fillOpacity="0.18"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Folded Corner */}
      <path
        d="M26.5 9.5V16.5C26.5 17.0523 26.9477 17.5 27.5 17.5H34.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Content Drafting Grid Lines */}
      <path d="M18 24H30" stroke="url(#od-brand-accent)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 29H26" stroke="url(#od-brand-accent)" strokeWidth="2.2" strokeLinecap="round" />

      {/* Vertex Sparkle */}
      <circle cx="30" cy="29" r="1.5" fill="white" />
    </svg>
  );
};
