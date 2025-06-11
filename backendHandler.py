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
            request = requests.post(self.host + "/uploadVideo/", json=data, headers={"Authorization": self.token})
            return True, None
        except:
            try:
                return False, request.json()["message"]
            except:
                return False, "Failed to connect"



if __name__ == "__main__":

    #print(connection("http://127.0.0.1:8000/uploadVideo/").post({"data":"data"}))
    print(connection("http://127.0.0.1:8000/").signUp({"username":"user2", "password":"password"}))
    temp = connection("http://127.0.0.1:8000/")
    temp.login({"username":"user2", "password":"password"})
    print(temp.uploadVideo({"message":"hi"}))
