import re
import fitz  # PyMuPDF
from typing import List

# A basic skill keyword set — expand with your domain-specific skills
SKILL_KEYWORDS = [
    "python", "java", "c++", "javascript", "node", "react", "fastapi", "mongodb",
    "sql", "nosql", "aws", "docker", "git", "linux", "rest api", "machine learning",
    "data analysis", "deep learning", "html", "css", "flask", "firebase",
    "communication", "leadership", "teamwork", "project management"
]

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract plain text from a PDF resume."""
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text("text")
    return text

def extract_skills_from_resume(pdf_path: str) -> List[str]:
    """
    Extract skill keywords from a resume PDF file.
    Uses regex + keyword matching for fast extraction.
    """
    text = extract_text_from_pdf(pdf_path).lower()
    found_skills = []
    for skill in SKILL_KEYWORDS:
        pattern = rf"\b{re.escape(skill.lower())}\b"
        if re.search(pattern, text):
            found_skills.append(skill)
    return sorted(list(set(found_skills)))
