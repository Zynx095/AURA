from ultralytics import YOLO

class YOLOEngine:

    def __init__(self):
        self.model = YOLO("models/yolov8n.pt")

    def detect(self, frame):

        results = self.model.track(
            frame,
            persist=True,
            verbose=False,
            imgsz=640
        )

        detections = []

        if results[0].boxes is not None:

            for box in results[0].boxes:

                conf = float(box.conf[0])

                if conf < 0.5:
                    continue

                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0]
                )

                label = self.model.names[
                    int(box.cls[0])
                ]

                track_id = (
                    int(box.id[0])
                    if box.id is not None
                    else -1
                )

                detections.append({
                    "label": label,
                    "confidence": float(conf),
                    "track_id": int(track_id),
                    "box": [
                         int(x1),
                         int(y1),
                         int(x2),
                         int(y2)
]
                })

        return detections