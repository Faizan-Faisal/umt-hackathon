# utils/recommendation.py
from typing import List, Dict
from models.user_model import User
from models.job_model import Job

def compute_match_score(user_skills: List[str], job_tags: List[str]) -> float:
    """
    Compute a percentage match between user_skills and job_tags.
    We assume job_tags roughly reflect required skills/keywords.
    We give skills 70% weight and tags 30% weight (tunable).
    """
    user_skills_set = set([s.lower().strip() for s in user_skills or []])
    job_tags_set = set([t.lower().strip() for t in job_tags or []])

    # Skill overlap score: intersection / max(job_tags,1)
    skill_overlap = len(user_skills_set & job_tags_set)
    skill_denom = max(len(job_tags_set), 1)
    skill_score = skill_overlap / skill_denom

    # Tag overlap: intersection / denom
    tag_overlap = len(user_skills_set & job_tags_set)
    tag_denom = max(len(job_tags_set), 1)
    tag_score = tag_overlap / tag_denom

    # Weighted
    score = 0.7 * skill_score + 0.3 * tag_score
    return round(score * 100, 2)


def rank_jobs_for_user(user: User, jobs: List[Job]) -> List[Dict]:
    """
    Returns a list of dicts: {job, match_score}, sorted by score desc.
    """
    user_skills = user.skills or []
    results = []
    for j in jobs:
        score = compute_match_score(user_skills, j.tags or [])
        results.append({"job": j, "match_score": score})
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results
