import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenDraft — Autonomous AI LaTeX Resume & CV Engine",
  description: "Turn raw, messy thoughts into Ivy-League standard ATS LaTeX Resumes in seconds. Zero LaTeX knowledge required. Free forever by Cadence Labs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
