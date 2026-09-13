import os
from typing import Dict, Any, Optional
from dotenv import load_dotenv

from langchain_core.messages import SystemMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import langchain_google_genai.chat_models as chat_models

from ..schemas import ResumeData
from .prompts import RESUME_PARSER_SYSTEM_PROMPT
from .templates import render_jakes_resume_latex

load_dotenv()

# --- MONKEYPATCH for thought_signature on Gemini models ---
orig_parse_chat_history = chat_models._parse_chat_history

def patched_parse_chat_history(*args, **kwargs):
    system_instruction, history = orig_parse_chat_history(*args, **kwargs)
    for content in history:
        for part in content.parts:
            if part.function_call:
                part.thought_signature = b"skip_thought_signature_validator"
    return system_instruction, history

chat_models._parse_chat_history = patched_parse_chat_history
# -------------------------------------------------------------

def get_structured_llm():
    """Initializes Gemini model with structured Pydantic output."""
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key or not api_key.strip():
        raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY is not set in backend/.env")

    gemini_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
    llm = ChatGoogleGenerativeAI(
        model=gemini_model,
        temperature=0.2,
        google_api_key=api_key.strip(),
    )
    return llm.with_structured_output(ResumeData)


async def generate_resume_from_raw_text(raw_text: str, target_role: Optional[str] = None) -> Dict[str, Any]:
    """
    Parses unstructured career notes, applies Google XYZ formula,
    and returns both the structured JSON and sanitized Jake's Resume LaTeX markup.
    """
    llm = get_structured_llm()
    
    prompt = f"Candidate's Unstructured Raw Thoughts & Career History:\n\n{raw_text}"
    if target_role and target_role.strip():
        prompt += f"\n\nTarget Role to Optimize For: {target_role.strip()}"
        
    messages = [
        SystemMessage(content=RESUME_PARSER_SYSTEM_PROMPT),
        HumanMessage(content=prompt)
    ]
    
    # Run structured extraction
    resume_data: ResumeData = await llm.ainvoke(messages)
    
    # Render into Jake's Resume LaTeX markup
    latex_code = render_jakes_resume_latex(resume_data)
    
    return {
        "structured_data": resume_data.model_dump(),
        "latex_code": latex_code,
        "ats_analysis": resume_data.ats_analysis.model_dump()
    }
