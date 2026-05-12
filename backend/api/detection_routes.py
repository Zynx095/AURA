# Author: Yukith M Joseph | Atlantic Codes
# Purpose: FastAPI routes for detection endpoints

import asyncio
from fastapi import APIRouter, HTTPException, Depends
from models.detection_model import DetectionResponse
from detection.detector import YOLODetector

router = APIRouter()

# Instantiate detector globally for the router to avoid reloading the model per request
try:
    detector = YOLODetector(model_name="yolov8n.pt", conf_threshold=0.5)
except Exception as e:
    detector = None

@router.get("/detect", response_model=DetectionResponse)
async def get_detection():
    """
    Triggers a real-time detection via webcam and returns detected objects.
    Runs the inference engine in a separate thread to maintain async performance.
    """
    if detector is None:
        raise HTTPException(status_code=500, detail="Detection model failed to load.")

    try:
        # Offload blocking hardware/inference calls to a thread
        objects = await asyncio.to_thread(detector.capture_and_detect, 0)
        return {"objects": objects}
    
    except ValueError as ve:
        raise HTTPException(status_code=503, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal detection error: {str(e)}")