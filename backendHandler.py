import requests
import json
import os

class connection:
    def __init__(self, host, *args, **kwargs):
        self.host = host
        self.token = None
        self.filters = []

    def post(self, data):
        request = requests.post(url=self.host, json=data)

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
            path = data["url"]
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

    def getUserinfo(self):
        request = requests.get(self.host + "/userSettings/", headers={"Authorization": self.token})
        temp = str(request.content)[2:-1]
        temp = json.loads(temp)
        return True, temp
    
    def postUserInfo(self, *args, **kwargs):
        pfp = None
        
        try:
            pfp = kwargs.get("image")
        except:
            pass

        if pfp != None:
            with open(pfp, "rb") as file:
                return requests.post(self.host + "/userSettings/", headers={"Authorization": self.token}, files={"image": file})
            
    def followUser(self, data):
        try:
            username = data["username"]
        except:
            return False, "no user specified"
        try:
            request = requests.post(self.host + "/followSettings/", headers={"Authorization": self.token}, data={"username":username})
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
        return True, None
    
    def getVideoBatch(self):
        
        try:
            request = requests.post(self.host + "/getVideoBatch/", headers={"Authorization": self.token}, json={"filters":self.filters})
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
        return True, request.json()["Titles"]
    
    def addTag(self, data):
        for i in self.filters:
            if i == data["tag"]:
                return
        if len(data["tag"]) == 0:
            return

        
        self.filters.append(data['tag'])
    def deleteTag(self, data):
        self.filters.remove(data["tag"])

    def saveSettings(self, data):
        try:
            request = requests.post(self.host + "/userSettings/", headers={"Authorization": self.token}, data=data)
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"
        return True, None
    
    def signOut(self):
        self.token = None
        self.filters = []
        return True, None


if __name__ == "__main__":

    #print(connection("http://127.0.0.1:8000/uploadVideo/").post({"data":"data"}))
    print(connection("http://127.0.0.1:8000/").signUp({"username":"user3", "password":"password"}))
    temp = connection("http://127.0.0.1:8000/")
    temp.login({"username":"user3", "password":"password"})
    current_dir = os.path.dirname(__file__)
    video_path = os.path.join(current_dir, "video.mp4")
    tags = json.dumps(["testTag", "testTag2"])
    #print(temp.uploadVideo({"title":"SuperCoolCatVideoWithLongTitle","description":"my cool new video", "videoPath": video_path, "tags": tags }))
    print(temp.postUserInfo(image="cat.jpg"))
    print(temp.getUserinfo())
    # print(temp.followUser({"username": "catposter20"}))
    # print(temp.followUser({"username": "uncool user"}))
    # print(temp.followUser({"username": "Cool user"}))
    print(temp.followUser({"username": "user2"}))


