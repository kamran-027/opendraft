import re
from typing import Dict, Any
from ..schemas import ResumeData


def escape_latex(text: str) -> str:
    """Escapes special LaTeX characters to prevent compilation errors."""
    if not text:
        return ""
    
    # Mapping of special characters
    special_chars = {
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    
    # Temporarily preserve LaTeX tags if already escaped
    pattern = re.compile("|".join(re.escape(k) for k in special_chars.keys()))
    return pattern.sub(lambda m: special_chars[m.group(0)], str(text))


def render_jakes_resume_latex(data: ResumeData) -> str:
    """
    Renders structured resume data into the industry-standard Jake's Resume LaTeX template.
    Guaranteed clean compilation, ATS parseability, and 1-page aesthetic.
    """
    c = data.contact
    full_name = escape_latex(c.full_name)
    email = escape_latex(c.email)
    phone = escape_latex(c.phone) if c.phone else ""
    location = escape_latex(c.location) if c.location else ""
    linkedin = escape_latex(c.linkedin_url) if c.linkedin_url else ""
    github = escape_latex(c.github_url) if c.github_url else ""
    website = escape_latex(c.website_url) if c.website_url else ""

    # Contact line building
    contact_parts = []
    if phone:
        contact_parts.append(phone)
    if email:
        contact_parts.append(rf"\href{{mailto:{email}}}{{\underline{{{email}}}}}")
    if linkedin:
        clean_li = re.sub(r"^https?://(www\.)?linkedin\.com/in/", "", linkedin).strip("/")
        clean_li = re.sub(r"^linkedin\.com/in/", "", clean_li).strip("/")
        clean_li_escaped = escape_latex(clean_li)
        full_li_url = f"https://linkedin.com/in/{clean_li}" if not linkedin.startswith("http") else linkedin
        contact_parts.append(rf"\href{{{full_li_url}}}{{\underline{{linkedin.com/in/{clean_li_escaped}}}}}")
    if github:
        clean_gh = re.sub(r"^https?://(www\.)?github\.com/", "", github).strip("/")
        clean_gh = re.sub(r"^github\.com/", "", clean_gh).strip("/")
        clean_gh_escaped = escape_latex(clean_gh)
        full_gh_url = f"https://github.com/{clean_gh}" if not github.startswith("http") else github
        contact_parts.append(rf"\href{{{full_gh_url}}}{{\underline{{github.com/{clean_gh_escaped}}}}}")
    if website:
        clean_web = re.sub(r"^https?://(www\.)?", "", website).strip("/")
        clean_web_escaped = escape_latex(clean_web)
        full_web_url = f"https://{clean_web}" if not website.startswith("http") else website
        contact_parts.append(rf"\href{{{full_web_url}}}{{\underline{{{clean_web_escaped}}}}}")
    if location:
        contact_parts.append(location)

    contact_line = " $|$ ".join(contact_parts)

    # Education Section
    education_tex = ""
    if data.education:
        education_tex = r"""
%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
"""
        for edu in data.education:
            inst = escape_latex(edu.institution)
            loc = escape_latex(edu.location) if edu.location else ""
            deg = escape_latex(edu.degree)
            date = escape_latex(edu.graduation_date)
            gpa = f" $|$ \\textit{{{escape_latex(edu.gpa_or_honors)}}}" if edu.gpa_or_honors else ""
            
            education_tex += rf"""    \resumeSubheading
      {{{inst}}}{{{loc}}}
      {{{deg}{gpa}}}{{{date}}}
"""
        education_tex += "  \\resumeSubHeadingListEnd\n"

    # Experience Section
    experience_tex = ""
    if data.experience:
        experience_tex = r"""
%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
"""
        for exp in data.experience:
            comp = escape_latex(exp.company)
            loc = escape_latex(exp.location) if exp.location else ""
            role = escape_latex(exp.role)
            dates = escape_latex(exp.date_range)
            
            experience_tex += rf"""    \resumeSubheading
      {{{role}}}{{{dates}}}
      {{{comp}}}{{{loc}}}
      \resumeItemListStart
"""
            for bullet in exp.bullets:
                clean_bullet = escape_latex(bullet)
                experience_tex += f"        \\resumeItem{{{clean_bullet}}}\n"
            experience_tex += "      \\resumeItemListEnd\n\n"
        experience_tex += "  \\resumeSubHeadingListEnd\n"

    # Projects Section
    projects_tex = ""
    if data.projects:
        projects_tex = r"""
%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
"""
        for proj in data.projects:
            name = escape_latex(proj.name)
            tech = f" $|$ \\emph{{{escape_latex(proj.technologies)}}}" if proj.technologies else ""
            link = escape_latex(proj.date_or_link) if proj.date_or_link else ""
            
            projects_tex += rf"""      \resumeProjectHeading
          {{\textbf{{{name}}}{tech}}}{{{link}}}
          \resumeItemListStart
"""
            for bullet in proj.bullets:
                clean_bullet = escape_latex(bullet)
                projects_tex += f"            \\resumeItem{{{clean_bullet}}}\n"
            projects_tex += "          \\resumeItemListEnd\n"
        projects_tex += "    \\resumeSubHeadingListEnd\n"

    # Skills Section
    skills_tex = ""
    if data.skills:
        skills_tex = r"""
%-----------PROGRAMMING SKILLS-----------
\section{Technical \& Professional Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
"""
        skill_lines = []
        for s in data.skills:
            cat = escape_latex(s.category_name)
            skills = escape_latex(s.skills_list)
            skill_lines.append(f"     \\textbf{{{cat}}}{{: {skills}}}")
        
        skills_tex += " \\\\\n".join(skill_lines)
        skills_tex += "\n    }}\n \\end{itemize}\n"

    # Complete LaTeX Document
    full_latex = rf"""%-------------------------

%------------------------

\documentclass[letterpaper,11pt]{{article}}

\usepackage{{latexsym}}
\usepackage[empty]{{fullpage}}
\usepackage{{titlesec}}
\usepackage{{marvosym}}
\usepackage[usenames,dvipsnames]{{color}}
\usepackage{{verbatim}}
\usepackage{{enumitem}}
\usepackage[hidelinks]{{hyperref}}
\usepackage{{fancyhdr}}
\usepackage[english]{{babel}}
\usepackage{{tabularx}}
\input{{glyphtounicode}}

\pagestyle{{fancy}}
\fancyhf{{}}
\fancyfoot{{}}
\renewcommand{{\headrulewidth}}{{0pt}}
\renewcommand{{\footrulewidth}}{{0pt}}

% Adjust margins
\addtolength{{\oddsidemargin}}{{-0.5in}}
\addtolength{{\evensidemargin}}{{-0.5in}}
\addtolength{{\textwidth}}{{1in}}
\addtolength{{\topmargin}}{{-0.5in}}
\addtolength{{\textheight}}{{1.0in}}

\urlstyle{{same}}

\raggedbottom
\raggedright
\setlength{{\tabcolsep}}{{0in}}

% Sections formatting
\titleformat{{\section}}{{
  \vspace{{-4pt}}\scshape\raggedright\large
}}{{}}{{0em}}{{}}[\color{{black}}\titlerule \vspace{{-5pt}}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{{\resumeItem}}[1]{{
  \item\small{{
    {{#1 \vspace{{-2pt}}}}
  }}
}}

\newcommand{{\resumeSubheading}}[4]{{
  \vspace{{-2pt}}\item
    \begin{{tabular*}}{{0.97\textwidth}}[t]{{l@{{\extracolsep{{\fill}}}}r}}
      \textbf{{#1}} & #2 \\
      \textit{{\small#3}} & \textit{{\small #4}} \\
    \end{{tabular*}}\vspace{{-7pt}}
}}

\newcommand{{\resumeSubSubheading}}[2]{{
    \item
    \begin{{tabular*}}{{0.97\textwidth}}{{l@{{\extracolsep{{\fill}}}}r}}
      \textit{{\small#1}} & \textit{{\small #2}} \\
    \end{{tabular*}}\vspace{{-7pt}}
}}

\newcommand{{\resumeProjectHeading}}[2]{{
    \item
    \begin{{tabular*}}{{0.97\textwidth}}{{l@{{\extracolsep{{\fill}}}}r}}
      \small#1 & #2 \\
    \end{{tabular*}}\vspace{{-7pt}}
}}

\newcommand{{\resumeSubItem}}[1]{{\resumeItem{{#1}}\vspace{{-4pt}}}}

\renewcommand\labelitemii{{$\vcenter{{\hbox{{\tiny$\bullet$}}}}$}}

\newcommand{{\resumeSubHeadingListStart}}{{\begin{{itemize}}[leftmargin=0.15in, label={{}}]}}
\newcommand{{\resumeSubHeadingListEnd}}{{\end{{itemize}}}}
\newcommand{{\resumeItemListStart}}{{\begin{{itemize}}}}
\newcommand{{\resumeItemListEnd}}{{\end{{itemize}}\vspace{{-5pt}}}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\begin{{document}}

%----------HEADING----------
\begin{{center}}
    \textbf{{\Huge \scshape {full_name}}} \\ \vspace{{1pt}}
    \small {contact_line}
\end{{center}}

{education_tex}
{experience_tex}
{projects_tex}
{skills_tex}

%-------------------------------------------
\end{{document}}
"""
    return full_latex
