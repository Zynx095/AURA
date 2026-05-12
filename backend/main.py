# Author: Yukith M Joseph 
# Purpose: Main application entry point for A.U.R.A backend

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import connect_to_database, close_database_connection
from api.detection_routes import router as detection_router
from models.detection_model import HealthResponse

# Initialize FastAPI app
app = FastAPI(
    title="A.U.R.A - Autonomous Unified Recognition Assistant",
    description="Backend API for AI monitoring, detection, and analysis.",
    version="1.0.0"
)

# Standard CORS setup for decoupled frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database lifecycle events
@app.on_event("startup")
async def startup_event():
    #await connect_to_database()
    pass

@app.on_event("shutdown")
async def shutdown_event():
    #await close_database_connection()
    pass

# Include modular routes
app.include_router(detection_router, tags=["Detection"])

# Root Health Check
@app.get("/", response_model=HealthResponse, tags=["System"])
async def root():
    """System health check endpoint."""
    return {"message": "A.U.R.A backend running"}

if __name__ == "__main__":
    # Run instruction: python backend/main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
