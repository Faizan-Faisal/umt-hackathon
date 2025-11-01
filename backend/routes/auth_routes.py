from fastapi import APIRouter, HTTPException, Depends
from models.user_model import User
from core.security import hash_password, verify_password, create_access_token
from core.dependencies import get_current_user
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["Authentication"])

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register_user(user: RegisterSchema):
    existing = await User.find_one(User.email == user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = hash_password(user.password)
    new_user = User(name=user.name, email=user.email, hashed_password=hashed)
    await new_user.insert()
    return {"msg": "User registered successfully."}

@router.post("/login")
async def login_user(data: LoginSchema):
    user = await User.find_one(User.email == data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/switch-role")
async def switch_role(current_user: User = Depends(get_current_user)):
    current_user.role = "finder" if current_user.role == "seeker" else "seeker"
    await current_user.save()
    return {"msg": f"Role switched to {current_user.role}"}
