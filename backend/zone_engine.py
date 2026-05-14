class ZoneEngine:

    def __init__(self):

        self.zones = {

            "restricted_zone": {
                "x1": 0,
                "y1": 0,
                "x2": 350,
                "y2": 250
            }

        }

    def check_zones(
        self,
        tracked_objects
    ):

        zone_events = []

        for track_id, obj in tracked_objects.items():

            x1, y1, x2, y2 = obj["box"]

            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2

            for zone_name, zone in self.zones.items():

                inside = (
                    zone["x1"] <= center_x <= zone["x2"]
                    and
                    zone["y1"] <= center_y <= zone["y2"]
                )

                if inside:

                    zone_events.append({

                        "type": "restricted_zone_entry",

                        "track_id": track_id,

                        "message":
                            f'{obj["label"]} #{track_id} entered {zone_name}',

                        "severity": "high"
                    })

        return zone_events