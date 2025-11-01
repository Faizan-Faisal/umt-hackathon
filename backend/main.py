from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import init_db
from routes import auth_routes, job_routes, application_routes
from routes import websocket_routes, chat_routes, profile_routes, google_routes, upload_routes

app = FastAPI(title="CampusConnect Backend")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

# Register all routes
app.include_router(auth_routes.router)
app.include_router(job_routes.router)
app.include_router(application_routes.router)
app.include_router(chat_routes.router)
app.include_router(websocket_routes.router)
app.include_router(profile_routes.router)
app.include_router(google_routes.router)
app.include_router(upload_routes.router)


@app.get("/")
def root():
    return {"message": "Welcome to CampusConnect API 🚀"}
