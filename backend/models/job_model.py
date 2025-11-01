from beanie import Document
from typing import List, Optional
from datetime import datetime

class Job(Document):
    title: str
    description: str
    tags: List[str]
    created_by: str  # user_id
    created_at: datetime = datetime.utcnow()
    status: str = "open"  # open, filled, draft
    views: int = 0
    applicants: List[str] = []

    class Settings:
        name = "jobs"
