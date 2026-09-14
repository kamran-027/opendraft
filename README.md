<p align="center">
  <img src="frontend/public/favicon.svg" width="72" height="72" alt="OpenDraft Logo" />
</p>

<h1 align="center">OpenDraft</h1>

<p align="center">
  <strong>Autonomous AI LaTeX Resume & CV Engine</strong><br />
  Turn messy, unformatted career notes into publication-grade, 1-page Jake's LaTeX resumes in seconds. Zero LaTeX knowledge required.
</p>

<p align="center">
  <a href="https://github.com/kamran-027/opendraft"><img src="https://img.shields.io/badge/Open%20Source-100%25-blue?style=flat-square" alt="Open Source" /></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15" /></a>
  <a href="https://fastapi.tiangolo.com"><img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat-square&logo=fastapi" alt="FastAPI" /></a>
  <a href="https://aistudio.google.com"><img src="https://img.shields.io/badge/Engine-Google%20Gemini-8E75B2?style=flat-square&logo=google" alt="Gemini" /></a>
  <a href="https://github.com/kamran-027/opendraft/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" /></a>
</p>

---

## 🌟 What is OpenDraft?

**Jake's Resume** and Ivy-League LaTeX templates are universally recognized as the gold standard by top tech recruiters and Applicant Tracking Systems (ATS) for their clean, high-density 1-page layout. 

However, **95% of job seekers do not know LaTeX**—wrestling with macro syntax, overfull `\hbox` errors, and broken environments just to update a bullet point is painful.

**OpenDraft** eliminates that barrier. Paste your raw, unstructured career notes, job descriptions, or career chronology, and OpenDraft autonomously compiles a publication-ready, 1-page LaTeX resume with calibrated ATS keyword optimization.

---

## ✨ Key Features

### 🎯 Non-Technical & Career Focus
* **Google XYZ Formula Rewiring**: Automatically rewrites passive bullet points into executive-level achievements:  
  $$\text{Accomplished } [X], \text{ as measured by } [Y], \text{ by doing } [Z]$$
* **Target Role Keyword Personalization**: Tailors action verbs and industry keywords to the exact job title you are applying for.
* **Interactive ATS Readiness Report**: On-demand diagnostics modal displaying your estimated ATS compatibility score (0–100), active verb counts, quantified metric density, and matched industry keywords.
* **Authentic 1-Page Letter Layout**: Enforces a strict vertical budget to ensure your resume fits comfortably on 1 standard Letter sheet without overflowing to page 2.
* **Light & Dark Mode**: Modern, distraction-free interface with instant theme switching.

### 🛠️ Technical & Compiler Innovations
* **Deterministic LaTeX Compiler**: Rather than prompting LLMs to write raw, hallucination-prone `.tex` code, OpenDraft uses a hybrid pipeline—extracting structured JSON via Pydantic and compiling it through a deterministic Python typesetter.
* **ATS Ligature Defense (`glyphtounicode`)**: Injects `\input{glyphtounicode}` and `\pdfgentounicode=1` into the LaTeX preamble, preventing ATS parsers from misreading typographic ligatures (`fi`, `fl`) as broken words (`workow` instead of `workflow`).
* **1-Click Export Suite**:
  * 📥 **Clean 1-Page PDF Download**: Uses an isolated print engine that strips browser chrome, headers, and footers.
  * 🌐 **Instant Overleaf Sync**: Submits the `.tex` payload directly to Overleaf via HTTP POST with zero URL length constraints.
  * 📋 **Copy `.tex` Source Code**: Copy raw LaTeX markup with syntax highlighting in one click.

---

## 🏗️ Architecture & Technology Stack

```
[Raw Career Notes + Target Role]
             │
             ▼
[Next.js 15 Frontend Studio] ──(POST /api/generate)──► [FastAPI Backend]
                                                              │
                                                              ▼
                                                 [LangChain + Gemini Flash]
                                                              │
                     ┌────────────────────────────────────────┴────────────────────────────────────────┐
                     ▼                                                                                 ▼
      [Pydantic Structured Validation]                                                  [Google XYZ Bullet Engine]
                     │                                                                                 │
                     ▼                                                                                 ▼
     [Jake's LaTeX Engine (templates.py)]                                              [ATS Diagnostics & Keyword Engine]
                     │                                                                                 │
                     └────────────────────────────────────────┬────────────────────────────────────────┘
                                                              │
                                                    [JSON Response Payload]
                                                              │
             ┌────────────────────────────────────────────────┼────────────────────────────────────────────────┐
             ▼                                                ▼                                                ▼
 [Interactive Document Preview]                     [Dedicated Print Engine]                      [1-Click Overleaf Sync]
```

* **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React.
* **Backend**: FastAPI, Uvicorn, Python 3.11+, Pydantic v2.
* **AI & Orchestration**: LangChain, Google Gemini Flash (`with_structured_output`).
* **Typesetting Standard**: Canonical Jake's Resume LaTeX Architecture.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** 18+ and **npm** / **pnpm**
* **Python** 3.10+
* A [Google Gemini API Key](https://aistudio.google.com/)

---

### 1️⃣ Backend Setup (FastAPI)

```bash
cd backend

# Create & activate virtual environment
python3 -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env        # Add your GEMINI_API_KEY to backend/.env

# Start FastAPI backend
uvicorn app.main:app --reload --port 8000
```
> 📍 Backend runs at: `http://127.0.0.1:8000`  
> 📖 Swagger API Docs: `http://127.0.0.1:8000/docs`

---

### 2️⃣ Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
> 📍 OpenDraft Studio opens at: `http://localhost:3002`

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built by **[Kamran Khan](https://github.com/kamran-027)**
