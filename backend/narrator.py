class SceneNarrator:

    def generate_summary(
        self,
        detections,
        tracked_objects,
        events
    ):

        summaries = []

        object_count = len(detections)

        if object_count == 0:

            summaries.append(
                "No active movement detected."
            )

        else:

            summaries.append(
                f"{object_count} active objects currently monitored."
            )

        labels = [
            d["label"]
            for d in detections
        ]

        if "person" in labels:

            person_count = labels.count("person")

            summaries.append(
                f"{person_count} individual(s) present in the scene."
            )

        if "car" in labels:

            vehicle_count = labels.count("car")

            summaries.append(
                f"{vehicle_count} vehicle(s) detected."
            )

        for event in events:

            if event["type"] == "loitering":

                summaries.append(
                    "Suspicious prolonged presence detected."
                )

            if event["type"] == "stationary_vehicle":

                summaries.append(
                    "Vehicle stationary for extended duration."
                )

        return summaries