from fastapi import APIRouter, Depends, HTTPException
from models.job_model import Job
from core.dependencies import get_current_user
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/jobs", tags=["Jobs"])

class JobCreate(BaseModel):
    title: str
    description: str
    tags: List[str]

@router.post("/")
async def create_job(job: JobCreate, current_user=Depends(get_current_user)):
    if current_user.role != "finder":
        raise HTTPException(status_code=403, detail="Only finders can post jobs.")
    new_job = Job(**job.dict(), created_by=str(current_user.id))
    await new_job.insert()
    return {"msg": "Job created successfully", "id": str(new_job.id)}

@router.get("/")
async def list_jobs():
    return await Job.find_all().to_list()
