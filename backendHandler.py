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
            self.token = request.json()["token"]
            return True, None
        except:
            return False, request.json()["message"]
        
    def signUp(self, data):
        try:
            request = requests.post(self.host + "/signup/", json=data)
            self.token = request.json()["token"]
            return True, None
        except:
            return False, request.json()["message"]



if __name__ == "__main__":
    print(connection("http://127.0.0.1:8000/").signUp({"username":"user2", "password":"password"}))
    print(connection("http://127.0.0.1:8000/").login({"username":"user2", "password":"password"}))
    