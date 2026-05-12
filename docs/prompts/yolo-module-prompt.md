# YOLO DETECTION MODULE PROMPT

# PROJECT: A.U.R.A

Generate the YOLOv5 detection backend module for A.U.R.A.

Framework:

* FastAPI
* Python
* Ultralytics YOLO
* OpenCV

Generate code ONLY for these files:

1. backend/main.py
2. backend/detection/detector.py
3. backend/api/detection_routes.py
4. backend/models/detection_model.py
5. backend/database/db.py

SYSTEM REQUIREMENTS:

The system must:

* Initialize FastAPI backend
* Load YOLO model using Ultralytics
* Support webcam/image/video detection
* Return JSON detection results
* Use modular architecture
* Separate routers/services/models cleanly
* Handle errors safely
* Use reusable functions

API REQUIREMENTS:

GET /
Returns:
{
"message": "A.U.R.A backend running"
}

GET /detect
Returns:
{
"objects": [
{
"label": "person",
"confidence": 0.94
}
]
}

DETECTION REQUIREMENTS:

* Use yolov8n.pt or lightweight YOLO model
* Confidence threshold configurable
* Extract:

  * object labels
  * confidence
  * bounding box coordinates
* JSON-friendly outputs

ARCHITECTURE RULES:

* Keep detection logic inside detection/detector.py
* Keep API routes inside api/detection_routes.py
* Keep schemas/models separated
* Avoid giant files
* Use comments

OUTPUT FORMAT:

* Clearly separate code by file name
* Include imports
* Include run instructions
* Explain dependencies if needed

DO NOT:

* Generate frontend code
* Mix unrelated modules
* Hardcode secrets
* Break modularity
