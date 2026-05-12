# Author: Yukith M Joseph | Atlantic Codes
# Purpose: Core Ultralytics YOLO detection pipeline

import cv2
import logging
from ultralytics import YOLO

logger = logging.getLogger("AURA.Detector")

class YOLODetector:
    def __init__(self, model_name: str = "yolov8n.pt", conf_threshold: float = 0.5):
        """
        Initializes the YOLO model. Downloads the lightweight .pt file automatically 
        if not present, perfect for zero-budget local inference.
        """
        self.conf_threshold = conf_threshold
        try:
            logger.info(f"Loading YOLO model: {model_name}")
            self.model = YOLO(model_name)
        except Exception as e:
            logger.error(f"Failed to load YOLO model: {e}")
            raise RuntimeError(f"Model initialization failed: {e}")

    def capture_and_detect(self, camera_index: int = 0) -> list:
        """
        Captures a single frame from the specified webcam and runs inference.
        Returns a JSON-friendly list of detected objects.
        """
        cap = cv2.VideoCapture(camera_index)
        
        if not cap.isOpened():
            logger.error("Failed to open video source.")
            raise ValueError("Could not connect to camera hardware.")

        try:
            ret, frame = cap.read()
            if not ret:
                raise ValueError("Failed to read frame from camera.")

            # Run inference
            results = self.model(frame, conf=self.conf_threshold, verbose=False)
            
            detections = []
            for result in results:
                for box in result.boxes:
                    detections.append({
                        "label": self.model.names[int(box.cls)],
                        "confidence": round(float(box.conf), 4),
                        "bbox": [round(coord, 2) for coord in box.xyxy[0].tolist()]
                    })
            
            return detections

        finally:
            # Ensure hardware resources are freed immediately
            cap.release()