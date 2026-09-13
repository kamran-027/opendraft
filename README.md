# 📄 OpenDraft — Autonomous AI LaTeX Resume & CV Engine

> **Turn raw, unstructured thoughts into Ivy-League standard ATS LaTeX Resumes in seconds. Zero LaTeX knowledge required.**  
> Built under **Cadence Labs** using **LangGraph**, **Google Gemini 3.6 Flash**, **FastAPI**, and **Next.js 15**. Inspired by the zero-friction philosophy of `ihatepdf.cv`.

---

## 🌟 Overview

**OpenDraft** is a privacy-first, zero-friction AI platform that enables non-technical professionals (Product Managers, Marketers, Data Analysts, Engineers) to generate **flawless 1-page LaTeX resumes** (Jake's Resume / Ivy League standard) simply by typing or pasting casual notes.

### 🎯 Key Highlights:
* **🧠 Google XYZ Impact Formatter**: Converts passive bullet points into quantified achievements (*"Accomplished [X], measured by [Y], by doing [Z]"*).
* **📐 Strict 1-Page Vertical Budget**: Guarantees optimal vertical spacing and typography without overflowing onto page 2.
* **🛡️ Special Character Sanitization**: Automatically escapes tricky LaTeX characters (`&`, `%`, `$`, `#`, `_`, `{`, `}`) to eliminate compilation errors.
* **🚀 1-Click Export Suite**:
  * 📥 **Download PDF** (clean, zero watermarks)
  * 📋 **Copy `.tex` Source Code**
  * 🌐 **Open Directly in Overleaf** with 1 click
* **⚡ 1-Click Role Presets**: Includes instant starter presets for *Product Manager*, *Growth Marketer*, *Data Analyst*, and *Software Engineer*.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **AI / LLM Engine** | [Google Gemini 3.6 Flash](https://aistudio.google.com/) via LangChain |
| **Agentic Framework** | LangGraph & Pydantic Structured Output |
| **LaTeX Architecture** | Jake's Resume LaTeX Template Engine |
| **Backend API** | FastAPI, Uvicorn, Python 3.9+ |
| **Frontend UI** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Icons & Design** | Lucide React, Glassmorphism, Print-to-PDF CSS |

---

## 🚀 Quickstart Guide

### 1️⃣ Run Backend (FastAPI)
```bash
cd backend

# Create & activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```
> 📍 Backend runs at: `http://127.0.0.1:8000`  
> 📖 Swagger API Docs: `http://127.0.0.1:8000/docs`

---

### 2️⃣ Run Frontend (Next.js)
```bash
cd ../frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
> 📍 Frontend runs at: `http://localhost:3002` (or `http://localhost:3000`)

---

## 👨‍💻 Author & Agency

Built by **[Kamran Khan](https://github.com/kamran-027)** under **Cadence Labs** — Elite AI Agents & High-Impact MVPs.
