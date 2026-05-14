import time


class ObjectTracker:

    def __init__(self):

        self.objects = {}

    def update(self, detections):

        current_time = time.time()

        active_ids = set()

        for det in detections:

            track_id = det["track_id"]

            if track_id == -1:
                continue

            active_ids.add(track_id)

            if track_id not in self.objects:

                self.objects[track_id] = {
                    "label": det["label"],
                    "first_seen": current_time,
                    "last_seen": current_time,
                    "duration": 0,
                    "confidence": det["confidence"],
                    "box": det["box"],
                }

            else:

                self.objects[track_id]["last_seen"] = current_time

                self.objects[track_id]["duration"] = float(
    current_time
    - self.objects[track_id]["first_seen"]
)

                self.objects[track_id]["confidence"] = det["confidence"]

                self.objects[track_id]["box"] = det["box"]

        return self.get_active_objects(active_ids)

    def get_active_objects(self, active_ids):

        active_objects = {}

        for obj_id in active_ids:

            active_objects[obj_id] = self.objects[obj_id]

        return active_objects