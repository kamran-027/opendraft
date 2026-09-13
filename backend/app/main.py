import os
import urllib.parse
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from .agent.graph import generate_resume_from_raw_text
from .agent.presets import PRESET_BRAINDUMPS

load_dotenv()

app = FastAPI(
    title="OpenDraft — Autonomous AI LaTeX Resume & CV Engine",
    description="Turn raw, unstructured thoughts into Ivy-League ATS LaTeX Resumes in seconds. Built by Cadence Labs.",
    version="1.0.0"
)

# CORS Middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateResumeRequest(BaseModel):
    raw_text: str
    target_role: Optional[str] = None


class OverleafExportRequest(BaseModel):
    latex_code: str


@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "OpenDraft Autonomous AI LaTeX Resume Engine",
        "engine": "Google Gemini 3.6 Flash",
        "version": "1.0.0"
    }


@app.get("/api/presets")
def get_presets():
    """Returns curated non-tech & tech role presets for 1-click instant testing."""
    return {"presets": PRESET_BRAINDUMPS}


@app.post("/api/generate")
async def generate_resume_endpoint(request: GenerateResumeRequest):
    """
    Takes unstructured notes, quantifies bullets via Google XYZ formula,
    and returns structured resume JSON + Jake's Resume LaTeX markup.
    """
    if not request.raw_text or not request.raw_text.strip():
        raise HTTPException(status_code=400, detail="Please provide your raw career notes or bullet points.")
    
    try:
        result = await generate_resume_from_raw_text(
            raw_text=request.raw_text.strip(),
            target_role=request.target_role
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate resume: {str(e)}")


@app.post("/api/export-overleaf")
def export_to_overleaf(request: OverleafExportRequest):
    """
    Generates a direct Overleaf Snip / Create URL so the user can open their
    generated LaTeX resume in Overleaf with a single click.
    """
    if not request.latex_code or not request.latex_code.strip():
        raise HTTPException(status_code=400, detail="LaTeX code is required for Overleaf export.")
    
    encoded_tex = urllib.parse.quote(request.latex_code)
    # Overleaf snip URI or data direct post URL
    overleaf_url = f"https://www.overleaf.com/docs?snip_uri=data:application/x-tex;base64,{urllib.parse.quote(request.latex_code)}"
    
    return {
        "overleaf_url": overleaf_url,
        "raw_latex": request.latex_code
    }
