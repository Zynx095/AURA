# Author: Yukith M Joseph | Atlantic Codes
# Purpose: Pydantic schemas for A.U.R.A detection responses

from pydantic import BaseModel, Field
from typing import List

class DetectedObject(BaseModel):
    label: str = Field(..., description="Class name of the detected object")
    confidence: float = Field(..., description="Confidence score of the detection (0.0 to 1.0)")
    bbox: List[float] = Field(..., description="Bounding box coordinates [x1, y1, x2, y2]")

class DetectionResponse(BaseModel):
    objects: List[DetectedObject] = Field(..., description="List of objects detected in the frame")

class HealthResponse(BaseModel):
    message: str = Field(default="A.U.R.A backend running")