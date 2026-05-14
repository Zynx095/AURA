from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
from camera import CameraManager
from yolo_engine import YOLOEngine
from tracker import ObjectTracker
from event_engine import EventEngine
from narrator import SceneNarrator
from fastapi import WebSocket
from socket_manager import ConnectionManager
import asyncio
from zone_engine import ZoneEngine
manager = ConnectionManager()
zone_engine = ZoneEngine()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

camera = CameraManager(0)

yolo = YOLOEngine()
tracker = ObjectTracker()
event_engine = EventEngine()
narrator = SceneNarrator()

@app.get("/")
def root():
    return {
        "status": "A.U.R.A backend online"
    }


@app.get("/detections")
def get_detections():

    frame = camera.get_frame()

    if frame is None:
        return {
            "error": "camera unavailable"
        }

    detections = yolo.detect(frame)

    tracked = tracker.update(detections)

    events = event_engine.analyze(tracked)

    return {
    "detections": detections,
    "tracked_objects": tracked,
    "events": events,
    "summary": narrator.generate_summary(detections, tracked, events)
    }
def generate_frames():

    while True:

        frame = camera.get_frame()

        if frame is None:
            continue

        detections = yolo.detect(frame)

        for det in detections:

            x1, y1, x2, y2 = det["box"]

            label = det["label"]
            conf = det["confidence"]
            track_id = det["track_id"]

            text = f"{label} #{track_id}"

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 0, 0),
                2
            )

            cv2.putText(
                frame,
                text,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 0, 0),
                2
            )

        _, buffer = cv2.imencode(".jpg", frame)

        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )
@app.get("/video_feed")
def video_feed():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(websocket)

    try:

        while True:

            frame = camera.get_frame()

            if frame is None:
                continue

            detections = yolo.detect(frame)

            tracked = tracker.update(
                detections
            )

            events = event_engine.analyze(
                tracked
            )
            zone_events = zone_engine.check_zones(
                tracked
            )

            events.extend(zone_events)

            summaries = narrator.generate_summary(
                detections,
                tracked,
                events
            )

            payload = {
                "detections": detections,
                "tracked_objects": tracked,
                "events": events,
                "summaries": summaries
            }

            await websocket.send_json(
                payload
            )

            await asyncio.sleep(1)

    except Exception as e:

     print("WEBSOCKET ERROR:", e)

     manager.disconnect(websocket)