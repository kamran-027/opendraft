from typing import List, Optional
from pydantic import BaseModel, Field


class ContactInfo(BaseModel):
    full_name: str = Field(..., description="Full Name of the candidate")
    email: str = Field(..., description="Email address")
    phone: Optional[str] = Field(None, description="Phone number with country code if available")
    location: Optional[str] = Field(None, description="City, Country (e.g. Mumbai, India or New York, NY)")
    linkedin_url: Optional[str] = Field(None, description="Clean LinkedIn URL or username")
    github_url: Optional[str] = Field(None, description="Clean GitHub / Portfolio URL")
    website_url: Optional[str] = Field(None, description="Personal portfolio website URL")


class EducationItem(BaseModel):
    institution: str = Field(..., description="University or College name")
    degree: str = Field(..., description="Degree and Major (e.g. B.Tech in Computer Science, MBA in Marketing)")
    location: Optional[str] = Field(None, description="City, State/Country")
    graduation_date: str = Field(..., description="Graduation month & year (e.g. May 2024 or 2020 -- 2024)")
    gpa_or_honors: Optional[str] = Field(None, description="GPA, percentage, or academic honors if mentioned")


class ExperienceItem(BaseModel):
    company: str = Field(..., description="Company or Organization name")
    role: str = Field(..., description="Job title / Designation")
    location: Optional[str] = Field(None, description="City, Country or Remote")
    date_range: str = Field(..., description="Employment dates (e.g. Jan 2023 -- Present or 2021 -- 2023)")
    bullets: List[str] = Field(
        ...,
        description="2-4 high-impact, quantified bullet points adhering to the Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z]"
    )


class ProjectItem(BaseModel):
    name: str = Field(..., description="Project name")
    technologies: Optional[str] = Field(None, description="Key tools/technologies used (e.g. Python, Next.js, SQL, Figma)")
    date_or_link: Optional[str] = Field(None, description="Project link or date")
    bullets: List[str] = Field(
        ...,
        description="1-3 bullet points highlighting technical implementation, business impact, or scale"
    )


class SkillCategory(BaseModel):
    category_name: str = Field(..., description="Category (e.g. Core Languages, Frameworks, Product & Analytics, Tools)")
    skills_list: str = Field(..., description="Comma-separated list of skills")


class AtsAnalysis(BaseModel):
    score: int = Field(..., description="Estimated ATS Readiness Score out of 100")
    detected_target_role: str = Field(..., description="Detected or optimized target job title")
    action_verbs_count: int = Field(..., description="Count of active strong action verbs utilized")
    quantified_metrics_count: int = Field(..., description="Count of bullet points with concrete numbers/metrics")
    ats_strengths: List[str] = Field(..., description="2-3 specific structural strengths of this generated resume")
    top_matched_keywords: List[str] = Field(..., description="Top 5-8 ATS industry keywords embedded")
    missing_recommended_keywords: Optional[List[str]] = Field(
        default_factory=list,
        description="2-4 high-value complementary keywords candidate could consider for higher role match"
    )
    executive_summary_feedback: Optional[str] = Field(
        None,
        description="A concise 1-sentence punchy recruiter diagnostic on this resume's market positioning"
    )


class ResumeData(BaseModel):
    contact: ContactInfo
    summary: Optional[str] = Field(None, description="Concise 1-2 sentence professional overview (optional)")
    education: List[EducationItem]
    experience: List[ExperienceItem]
    projects: List[ProjectItem] = Field(default_factory=list)
    skills: List[SkillCategory] = Field(default_factory=list)
    ats_analysis: AtsAnalysis
