import requests
import json
import os

class connection:
    def __init__(self, host, *args, **kwargs):
        self.host = host
        self.token = None

    def post(self, data):
        request = requests.post(url=self.host, json=data)
        print(request.json())
        print(request.json()["message"])

    def login(self, data):
        try:
            request = requests.post(self.host + "/login/", json=data)
            self.token = "Token " + request.json()["token"]
            return True, None
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
        
    def signUp(self, data):
        try:
            request = requests.post(self.host + "/signup/", json=data)
            self.token = "Token " + request.json()["token"]
            return True, None
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
            
    def uploadVideo(self, data):
        try:
            path = data["videoPath"]
        except:
            return False, "video path is not specified"
        try:
            with open(path, "rb") as file:
                request = requests.post(self.host + "/uploadVideo/", data=data, headers={"Authorization": self.token}, files={"video": file})
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
        return True, None

            



if __name__ == "__main__":

    #print(connection("http://127.0.0.1:8000/uploadVideo/").post({"data":"data"}))
    print(connection("http://127.0.0.1:8000/").signUp({"username":"user2", "password":"password"}))
    temp = connection("http://127.0.0.1:8000/")
    temp.login({"username":"user2", "password":"password"})
    current_dir = os.path.dirname(__file__)
    video_path = os.path.join(current_dir, "video.mp4")
    tags = json.dumps(["testTag", "testTag2"])
    print(temp.uploadVideo({"title":"superCoolVideo","description":"my cool new video", "videoPath": video_path, "tags": tags }))
