from fastapi import APIRouter, HTTPException
from models.application_model import Application

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/")
async def apply_to_job(job_id: str, user_id: str, proposal: str = None):
    existing = await Application.find_one(Application.job_id == job_id, Application.user_id == user_id)
    if existing:
        raise HTTPException(status_code=400, detail="Already applied.")
    app = Application(job_id=job_id, user_id=user_id, proposal=proposal)
    await app.insert()
    return {"msg": "Application submitted."}

@router.get("/user/{user_id}")
async def get_user_applications(user_id: str):
    apps = await Application.find(Application.user_id == user_id).to_list()
    return apps
