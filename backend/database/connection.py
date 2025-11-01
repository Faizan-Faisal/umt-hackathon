from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from models.user_model import User
from models.job_model import Job
from models.application_model import Application
from core.config import MONGO_URI

async def init_db():
    client = AsyncIOMotorClient(MONGO_URI)
    await init_beanie(database=client.campusconnect, document_models=[User, Job, Application])
