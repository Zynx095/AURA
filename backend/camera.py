import cv2

class CameraManager:

    def __init__(self, camera_index=0):
        self.cap = cv2.VideoCapture(camera_index)

        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    def get_frame(self):
        success, frame = self.cap.read()

        if not success:
            return None

        return frame

    def release(self):
        self.cap.release()