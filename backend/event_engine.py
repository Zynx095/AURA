class EventEngine:

    def __init__(self):

        self.events = []

    def analyze(self, tracked_objects):

        current_events = []

        for track_id, obj in tracked_objects.items():

            duration = obj["duration"]

            label = obj["label"]

            if label == "person" and duration > 15:

                current_events.append({
                    "type": "loitering",
                    "track_id": track_id,
                    "message": f"Person #{track_id} lingering for {int(duration)} seconds",
                    "severity": "medium"
                })

            if label == "car" and duration > 20:

                current_events.append({
                    "type": "stationary_vehicle",
                    "track_id": track_id,
                    "message": f"Vehicle #{track_id} stationary for {int(duration)} seconds",
                    "severity": "low"
                })

        self.events = current_events

        return current_events