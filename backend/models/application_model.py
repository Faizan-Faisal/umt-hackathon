from beanie import Document
from datetime import datetime
from typing import Optional

class Application(Document):
    job_id: str
    user_id: str
    status: str = "Pending"
    proposal: Optional[str] = None
    resume_url: Optional[str] = None
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "applications"
